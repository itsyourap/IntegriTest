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

### 5. **Create Quiz Page** (`/quiz/create`)

- **Location**: `src/pages/CreateQuiz.tsx`
- **Features**:
  - **Multi-step form with 3 steps**:

    **Step 1: Basic Information**
    - Quiz title input (required)
    - Instructions textarea (optional)
    - Duration selector (5-300 minutes)
    - Start date and time picker
    - End date and time picker
    - Security settings:
      - Tab Switch Detection toggle
      - Screenshot Protection toggle

    **Step 2: Add Questions**
    - Question textarea
    - 4 answer options with radio button selection for correct answer
    - Add question button
    - List of added questions with preview
    - Remove question functionality
    - Visual indication of correct answers

    **Step 3: Review & Publish**
    - Complete quiz summary
    - All quiz metadata display
    - Questions preview with correct answers highlighted
    - Publishing checklist and warnings
  
  - **Navigation**:
    - Progress indicator with 3 steps
    - Previous/Next buttons
    - Back to Dashboard link
  
  - **Actions**:
    - Save as Draft button (Step 3)
    - Publish Quiz button (Step 3)
    - Loading states during save
  
  - **Validation**:
    - Client-side validation on each step
    - Error messages for invalid inputs
    - Prevents progression without required fields

### 6. **Take Quiz Page** (`/quiz/:urlId`)

- **Location**: `src/pages/TakeQuiz.tsx`
- **Type**: Public page (no authentication required)
- **Features**:
  
  **Start Screen**:
  - Quiz title and metadata display
  - Duration and question count
  - Detailed instructions
  - Security measures warning banner
  - Student name input (required)
  - Start Quiz button
  
  **Quiz Interface**:
  - Clean, distraction-free design
  - One question at a time
  - Multiple choice answers (A, B, C, D)
  - Visual feedback for selected answers
  - Progress bar showing current question number
  - Questions answered counter
  - Previous/Next navigation buttons
  - Submit Quiz button on final question
  
  **Timer & Controls**:
  - Live countdown timer in header
  - Red warning when < 5 minutes remaining
  - Auto-submit when time runs out
  - Student name displayed in header
  
  **Anti-Cheating Features**:
  - **Tab Switch Detection**:
    - Tracks when student switches tabs or minimizes window
    - Shows warning banner on detection
    - Auto-submits quiz after 3 violations
  - **Screenshot Protection**:
    - Blocks PrintScreen key
    - Blocks Windows Snipping Tool (Ctrl+Shift+S)
    - Blocks macOS screenshot shortcuts (Cmd+Shift+3/4/5)
    - Shows alert when screenshot attempt detected
  - **Content Protection**:
    - Right-click disabled
    - Text selection disabled
    - Copy/paste disabled
  
  **Submission**:
  - Confirmation dialog for unanswered questions
  - Loading state during submission
  - Score calculation
  - Automatic navigation to results page
  - Tracks metadata: time spent, tab switch count
  
- **Dummy Data**: 5-question JavaScript quiz with multiple choice answers
- **TODO**: Backend API integration for fetching quiz and submitting answers

## Routing Setup

The application uses **React Router v6** for navigation:

```tsx
<Router>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/quiz/create" element={<CreateQuiz />} />
    <Route path="/quiz/:urlId" element={<TakeQuiz />} />
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

1. **Create Results Page** (`/quiz/:urlId/result`):
   - Display quiz completion message
   - Show score and performance metrics
   - Question-by-question review
   - Correct vs incorrect answers
   - Time spent and violations
   - Share results or return home

2. **Create Quiz Editor Page** (`/quiz/:id/edit`):
   - Edit existing quizzes
   - Similar to quiz creator but with pre-filled data
   - Load quiz from backend
   - Update existing questions

3. **Connect to Backend API**:
   - Implement actual API calls in all pages
   - Add authentication token management (JWT)
   - Set up protected routes
   - Error handling and loading states

4. **Create Results Dashboard** (`/quiz/:id/results`):
   - Teacher view of all submissions
   - Individual student performance
   - Analytics and statistics
   - Export functionality

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
