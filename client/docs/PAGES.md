# IntegriTest Frontend

## Pages Created

### 1. **Home Page** (`/`)

- **Location**: `src/pages/Home.tsx`
- **Features**:
  - Hero section with project description
  - Security features showcase (Tab Switch Detection, Screenshot Protection, Content Protection)
  - Feature cards for Teachers and Students
  - Technology stack display
  - Call-to-action sections
  - Footer with links
- **Navigation**: Links to Login and Sign Up pages

### 2. **Login Page** (`/login`)

- **Location**: `src/pages/Login.tsx`
- **Features**:
  - Email and password authentication form
  - Password visibility toggle
  - "Remember me" checkbox
  - "Forgot password" link
  - Loading state during submission
  - Error message display
  - Client-side validation
  - Link to Sign Up page
- **Authentication**: JWT-based (to be connected to backend API)

### 3. **Sign Up Page** (`/signup`)

- **Location**: `src/pages/SignUp.tsx`
- **Features**:
  - Registration form with name, email, password fields
  - Password strength validator with real-time feedback
  - Password confirmation field
  - Password visibility toggles
  - Terms and conditions checkbox
  - Loading state during submission
  - Error message display
  - Comprehensive client-side validation
  - Link to Login page
- **Password Requirements**:
  - Minimum 8 characters
  - One uppercase letter
  - One lowercase letter
  - One number

### 4. **Dashboard Page** (`/dashboard`)

- **Location**: `src/pages/Dashboard.tsx`
- **Features**:
  - Teacher profile header with name and email
  - Statistics cards showing:
    - Total quizzes created
    - Active quizzes count
    - Total students reached
    - Total submissions received
  - Search functionality to filter quizzes by title
  - Status filter (All, Active, Closed, Draft)
  - "Create Quiz" button for quick access
  - Quiz list with detailed cards showing:
    - Quiz title, status badge, and metadata
    - Duration, question count, submissions, and average score
    - Start and end dates
    - Anti-cheating features enabled (tab detection, screenshot blocking)
    - Actions menu with:
      - Edit quiz
      - View results
      - Copy quiz link
      - Preview quiz
      - Delete quiz
  - Empty state for no quizzes
  - Settings and logout buttons
- **Dummy Data**: 5 sample quizzes with varied status (active, closed, draft)

## Routing Setup

The application uses **React Router v6** for navigation:

```tsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
</Router>
```

## Styling

- **Framework**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Color Scheme**: Indigo primary color with gradient backgrounds
- **Design**: Modern, clean, and professional UI

## Next Steps

### Immediate Tasks

1. **Connect to Backend API**:
   - Implement actual API calls in Login and SignUp pages
   - Add authentication token management (JWT)
   - Set up protected routes

2. **Create Dashboard Page** (`/dashboard`):
   - Teacher's quiz management interface
   - Display all created quizzes
   - Quick actions (Create, Edit, Delete)
   - Analytics overview

3. **Create Quiz Creator Page** (`/quiz/create`):
   - Multi-step form for quiz creation
   - Question management (add, edit, delete)
   - Quiz settings (duration, start/end times, anti-cheating features)

4. **Create Quiz Editor Page** (`/quiz/:id/edit`):
   - Edit existing quizzes
   - Similar to quiz creator but with pre-filled data

5. **Create Student Quiz Page** (`/quiz/:urlId`):
   - Public page for students (no authentication)
   - Display quiz questions one at a time
   - Countdown timer
   - Anti-cheating features implementation

6. **Create Results Page** (`/quiz/:id/results`):
   - Display student submissions
   - Individual student performance
   - Analytics and statistics

### Backend Integration

- Set up API service layer
- Create authentication context/hook
- Implement token refresh mechanism
- Add error boundary components
- Set up loading states globally

### Additional Features

- Toast notifications for success/error messages
- Form validation library (e.g., Zod, Yup)
- State management (Context API or Zustand)
- Protected route wrapper component
- Responsive design improvements for mobile

## Running the Application

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

The application runs on `http://localhost:5173/` by default.

## Dependencies

- **react**: ^19.1.1
- **react-dom**: ^19.1.1
- **react-router-dom**: ^7.9.4
- **lucide-react**: ^0.545.0
- **tailwindcss**: ^4.1.14
- **@tailwindcss/postcss**: ^4.1.14

## TypeScript Configuration

The project follows strict TypeScript guidelines:

- Strict mode enabled
- Type-only imports for types
- Explicit return types encouraged
- No `any` types (use `unknown` with type guards)
