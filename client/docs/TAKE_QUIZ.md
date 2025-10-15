# Take Quiz Page Documentation

## Overview

The **Take Quiz** page (`/quiz/:urlId`) is a public-facing page where students take quizzes without requiring authentication. It features a clean, distraction-free interface with robust anti-cheating mechanisms to ensure academic integrity.

**Location**: `src/pages/TakeQuiz.tsx`

## Page Flow

### 1. Start Screen (Pre-Quiz)

Before the quiz begins, students see:

- **Quiz Information**:
  - Quiz title
  - Duration (e.g., "45 minutes")
  - Total number of questions
  
- **Instructions Panel** (Blue Background):
  - Detailed quiz instructions
  - Rules and guidelines
  
- **Security Warning Panel** (Red Background):
  - List of active anti-cheating measures
  - Clear warnings about consequences
  - Alerts about tab switching and screenshot blocking
  
- **Student Name Input**:
  - Required field
  - Used for submission tracking
  
- **Start Quiz Button**:
  - Validates that name is entered
  - Begins quiz and starts timer

### 2. Quiz Interface (Active Quiz)

Once started, students enter the quiz-taking experience:

#### Header Bar

- **Left**: Quiz title with shield icon
- **Right**:
  - Student name
  - Live countdown timer (turns red when < 5 minutes)

#### Main Content Area

- **Progress Bar**:
  - Shows "Question X of Y"
  - Shows "Answered: X/Y"
  - Visual progress indicator
  
- **Question Card**:
  - Large, numbered question text
  - 4 multiple choice options (A, B, C, D)
  - Radio button-style selection
  - Selected option highlighted in indigo
  
- **Navigation Controls**:
  - **Previous Button**: Navigate to previous question (disabled on Q1)
  - **Answer Status**: Shows if current question is answered
  - **Next Button**: Navigate to next question (changes to "Submit Quiz" on final question)

### 3. Submission

- **Pre-submission Check**:
  - Warns if there are unanswered questions
  - Requires confirmation to proceed
  
- **Submission Process**:
  - Shows loading spinner
  - Calculates score
  - Records metadata (time spent, tab switches)
  - Navigates to results page with score data

## Anti-Cheating Features

### 1. Tab Switch Detection

**How it works**:

- Monitors the `visibilitychange` event
- Increments counter when student switches tabs or minimizes window
- Shows warning banner at top of screen

**Enforcement**:

- **1st violation**: Warning banner appears for 5 seconds
- **2nd violation**: Warning banner appears again
- **3rd violation**: Quiz auto-submits immediately

**Visual Feedback**:

```text
Warning: Tab switching detected! (2/3)
```

### 2. Screenshot Protection

**Blocked Actions**:

- PrintScreen key
- Windows Snipping Tool (Ctrl+Shift+S)
- macOS screenshot shortcuts:
  - Cmd+Shift+3 (Full screen)
  - Cmd+Shift+4 (Selection)
  - Cmd+Shift+5 (Screenshot UI)

**Response**:

- Alert message: "Screenshots are not allowed during this quiz!"
- Screen briefly hidden for 1 second (on PrintScreen)

### 3. Content Protection

**Disabled Features**:

- Right-click context menu
- Text selection (selectstart event)
- Copy/paste (clipboard events)

**Implementation**:

- Event listeners added when quiz starts
- Removed when quiz ends
- Prevents content extraction

## Timer System

### Countdown Timer

- **Initial Time**: Set from quiz duration (e.g., 45 minutes = 2700 seconds)
- **Display Format**: `MM:SS` (e.g., "44:52")
- **Update Frequency**: Every 1 second

### Visual States

```tsx
// Normal state (> 5 minutes)
bg-indigo-100 text-indigo-700

// Warning state (< 5 minutes)
bg-red-100 text-red-700
```

### Auto-Submit

When timer reaches 0:

1. Automatically calls `handleSubmitQuiz(true)`
2. No confirmation dialog shown
3. Submission includes time spent calculation

## Data Structure

### Quiz Data

```typescript
interface Quiz {
  id: string;
  urlId: string;  // URL-friendly identifier
  title: string;
  instructions: string;
  duration: number;  // in minutes
  tabSwitchDetection: boolean;
  screenshotProtection: boolean;
  questions: Question[];
}
```

### Question Data

```typescript
interface Question {
  id: string;
  question: string;
  options: string[];  // Array of 4 options
  correctAnswer: number;  // Index of correct option (0-3)
}
```

### Answer Tracking

```typescript
interface Answer {
  questionId: string;
  selectedOption: number | null;  // null if unanswered
}
```

## State Management

### Component State

