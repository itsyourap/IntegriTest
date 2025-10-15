import { type FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Clock,
  Calendar,
  FileText,
  Settings as SettingsIcon,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

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

const CreateQuiz: FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<QuizFormData>({
    title: '',
    instructions: '',
    duration: 30,
    startDate: '',
    endDate: '',
    tabSwitchDetection: true,
    screenshotProtection: true,
    questions: [],
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    id: Date.now().toString(),
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
  });

  const handleBasicInfoChange = <K extends keyof QuizFormData>(
    field: K,
    value: QuizFormData[K]
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const addQuestion = () => {
    if (!currentQuestion.question.trim()) {
      setError('Please enter a question');
      return;
    }

    const validOptions = currentQuestion.options.filter(opt => opt.trim() !== '');
    if (validOptions.length < 2) {
      setError('Please provide at least 2 options');
      return;
    }

    setFormData({
      ...formData,
      questions: [...formData.questions, { ...currentQuestion }],
    });

    setCurrentQuestion({
      id: Date.now().toString(),
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
    });
    setError('');
  };

  const removeQuestion = (id: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id),
    });
  };

  const handleQuestionChange = (value: string) => {
    setCurrentQuestion({ ...currentQuestion, question: value });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
  };

  const handleCorrectAnswerChange = (index: number) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: index });
  };

  const validateStep1 = (): boolean => {
    if (!formData.title.trim()) {
      setError('Please enter a quiz title');
      return false;
    }
    if (formData.duration < 5 || formData.duration > 300) {
      setError('Duration must be between 5 and 300 minutes');
      return false;
    }
    setError('');
    return true;
  };

  const validateStep2 = (): boolean => {
    if (formData.questions.length === 0) {
      setError('Please add at least one question');
      return false;
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2);
      setError('');
    }
  };

  const handleSaveQuiz = async (status: 'draft' | 'published') => {
    setIsSaving(true);
    setError('');

    try {
      // Validate final data
      if (!validateStep1() || !validateStep2()) {
        setIsSaving(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Make actual API request to /api/quizzes
      console.log('Creating quiz:', { ...formData, status });

      // On success, redirect to dashboard
      alert(`Quiz ${status === 'draft' ? 'saved as draft' : 'published'} successfully!`);
      navigate('/dashboard');
    } catch (err: unknown) {
      setError('Failed to save quiz. Please try again.');
      console.error('Error saving quiz:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span className="font-medium">Back to Dashboard</span>
            </Link>
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">IntegriTest</span>
            </Link>
            <div className="w-32" /> {/* Spacer for centering */}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Quiz</h1>
          <p className="text-gray-600">Design a secure quiz with anti-cheating features</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <StepIndicator
              number={1}
              label="Basic Info"
              active={currentStep === 1}
              completed={currentStep > 1}
            />
            <div className={`flex-1 h-1 mx-4 ${currentStep > 1 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            <StepIndicator
              number={2}
              label="Questions"
              active={currentStep === 2}
              completed={currentStep > 2}
            />
            <div className={`flex-1 h-1 mx-4 ${currentStep > 2 ? 'bg-indigo-600' : 'bg-gray-300'}`} />
            <StepIndicator
              number={3}
              label="Review & Publish"
              active={currentStep === 3}
              completed={false}
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {currentStep === 1 && (
            <Step1BasicInfo
              formData={formData}
              onChange={handleBasicInfoChange}
            />
          )}

          {currentStep === 2 && (
            <Step2Questions
              questions={formData.questions}
              currentQuestion={currentQuestion}
              onQuestionChange={handleQuestionChange}
              onOptionChange={handleOptionChange}
              onCorrectAnswerChange={handleCorrectAnswerChange}
              onAddQuestion={addQuestion}
              onRemoveQuestion={removeQuestion}
            />
          )}

          {currentStep === 3 && (
            <Step3Review formData={formData} />
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center gap-3">
            {currentStep === 3 && (
              <>
                <button
                  onClick={() => handleSaveQuiz('draft')}
                  disabled={isSaving}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save as Draft'}
                </button>
                <button
                  onClick={() => handleSaveQuiz('published')}
                  disabled={isSaving}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Publish Quiz
                    </>
                  )}
                </button>
              </>
            )}
            {currentStep < 3 && (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Next Step
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface StepIndicatorProps {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}

const StepIndicator: FC<StepIndicatorProps> = ({ number, label, active, completed }) => {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg mb-2 transition-colors ${completed
          ? 'bg-indigo-600 text-white'
          : active
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-300 text-gray-600'
          }`}
      >
        {completed ? <CheckCircle2 className="h-6 w-6" /> : number}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-indigo-600' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
  );
};

interface Step1Props {
  formData: QuizFormData;
  onChange: <K extends keyof QuizFormData>(field: K, value: QuizFormData[K]) => void;
}

const Step1BasicInfo: FC<Step1Props> = ({ formData, onChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6 text-indigo-600" />
        Basic Information
      </h2>

      {/* Quiz Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Quiz Title *
        </label>
        <input
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
          placeholder="e.g., Introduction to JavaScript"
          required
        />
      </div>

      {/* Instructions */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
          Instructions (Optional)
        </label>
        <textarea
          id="instructions"
          value={formData.instructions}
          onChange={(e) => onChange('instructions', e.target.value)}
          rows={4}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
          placeholder="Enter instructions for students taking this quiz..."
        />
      </div>

      {/* Duration */}
      <div>
        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
          Duration (minutes) *
        </label>
        <div className="relative">
          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="duration"
            type="number"
            value={formData.duration}
            onChange={(e) => onChange('duration', parseInt(e.target.value) || 0)}
            min="5"
            max="300"
            className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900"
            required
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">Between 5 and 300 minutes</p>
      </div>

      {/* Date Range */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date & Time
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="startDate"
              type="datetime-local"
              value={formData.startDate}
              onChange={(e) => onChange('startDate', e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900"
            />
          </div>
        </div>

        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date & Time
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="endDate"
              type="datetime-local"
              value={formData.endDate}
              onChange={(e) => onChange('endDate', e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Anti-Cheating Features */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <SettingsIcon className="h-5 w-5 text-indigo-600" />
          Security Settings
        </h3>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-6">
              <input
                id="tabSwitch"
                type="checkbox"
                checked={formData.tabSwitchDetection}
                onChange={(e) => onChange('tabSwitchDetection', e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="tabSwitch" className="font-medium text-gray-900 cursor-pointer">
                Tab Switch Detection
              </label>
              <p className="text-sm text-gray-600">
                Automatically submit quiz if student switches tabs or minimizes window
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-6">
              <input
                id="screenshot"
                type="checkbox"
                checked={formData.screenshotProtection}
                onChange={(e) => onChange('screenshotProtection', e.target.checked)}
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3">
              <label htmlFor="screenshot" className="font-medium text-gray-900 cursor-pointer">
                Screenshot Protection
              </label>
              <p className="text-sm text-gray-600">
                Screen turns black when screenshot attempts are detected
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Step2Props {
  questions: Question[];
  currentQuestion: Question;
  onQuestionChange: (value: string) => void;
  onOptionChange: (index: number, value: string) => void;
  onCorrectAnswerChange: (index: number) => void;
  onAddQuestion: () => void;
  onRemoveQuestion: (id: string) => void;
}

const Step2Questions: FC<Step2Props> = ({
  questions,
  currentQuestion,
  onQuestionChange,
  onOptionChange,
  onCorrectAnswerChange,
  onAddQuestion,
  onRemoveQuestion,
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <FileText className="h-6 w-6 text-indigo-600" />
        Add Questions
      </h2>

      {/* Added Questions List */}
      {questions.length > 0 && (
        <div className="mb-8 space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            Added Questions ({questions.length})
          </h3>
          {questions.map((q, index) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
              <div className="flex-1">
                <p className="font-medium text-gray-900 mb-2">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-1">
                  {q.options.filter(opt => opt).map((opt, i) => (
                    <p key={i} className={`text-sm ${i === q.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                      {String.fromCharCode(65 + i)}. {opt} {i === q.correctAnswer && '✓'}
                    </p>
                  ))}
                </div>
              </div>
              <button
                onClick={() => onRemoveQuestion(q.id)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Question Input */}
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
          Question *
        </label>
        <textarea
          id="question"
          value={currentQuestion.question}
          onChange={(e) => onQuestionChange(e.target.value)}
          rows={3}
          className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
          placeholder="Enter your question here..."
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Answer Options *
        </label>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                type="radio"
                id={`correct-${index}`}
                checked={currentQuestion.correctAnswer === index}
                onChange={() => onCorrectAnswerChange(index)}
                className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
              />
              <input
                type="text"
                value={option}
                onChange={(e) => onOptionChange(index, e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all text-gray-900 placeholder:text-gray-400"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
              />
              <span className="text-sm text-gray-500 w-24">
                {currentQuestion.correctAnswer === index && (
                  <span className="text-green-600 font-medium">✓ Correct</span>
                )}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-sm text-gray-600">
          Select the radio button to mark the correct answer
        </p>
      </div>

      {/* Add Question Button */}
      <button
        onClick={onAddQuestion}
        className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-700 font-medium rounded-lg hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Add Question
      </button>
    </div>
  );
};

interface Step3Props {
  formData: QuizFormData;
}

const Step3Review: FC<Step3Props> = ({ formData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Eye className="h-6 w-6 text-indigo-600" />
        Review & Publish
      </h2>

      {/* Quiz Summary */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">{formData.title}</h3>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-medium text-gray-900">{formData.duration} minutes</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Questions</p>
            <p className="font-medium text-gray-900">{formData.questions.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-medium text-gray-900">{formatDate(formData.startDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">End Date</p>
            <p className="font-medium text-gray-900">{formatDate(formData.endDate)}</p>
          </div>
        </div>

        {formData.instructions && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Instructions</p>
            <p className="text-gray-900">{formData.instructions}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {formData.tabSwitchDetection && (
            <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Tab Detection
            </span>
          )}
          {formData.screenshotProtection && (
            <span className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Screenshot Block
            </span>
          )}
        </div>
      </div>

      {/* Questions Preview */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions Preview</h3>
        <div className="space-y-4">
          {formData.questions.map((q, index) => (
            <div key={q.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-900 mb-3">
                {index + 1}. {q.question}
              </p>
              <div className="space-y-2">
                {q.options.filter(opt => opt).map((opt, i) => (
                  <div
                    key={i}
                    className={`px-3 py-2 rounded ${i === q.correctAnswer
                      ? 'bg-green-100 border border-green-300'
                      : 'bg-white border border-gray-200'
                      }`}
                  >
                    <span className={i === q.correctAnswer ? 'text-green-700 font-medium' : 'text-gray-700'}>
                      {String.fromCharCode(65 + i)}. {opt}
                      {i === q.correctAnswer && ' ✓'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publishing Info */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-gray-900 mb-1">Before publishing:</p>
            <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
              <li>Review all questions and answers carefully</li>
              <li>Verify the duration and date settings</li>
              <li>Check anti-cheating settings are configured correctly</li>
              <li>You can save as draft to edit later</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuiz;
