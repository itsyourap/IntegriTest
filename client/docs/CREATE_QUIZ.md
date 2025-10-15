# Create Quiz Page - Feature Documentation

## URL

`/quiz/create`

## Overview

A comprehensive multi-step form wizard for creating secure, integrity-focused quizzes. The page guides teachers through three distinct steps: Basic Information, Question Creation, and Review & Publish.

## Page Structure

### Navigation Header

- **Back to Dashboard** link (left) - Returns to dashboard
- **IntegriTest Logo** (center) - Links to home page
- Minimalist design to keep focus on quiz creation

### Progress Indicator

Visual step tracker showing:

1. **Step 1**: Basic Info (file icon)
2. **Step 2**: Questions (file icon)
3. **Step 3**: Review & Publish (eye icon)

- Active step highlighted in indigo
- Completed steps show checkmark
- Progress bar connects steps

## Step 1: Basic Information

### Form Fields

#### 1. Quiz Title (Required)

- Text input
- Placeholder: "e.g., Introduction to JavaScript"
- Max width text field
- Focus state with indigo ring

#### 2. Instructions (Optional)

- Textarea (4 rows)
- Allows teachers to provide context and guidelines
- Resizable disabled for consistent layout

#### 3. Duration (Required)

- Number input with clock icon
- Range: 5-300 minutes
- Helper text shows valid range
- Default: 30 minutes

#### 4. Date & Time Range

**_Start Date & Time_**

- DateTime-local input with calendar icon
- Optional but recommended

**_End Date & Time_**

- DateTime-local input with calendar icon
- Optional but recommended
- Should be after start date (validated on backend)

### Security Settings Section

#### Tab Switch Detection

- Checkbox toggle
- **Default**: Enabled
- **Description**: "Automatically submit quiz if student switches tabs or minimizes window"
- Prevents students from looking up answers

#### Screenshot Protection

- Checkbox toggle
- **Default**: Enabled
- **Description**: "Screen turns black when screenshot attempts are detected"
- Protects quiz content from being captured

### Validation

- Title must not be empty
- Duration must be between 5 and 300 minutes
- Error messages displayed at top of form

## Step 2: Add Questions

### Added Questions List

Shows all questions that have been added:

- **Question number and text**
- **All answer options** (A, B, C, D)
- **Correct answer** marked with ✓ in green
- **Remove button** (trash icon) for each question
- Gray background with rounded borders
- Stacked layout for easy review

### Current Question Form

#### Question Input

- Textarea (3 rows)
- Placeholder: "Enter your question here..."
- Required before adding

#### Answer Options (4 options)

For each option:

- **Radio button** to mark as correct answer (left)
- **Text input** for the option text (center)
- **Status indicator** showing "✓ Correct" in green for selected option (right)
- Labels: Option A, Option B, Option C, Option D

**Validation**:

- At least 2 options must have text
- One option must be marked as correct (radio selection)

#### Add Question Button

- Full-width dashed border button
- Plus icon with text "Add Question"
- Adds current question to the list
- Resets form for next question

### Features

- **Real-time validation**: Prevents adding incomplete questions
- **Visual feedback**: Correct answers clearly marked
- **Easy editing**: Remove questions from list
- **Question counter**: Shows total questions added

## Step 3: Review & Publish

### Quiz Summary Card

Highlighted card (indigo background) showing:

#### Title

- Large, bold display of quiz title

#### Metadata Grid (2 columns)

- **Duration**: X minutes
- **Total Questions**: Count of questions
- **Start Date**: Formatted date and time (or "Not set")
- **End Date**: Formatted date and time (or "Not set")

#### Instructions

- Displayed if provided
- Full text shown

#### Security Badges

- Indigo pills with shield icon
- Shows enabled features:
  - "Tab Detection"
  - "Screenshot Block"

### Questions Preview

Full preview of all questions with:

- **Question number and text**
- **All answer options** in styled boxes
- **Correct answer** highlighted with green background
- Clean, readable layout

