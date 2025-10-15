# Dashboard Page - Feature Overview

## URL

`/dashboard`

## Visual Design

The Dashboard page features a clean, modern interface with:

- **White navigation header** with IntegriTest logo
- **Light gray background** (bg-gray-50) for content area
- **Card-based layout** with shadows and borders
- **Indigo primary color** for buttons and accents

## Components & Features

### 1. Navigation Header

- **Logo**: IntegriTest with shield icon (left)
- **User Profile Section** (right):
  - Teacher name: "Dr. Sarah Johnson"
  - Email: <sarah.johnson@university.edu>
  - Settings icon button
  - Logout button (red on hover)

### 2. Statistics Cards (Top Section)

Four metric cards displaying:

1. **Total Quizzes** (Blue)
   - Icon: FileText
   - Value: 5

2. **Active Quizzes** (Green)
   - Icon: CheckCircle
   - Value: 2

3. **Total Students** (Purple)
   - Icon: Users
   - Value: 120

4. **Total Submissions** (Orange)
   - Icon: BarChart3
   - Value: 120

### 3. Actions Bar

- **Search Input**: Filter quizzes by title (left)
- **Status Dropdown**: Filter by All/Active/Closed/Draft
- **Create Quiz Button**: Large indigo button with Plus icon

### 4. Quiz List

Displays detailed cards for each quiz with:

#### Quiz Information

- **Title** (clickable, links to edit page)
- **Status Badge**: Color-coded (green=active, gray=closed, yellow=draft)
- **Metadata Grid**:
  - Duration (Clock icon) - e.g., "45 mins"
  - Questions (FileText icon) - e.g., "20 questions"
  - Submissions (Users icon) - e.g., "28 submissions"
  - Average Score (BarChart3 icon) - e.g., "78.5% avg"
- **Date Information**:
  - Start date and time
  - End date and time
- **Anti-Cheating Badges**:
  - Tab Detection (if enabled)
  - Screenshot Block (if enabled)

#### Actions Menu (Three dots)

- **Edit Quiz** - Navigate to edit page
- **View Results** - See submissions and analytics
- **Copy Link** - Copy quiz link to clipboard
- **Preview Quiz** - Open quiz in new tab
- **Delete Quiz** - Remove quiz (with confirmation)

### 5. Empty State

When no quizzes match filters:

- FileText icon (gray)
- Heading: "No quizzes found"
- Description with context-aware message
- "Create Your First Quiz" button (if no quizzes exist)

## Dummy Data

### Teacher Information

```javascript
{
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  totalQuizzes: 5,
  totalStudents: 120,
  activeQuizzes: 2,
  totalSubmissions: 120
}
```

### Quiz Examples

**1. Introduction to JavaScript** (Active)

- Duration: 45 minutes
- Questions: 20
- Submissions: 28
- Average Score: 78.5%
- Anti-cheating: Tab Switch + Screenshot Block
- Start: Oct 10, 2024, 09:00 AM
- End: Oct 15, 2024, 11:59 PM

**2. React Fundamentals Quiz** (Active)

- Duration: 60 minutes
- Questions: 25
- Submissions: 15
- Average Score: 82.3%
- Anti-cheating: Tab Switch + Screenshot Block
- Start: Oct 12, 2024, 10:00 AM
- End: Oct 20, 2024, 06:00 PM

**3. Database Design Final Exam** (Closed)

- Duration: 90 minutes
- Questions: 35
- Submissions: 42
- Average Score: 71.8%
- Anti-cheating: Tab Switch + Screenshot Block
- Start: Sep 20, 2024, 09:00 AM
- End: Sep 25, 2024, 05:00 PM

**4. Python Programming Midterm** (Draft)

- Duration: 75 minutes
- Questions: 30
- Submissions: 0
- Average Score: N/A
- Anti-cheating: None enabled
- Start: Nov 1, 2024, 10:00 AM
- End: Nov 5, 2024, 11:59 PM

**5. Web Development Basics** (Closed)

- Duration: 30 minutes
- Questions: 15
- Submissions: 35
- Average Score: 85.2%
- Anti-cheating: Tab Switch only
- Start: Oct 8, 2024, 08:00 AM
- End: Oct 12, 2024, 08:00 PM

## Interactive Features

### Search Functionality

- Real-time filtering as you type
- Case-insensitive search
- Matches against quiz titles

### Status Filter

- Dropdown with 4 options:
  - All Status (default)
  - Active
  - Closed
  - Draft
- Updates quiz list immediately

### Copy Link Feature

- Generates full URL: `http://localhost:5173/quiz/{urlId}`
- Copies to clipboard
- Shows confirmation alert

### Delete Confirmation

- Browser confirm dialog before deletion
- Displays quiz title in confirmation message

## Responsive Design

- Grid layout adapts to screen size
- Mobile-friendly cards and navigation
- Collapsible sections on smaller screens

## Future Enhancements

1. Connect to backend API for real data
2. Add pagination for large quiz lists
3. Implement actual delete/edit functionality
4. Add quiz duplication feature
5. Include more detailed analytics preview
6. Add export functionality for results
7. Implement batch actions (multi-select)
8. Add quiz templates
9. Real-time submission notifications

## Navigation Flow

- **From Login/SignUp**: Successful authentication redirects to Dashboard
- **To Quiz Creator**: Click "Create Quiz" button
- **To Quiz Editor**: Click quiz title or "Edit Quiz" in menu
- **To Results**: Click "View Results" in quiz menu
- **To Logout**: Click logout button in header
