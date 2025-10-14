# GitHub Copilot Instructions for IntegriTest

## Project Overview

IntegriTest is a secure, full-stack online quiz platform designed for educators. It focuses on academic integrity with anti-cheating features like tab-switch detection, screenshot blocking, and content protection.

## Technology Stack

- **Frontend**: React with Vite, TypeScript, React Router & Context API/Zustand
- **Backend**: Node.js with Express.js and TypeScript
- **Database**: PostgreSQL or MySQL
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Project Structure

```
integritest/
├── client/                 # React + Vite + TypeScript frontend
├── server/                 # Express + TypeScript backend
│   ├── src/
│   │   ├── index.ts       # Application entry point
│   │   ├── config/        # Configuration files (database, env, etc.)
│   │   ├── controllers/   # Request handlers and business logic
│   │   ├── middlewares/   # Express middlewares (auth, validation, error handling)
│   │   ├── models/        # Database models and schemas
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic layer
│   │   └── utils/         # Helper functions and utilities
│   ├── .gitignore
│   ├── package.json
│   ├── pnpm-lock.yaml
│   └── tsconfig.json
├── .github/               # GitHub workflows and configurations
└── README.md
```

## Code Style & Conventions

### TypeScript Guidelines

- **Always use TypeScript** - No `.js` files in `src/`
- **Enable strict mode** in `tsconfig.json`
- **Define explicit types** - Avoid `any` unless absolutely necessary
- **Use interfaces** for object shapes, **types** for unions/intersections
- **Export types** alongside implementations for reusability

#### Type Naming Conventions
```typescript
// Interfaces: PascalCase with 'I' prefix (optional, but be consistent)
interface User {
  id: string;
  email: string;
}

// Types: PascalCase
type QuizStatus = 'draft' | 'published' | 'archived';

// Enums: PascalCase
enum UserRole {
  Teacher = 'TEACHER',
  Admin = 'ADMIN'
}
```

### Backend Structure (Express + TypeScript)

#### **src/index.ts** - Application Entry Point
```typescript
import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
```

#### **src/config/** - Configuration Files
Place all configuration logic here:
- `env.ts` - Environment variable validation and exports
- `database.ts` - Database connection setup
- `jwt.ts` - JWT configuration

```typescript
// config/env.ts example
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL!,
  jwtSecret: process.env.JWT_SECRET!,
  nodeEnv: process.env.NODE_ENV || 'development'
} as const;

// Validate required env vars
if (!config.databaseUrl || !config.jwtSecret) {
  throw new Error('Missing required environment variables');
}
```

#### **src/models/** - Database Models
Define database schemas and types:

```typescript
// models/user.model.ts
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

// SQL schema definition or ORM model goes here
```

#### **src/services/** - Business Logic Layer
Keep business logic separate from controllers:

```typescript
// services/quiz.service.ts
import { Quiz, CreateQuizDto } from '../models/quiz.model';
import { QuizRepository } from '../repositories/quiz.repository';

export class QuizService {
  constructor(private quizRepository: QuizRepository) {}

  async createQuiz(teacherId: string, data: CreateQuizDto): Promise<Quiz> {
    // Validation and business logic
    const quiz = await this.quizRepository.create({
      ...data,
      teacherId,
      urlId: this.generateUrlId()
    });
    return quiz;
  }

  private generateUrlId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
```

#### **src/controllers/** - Request Handlers
Handle HTTP requests and responses:

```typescript
// controllers/quiz.controller.ts
import { Request, Response, NextFunction } from 'express';
import { QuizService } from '../services/quiz.service';
import { AuthRequest } from '../types/express';

export class QuizController {
  constructor(private quizService: QuizService) {}

  createQuiz = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const quiz = await this.quizService.createQuiz(req.user.id, req.body);
      res.status(201).json({
        success: true,
        data: quiz,
        message: 'Quiz created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  // Other controller methods...
}
```

#### **src/routes/** - API Route Definitions
Define routes and apply middlewares:

```typescript
// routes/quiz.routes.ts
import { Router } from 'express';
import { QuizController } from '../controllers/quiz.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validation.middleware';
import { createQuizSchema } from '../validators/quiz.validator';

const router = Router();
const quizController = new QuizController(/* inject dependencies */);

router.post(
  '/',
  authenticateToken,
  validateRequest(createQuizSchema),
  quizController.createQuiz
);

router.get('/', authenticateToken, quizController.getAllQuizzes);
router.get('/:id', authenticateToken, quizController.getQuizById);
router.put('/:id', authenticateToken, quizController.updateQuiz);
router.delete('/:id', authenticateToken, quizController.deleteQuiz);

export default router;
```

```typescript
// routes/index.ts - Main router
import { Router } from 'express';
import authRoutes from './auth.routes';
import quizRoutes from './quiz.routes';
import submissionRoutes from './submission.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/quizzes', quizRoutes);
router.use('/submissions', submissionRoutes);

export default router;
```

#### **src/middlewares/** - Express Middlewares
Create reusable middleware functions:

```typescript
// middlewares/auth.middleware.ts
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/env';
import { AuthRequest } from '../types/express';

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Access token required'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      error: 'Invalid or expired token'
    });
  }
};
```

```typescript
// middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: error.message
    });
  }

  console.error('Unexpected error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
};
```

```typescript
// middlewares/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params
      });
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: error
      });
    }
  };
};
```

#### **src/utils/** - Helper Functions
Place utility functions here:

```typescript
// utils/hash.ts
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

```typescript
// utils/jwt.ts
import jwt from 'jsonwebtoken';
import { config } from '../config/env';

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '7d' });
};
```

### Frontend Structure (React + Vite + TypeScript)

#### Component Structure
```typescript
// components/QuizCard.tsx
import { FC } from 'react';