### Publishing Checklist

Yellow warning box with checklist:

- Review all questions and answers carefully
- Verify the duration and date settings
- Check anti-cheating settings are configured correctly
- Note about draft saving option

### Action Buttons

#### Save as Draft

- Gray bordered button
- Saves quiz without publishing
- Can be edited later
- Doesn't make quiz available to students

#### Publish Quiz

- Primary indigo button with save icon
- Makes quiz live and accessible via link
- Shows loading spinner during save
- Success alert on completion

## Navigation Flow

### Previous Button

- Available on Steps 2 and 3
- Gray bordered button
- Returns to previous step
- Disabled on Step 1

### Next Step Button

- Available on Steps 1 and 2
- Primary indigo button
- Validates current step before proceeding
- Shows appropriate error messages

## Validation & Error Handling

### Step 1 Validation

- Quiz title is required
- Duration must be 5-300 minutes
- Error banner appears if validation fails

### Step 2 Validation

- At least one question must be added
- Each question must have:
  - Non-empty question text
  - At least 2 answer options
  - One selected correct answer
- Error banner prevents progression

### Step 3 Actions

- Final validation before save
- Loading states during API calls
- Success message on completion
- Redirects to dashboard after successful save

## User Experience Features

### Visual Hierarchy

- Clear step indicators
- Color-coded sections (indigo for primary actions)
- Consistent spacing and typography
- Icon usage for visual cues

### Form Usability

- Proper input types (text, number, datetime-local)
- Placeholders for guidance
- Helper text for constraints
- Focus states for accessibility

### Feedback

- Error messages contextual and specific
- Success confirmation on quiz creation
- Loading states during async operations
- Progress visible throughout process

### Responsive Design

- Single-column layout for focus
- Mobile-friendly inputs
- Grid layouts adapt to screen size
- Touch-friendly buttons and controls

## Technical Implementation

### State Management

```typescript
interface QuizFormData {
  title: string;
  instructions: string;
  duration: number;
  startDate: string;
  endDate: string;
  tabSwitchDetection: boolean;
  screenshotProtection: boolean;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}
```

### Component Structure

- `CreateQuiz` - Main component
- `StepIndicator` - Progress step display
- `Step1BasicInfo` - Basic information form
- `Step2Questions` - Question creation interface
- `Step3Review` - Review and publish screen

### Navigation

- React Router for routing
- Programmatic navigation on success
- Back button for UX

## Future Enhancements

1. **Question Types**:
   - True/False questions
   - Multiple correct answers
   - Short answer/essay questions
   - File upload questions

2. **Advanced Features**:
   - Question bank/templates
   - Import questions from CSV/JSON
   - Randomize question order
   - Randomize answer options
   - Question categories/tags

3. **Rich Text Editor**:
   - Formatting options for questions
   - Image upload for questions
   - Code snippet support
   - Math equations (LaTeX)

4. **Validation Improvements**:
   - Date range validation (end after start)
   - Duplicate question detection
   - Character limits with counters
   - Auto-save drafts

5. **Collaboration**:
   - Share quiz with other teachers
   - Duplicate existing quiz
   - Quiz templates library

## API Integration Points

### Create Quiz Endpoint

**POST** `/api/quizzes`

**Payload**:

```json
{
  "title": "string",
  "instructions": "string",
  "duration": "number",
  "startDate": "ISO string",
  "endDate": "ISO string",
  "tabSwitchDetection": "boolean",
  "screenshotProtection": "boolean",
  "questions": [
    {
      "question": "string",
      "options": ["string"],
      "correctAnswer": "number"
    }
  ],
  "status": "draft | published"
}
```

**Response**:

```json
{
  "success": true,
  "data": {
    "id": "string",
    "urlId": "string",
    "...": "quiz data"
  },
  "message": "Quiz created successfully"
}
```

## Accessibility

- Semantic HTML elements
- Proper label associations
- Keyboard navigation support
- ARIA attributes where needed
- Focus management between steps
- Screen reader friendly
