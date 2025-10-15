import { type FC, useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Flag,
} from 'lucide-react';

// Dummy quiz data
const DUMMY_QUIZ = {
  id: '1',
  urlId: 'js-intro-2024',
  title: 'Introduction to JavaScript',
  instructions: 'Read each question carefully and select the best answer. You have 45 minutes to complete this quiz. Do not switch tabs or take screenshots during the quiz.',
  duration: 45, // minutes
  tabSwitchDetection: true,
  screenshotProtection: true,
  questions: [
    {
      id: '1',
      question: 'What is JavaScript primarily used for?',
      options: [
        'Creating databases',
        'Making web pages interactive',
        'Designing graphics',
        'Managing servers',
      ],
      correctAnswer: 1,
    },
    {
      id: '2',
      question: 'Which keyword is used to declare a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      correctAnswer: 3,
    },
    {
      id: '3',
      question: 'What does DOM stand for?',
      options: [
        'Document Object Model',
        'Data Object Management',
        'Digital Output Method',
        'Dynamic Object Manipulation',
      ],
      correctAnswer: 0,
    },
    {
      id: '4',
      question: 'Which operator is used for strict equality in JavaScript?',
      options: ['==', '===', '=', '!='],
      correctAnswer: 1,
    },
    {
      id: '5',
      question: 'What is the output of: console.log(typeof [])?',
      options: ['array', 'object', 'list', 'undefined'],
      correctAnswer: 1,
    },
  ],
};

interface Answer {
  questionId: string;
  selectedOption: number | null;
}