interface QuizCardProps {
  id: string;
  title: string;
  duration: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const QuizCard: FC<QuizCardProps> = ({
  id,
  title,
  duration,
  onEdit,
  onDelete
}) => {
  return (
    <div className="quiz-card">
      <h3>{title}</h3>
      <p>Duration: {duration} minutes</p>
      <button onClick={() => onEdit(id)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};
```

#### Custom Hooks with TypeScript
```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

interface UseAuthReturn {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Implementation
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };
};
```

#### API Client with Types
```typescript
// api/quiz.api.ts
import { apiClient } from './client';

export interface Quiz {
  id: string;
  title: string;
  duration: number;
  questions: Question[];
}

export interface CreateQuizPayload {
  title: string;
  instructions: string;
  duration: number;
}

export const quizApi = {
  getAll: () => apiClient.get<Quiz[]>('/quizzes'),
  
  getById: (id: string) => apiClient.get<Quiz>(`/quizzes/${id}`),
  
  create: (data: CreateQuizPayload) => 
    apiClient.post<Quiz>('/quizzes', data),
  
  update: (id: string, data: Partial<CreateQuizPayload>) =>
    apiClient.put<Quiz>(`/quizzes/${id}`, data),
  
  delete: (id: string) => apiClient.delete(`/quizzes/${id}`)
};
```

### TypeScript Configuration

#### Backend tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "sourceMap": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Naming Conventions

#### Backend (TypeScript)
- **Files**: 
  - Controllers: `quiz.controller.ts`
  - Services: `quiz.service.ts`
  - Models: `quiz.model.ts`
  - Routes: `quiz.routes.ts`
  - Middlewares: `auth.middleware.ts`
  - Utils: `hash.util.ts`

- **Classes**: PascalCase (`QuizController`, `QuizService`)
- **Functions**: camelCase (`createQuiz`, `authenticateToken`)
- **Interfaces**: PascalCase (`Quiz`, `CreateQuizDto`)
- **Constants**: UPPER_SNAKE_CASE (`JWT_EXPIRES_IN`)

#### Frontend (TypeScript)
- **Components**: PascalCase files and exports (`QuizCard.tsx`)
- **Hooks**: camelCase starting with `use` (`useAuth.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Types/Interfaces**: PascalCase (`QuizFormData`)

### Type Safety Best Practices

1. **Define DTOs (Data Transfer Objects)**
```typescript
// Separate input/output types
export interface CreateQuizDto {
  title: string;
  instructions: string;
  duration: number;
}

export interface QuizResponseDto {
  id: string;
  title: string;
  urlId: string;
  createdAt: string;
}
```

2. **Use Type Guards**
```typescript
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};
```

3. **Extend Express Types**
```typescript
// types/express.d.ts
import { JwtPayload } from '../middlewares/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export type AuthRequest = Request & { user: JwtPayload };
```

4. **Use Zod or Joi for Runtime Validation**
```typescript
// validators/quiz.validator.ts
import { z } from 'zod';

export const createQuizSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(200),
    instructions: z.string().optional(),
    duration: z.number().positive().max(300)
  })
});
```

### Common Patterns

#### Dependency Injection Pattern
```typescript
// Promote testability and maintainability
export class QuizController {
  constructor(
    private quizService: QuizService,
    private logger: Logger
  ) {}
}
```

#### Repository Pattern
```typescript
// Abstract database operations
export interface QuizRepository {
  findById(id: string): Promise<Quiz | null>;
  create(data: CreateQuizDto): Promise<Quiz>;
  update(id: string, data: Partial<Quiz>): Promise<Quiz>;
  delete(id: string): Promise<void>;
}
```

### Error Handling

Always use typed errors:
```typescript
// services/quiz.service.ts
import { AppError } from '../middlewares/errorHandler';

export class QuizService {
  async getQuizById(id: string): Promise<Quiz> {
    const quiz = await this.quizRepository.findById(id);
    
    if (!quiz) {
      throw new AppError(404, 'Quiz not found');
    }
    
    return quiz;
  }
}
```

### Testing with TypeScript

```typescript
// __tests__/quiz.service.test.ts
import { QuizService } from '../services/quiz.service';
import { QuizRepository } from '../repositories/quiz.repository';

describe('QuizService', () => {
  let quizService: QuizService;
  let mockRepository: jest.Mocked<QuizRepository>;

  beforeEach(() => {
    mockRepository = {
      findById: jest.fn(),
      create: jest.fn(),
      // ... other methods
    } as any;
    
    quizService = new QuizService(mockRepository);
  });

  it('should create a quiz', async () => {
    const quizData = { title: 'Test Quiz', duration: 30 };
    mockRepository.create.mockResolvedValue({ id: '1', ...quizData });

    const result = await quizService.createQuiz('teacher1', quizData);
    
    expect(result).toHaveProperty('id');
    expect(mockRepository.create).toHaveBeenCalledWith(
      expect.objectContaining(quizData)
    );
  });
});
```

## Key Reminders for TypeScript

- **Never use `any`** - Use `unknown` and type guards instead
- **Prefer interfaces over types** for object shapes (better error messages)
- **Use `readonly`** for immutable properties
- **Enable `strict` mode** in tsconfig.json
- **Export types** from modules for reusability
- **Use enums or const assertions** for string literals
- **Type your async functions** with `Promise<T>`
- **Use utility types**: `Partial<T>`, `Pick<T>`, `Omit<T>`, `Required<T>`

---

**Remember**: TypeScript is a tool for catching bugs at compile time. Embrace strict typing, and the codebase will be more maintainable and less prone to runtime errors.