```typescript
const [studentName, setStudentName] = useState('');
const [hasStarted, setHasStarted] = useState(false);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Answer[]>([]);
const [timeRemaining, setTimeRemaining] = useState(duration * 60);
const [tabSwitchCount, setTabSwitchCount] = useState(0);
const [isSubmitting, setIsSubmitting] = useState(false);
const [showWarning, setShowWarning] = useState(false);
```

### Key Functions

#### `handleStartQuiz()`

- Validates student name
- Sets `hasStarted` to true
- Initializes answers array
- Starts timer

#### `handleAnswerSelect(questionId, optionIndex)`

- Updates answers array for specific question
- Maintains immutable state update pattern

#### `handleSubmitQuiz(autoSubmit)`

- **autoSubmit = false**: User-initiated, checks for unanswered questions
- **autoSubmit = true**: Timer/violation triggered, no confirmation
- Calculates score
- Makes API request (TODO)
- Navigates to results page

## API Integration (TODO)

### Fetch Quiz Data

```typescript
// GET /api/quizzes/:urlId
// Response: Quiz object with questions
```

### Submit Quiz

```typescript
// POST /api/submissions
{
  quizId: string;
  studentName: string;
  answers: Answer[];
  score: number;
  tabSwitchCount: number;
  timeSpent: number;  // in seconds
}
```

## Dummy Data

Current implementation uses hardcoded quiz:

- **Title**: "Introduction to JavaScript"
- **Duration**: 45 minutes
- **Questions**: 5 multiple choice questions
- **Topics**: JS basics, variables, DOM, operators, types

## Accessibility Considerations

### Keyboard Navigation

- ✅ Full keyboard support for answer selection
- ✅ Tab navigation between options
- ✅ Enter to select/submit
- ❌ Arrow keys between questions (future enhancement)

### Screen Readers

- ⚠️ Limited ARIA labels (needs improvement)
- ✅ Semantic HTML structure
- ✅ Clear button labels

### Color Contrast

- ✅ WCAG AA compliant
- ✅ Red timer warning for low vision users
- ✅ High contrast selected states

## Security Considerations

### Client-Side Limitations

⚠️ **Important**: All anti-cheating measures are **client-side only** and can be bypassed by:

- Browser DevTools
- Disabling JavaScript
- Using virtual machines
- Screen recording software

### Backend Validation Required

The backend should:

- ✅ Validate submission time against quiz duration
- ✅ Log tab switch counts for review
- ✅ Track submission patterns
- ✅ Implement rate limiting
- ✅ Use proctoring integration (future)

## Performance

### Optimizations

- `useCallback` for expensive functions
- Minimal re-renders with proper dependency arrays
- Event listeners cleaned up in `useEffect` returns

### Bundle Impact

Heavy dependencies:

- `lucide-react`: ~50KB (icons)
- React Router: ~10KB (navigation)

## Future Enhancements

### High Priority

1. Backend API integration
2. Question randomization
3. Option shuffling
4. Results page implementation
5. Better accessibility (ARIA labels)

### Medium Priority

1. Proctoring integration (webcam, screen recording)
2. Question navigation panel (jump to question)
3. Bookmarking questions for review
4. Audio/video questions support
5. Image-based questions

### Low Priority

1. Dark mode support
2. Offline quiz attempt recovery
3. Partial save (resume later)
4. Multi-language support
5. Accessibility improvements (ARIA, keyboard shortcuts)

## Testing Recommendations

### Unit Tests

- [ ] Answer selection updates state correctly
- [ ] Timer countdown works properly
- [ ] Tab switch detection increments counter
- [ ] Auto-submit at 3 violations
- [ ] Score calculation is accurate

### Integration Tests

- [ ] Full quiz flow (start → answer → submit)
- [ ] Timer auto-submit
- [ ] Navigation between questions
- [ ] Form validation on start screen

### E2E Tests

- [ ] Student can complete quiz
- [ ] Anti-cheating warnings appear
- [ ] Quiz submits and navigates to results
- [ ] Tab switching triggers auto-submit

## Common Issues & Solutions

### Issue: Timer doesn't stop after submission

**Solution**: Cleanup interval in `useEffect` return

### Issue: Tab detection too sensitive

**Solution**: Debounce visibility change events (future enhancement)

### Issue: Screenshot alerts on legitimate actions

**Solution**: Refine key detection logic, add exceptions

### Issue: Lost progress on accidental refresh

**Solution**: Implement localStorage autosave (future)

## Related Documentation

- [PAGES.md](./PAGES.md) - Overview of all pages
- [CREATE_QUIZ.md](./CREATE_QUIZ.md) - Quiz creation flow
- [DASHBOARD.md](./DASHBOARD.md) - Teacher dashboard

---

**Last Updated**: October 15, 2025
**Status**: ✅ Implemented with dummy data, pending backend integration