const TakeQuiz: FC = () => {
  const { urlId } = useParams<{ urlId: string }>();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState('');
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(DUMMY_QUIZ.duration * 60); // in seconds
  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [disableContentVisibility, setDisableContentVisibility] = useState(false);

  // Initialize answers array
  useEffect(() => {
    if (hasStarted && answers.length === 0) {
      setAnswers(
        DUMMY_QUIZ.questions.map((q) => ({
          questionId: q.id,
          selectedOption: null,
        }))
      );
    }
  }, [hasStarted, answers.length]);

  // Submit quiz handler (defined early to be used in other hooks)
  const handleSubmitQuiz = useCallback(async (autoSubmit = false) => {
    if (!autoSubmit) {
      const unanswered = answers.filter((a) => a.selectedOption === null).length;
      if (unanswered > 0) {
        const confirm = window.confirm(
          `You have ${unanswered} unanswered question(s). Do you want to submit anyway?`
        );
        if (!confirm) return;
      }
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Calculate score
      let correctCount = 0;
      answers.forEach((answer) => {
        const question = DUMMY_QUIZ.questions.find((q) => q.id === answer.questionId);
        if (question && answer.selectedOption === question.correctAnswer) {
          correctCount++;
        }
      });

      const score = (correctCount / DUMMY_QUIZ.questions.length) * 100;

      // TODO: Make actual API request to /api/submissions
      console.log('Submitting quiz:', {
        quizId: DUMMY_QUIZ.id,
        studentName,
        answers,
        score,
        tabSwitchCount,
        timeSpent: DUMMY_QUIZ.duration * 60 - timeRemaining,
      });

      // Navigate to results page
      navigate(`/quiz/${urlId}/result`, {
        state: { score, correctCount, totalQuestions: DUMMY_QUIZ.questions.length },
      });
    } catch {
      alert('Failed to submit quiz. Please try again.');
      setIsSubmitting(false);
    }
  }, [answers, navigate, urlId, studentName, tabSwitchCount, timeRemaining]);

  // Timer countdown
  useEffect(() => {
    if (!hasStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz(true); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, timeRemaining, handleSubmitQuiz]);

  // Tab switch detection
  const handleVisibilityChange = useCallback(() => {
    if (hasStarted && document.hidden && DUMMY_QUIZ.tabSwitchDetection) {
      setTabSwitchCount((prev) => prev + 1);
      setShowWarning(true);

      // Auto-submit after 3 tab switches
      if (tabSwitchCount >= 2) {
        alert('You have switched tabs too many times. Quiz will be auto-submitted.');
        handleSubmitQuiz(true);
      } else {
        setTimeout(() => setShowWarning(false), 5000);
      }
    }
  }, [hasStarted, tabSwitchCount, handleSubmitQuiz]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [handleVisibilityChange]);

  // Screenshot protection
  useEffect(() => {
    if (!hasStarted || !DUMMY_QUIZ.screenshotProtection) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isPrintScr = (e.metaKey) || (e.key === 'PrintScreen');
      // Prevent common screenshot shortcuts
      if (isPrintScr) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setDisableContentVisibility(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const isPrintScr = (e.metaKey) || (e.key === 'PrintScreen');
      // Restore visibility after screenshot attempt
      if (!isPrintScr) {
        console.log('Key up detected, restoring visibility');
        console.log('DisableContentVisibility:', disableContentVisibility);
        setDisableContentVisibility(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasStarted]);

  // Disable right-click and text selection
  useEffect(() => {
    if (!hasStarted) return;

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
    };
  }, [hasStarted]);

  const handleStartQuiz = () => {
    if (!studentName.trim()) {
      alert('Please enter your name to start the quiz');
      return;
    }
    setHasStarted(true);
  };

  const handleAnswerSelect = (questionId: string, optionIndex: number) => {
    setAnswers((prev) =>
      prev.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedOption: optionIndex }
          : answer
      )
    );
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = DUMMY_QUIZ.questions[currentQuestionIndex];
  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);
  const answeredCount = answers.filter((a) => a.selectedOption !== null).length;

  // Start screen
  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
              <Shield className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{DUMMY_QUIZ.title}</h1>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {DUMMY_QUIZ.duration} minutes
              </span>
              <span>•</span>
              <span>{DUMMY_QUIZ.questions.length} questions</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Instructions:</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{DUMMY_QUIZ.instructions}</p>
          </div>

          {/* Security Features Warning */}
          {(DUMMY_QUIZ.tabSwitchDetection || DUMMY_QUIZ.screenshotProtection) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Security Measures:</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    {DUMMY_QUIZ.tabSwitchDetection && (
                      <li>• Quiz will auto-submit if you switch tabs or minimize window</li>
                    )}
                    {DUMMY_QUIZ.screenshotProtection && (
                      <li>• Screenshots are blocked during the quiz</li>
                    )}
                    <li>• Right-click and copy-paste are disabled</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Student Name Input */}
          <div className="mb-6">
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Full Name *
            </label>
            <input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Start Button */}
          <button
            onClick={handleStartQuiz}
            className="w-full py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <>
      {disableContentVisibility && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center flex-col gap-4">
          <p className="text-gray-700 text-lg">Content hidden to prevent screenshots</p>
          <p className="text-gray-700 text-lg">Press any key to continue</p>
        </div>
      )}
      <div className="min-h-screen bg-gray-50">
        {/* Warning Banner */}
        {showWarning && (
          <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-3 px-4 z-50 animate-pulse">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">
                Warning: Probable Cheating detected! ({tabSwitchCount}/3)
              </span>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-indigo-600" />
                <span className="font-bold text-gray-900">{DUMMY_QUIZ.title}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-sm text-gray-600">
                  {studentName}
                </div>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${timeRemaining < 300
                    ? 'bg-red-100 text-red-700'
                    : 'bg-indigo-100 text-indigo-700'
                    }`}
                >
                  <Clock className="h-5 w-5" />
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {DUMMY_QUIZ.questions.length}
              </span>
              <span className="text-sm text-gray-600">
                Answered: {answeredCount}/{DUMMY_QUIZ.questions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / DUMMY_QUIZ.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                  className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all ${currentAnswer?.selectedOption === index
                    ? 'border-indigo-600 bg-indigo-50'
                    : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${currentAnswer?.selectedOption === index
                        ? 'border-indigo-600 bg-indigo-600'
                        : 'border-gray-400'
                        }`}
                    >
                      {currentAnswer?.selectedOption === index && (
                        <CheckCircle className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <span
                      className={`font-medium ${currentAnswer?.selectedOption === index
                        ? 'text-indigo-900'
                        : 'text-gray-700'
                        }`}
                    >
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="text-sm text-gray-600">
              {currentAnswer?.selectedOption !== null ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  Answered
                </span>
              ) : (
                <span className="text-gray-500">Not answered</span>
              )}
            </div>

            {currentQuestionIndex < DUMMY_QUIZ.questions.length - 1 ? (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(DUMMY_QUIZ.questions.length - 1, prev + 1)
                  )
                }
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={() => handleSubmitQuiz(false)}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Flag className="h-5 w-5" />
                    Submit Quiz
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TakeQuiz;
