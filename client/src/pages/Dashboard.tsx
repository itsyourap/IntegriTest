import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Users,
  Clock,
  Calendar,
  CheckCircle,
  BarChart3,
  LogOut,
  Settings,
  FileText,
} from 'lucide-react';

// Dummy data
const DUMMY_QUIZZES = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    urlId: 'js-intro-2024',
    duration: 45,
    questions: 20,
    startDate: '2024-10-10T09:00:00',
    endDate: '2024-10-15T23:59:59',
    submissions: 28,
    averageScore: 78.5,
    status: 'active' as const,
    antiCheating: {
      tabSwitch: true,
      screenshot: true,
    },
    createdAt: '2024-10-05T10:30:00',
  },
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    urlId: 'react-fund-q1',
    duration: 60,
    questions: 25,
    startDate: '2024-10-12T10:00:00',
    endDate: '2024-10-20T18:00:00',
    submissions: 15,
    averageScore: 82.3,
    status: 'active' as const,
    antiCheating: {
      tabSwitch: true,
      screenshot: true,
    },
    createdAt: '2024-10-08T14:20:00',
  },
  {
    id: '3',
    title: 'Database Design Final Exam',
    urlId: 'db-design-final',
    duration: 90,
    questions: 35,
    startDate: '2024-09-20T09:00:00',
    endDate: '2024-09-25T17:00:00',
    submissions: 42,
    averageScore: 71.8,
    status: 'closed' as const,
    antiCheating: {
      tabSwitch: true,
      screenshot: true,
    },
    createdAt: '2024-09-15T11:00:00',
  },
  {
    id: '4',
    title: 'Python Programming Midterm',
    urlId: 'python-midterm-2024',
    duration: 75,
    questions: 30,
    startDate: '2024-11-01T10:00:00',
    endDate: '2024-11-05T23:59:59',
    submissions: 0,
    averageScore: 0,
    status: 'draft' as const,
    antiCheating: {
      tabSwitch: false,
      screenshot: false,
    },
    createdAt: '2024-10-14T16:45:00',
  },
  {
    id: '5',
    title: 'Web Development Basics',
    urlId: 'webdev-basics-q2',
    duration: 30,
    questions: 15,
    startDate: '2024-10-08T08:00:00',
    endDate: '2024-10-12T20:00:00',
    submissions: 35,
    averageScore: 85.2,
    status: 'closed' as const,
    antiCheating: {
      tabSwitch: true,
      screenshot: false,
    },
    createdAt: '2024-10-01T09:15:00',
  },
];

const TEACHER_DATA = {
  name: 'Dr. Sarah Johnson',
  email: 'sarah.johnson@university.edu',
  totalQuizzes: DUMMY_QUIZZES.length,
  totalStudents: 120,
  activeQuizzes: DUMMY_QUIZZES.filter(q => q.status === 'active').length,
  totalSubmissions: DUMMY_QUIZZES.reduce((acc, q) => acc + q.submissions, 0),
};

const Dashboard: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'closed' | 'draft'>('all');
  const [showDropdown, setShowDropdown] = useState<string | null>(null);

  const filteredQuizzes = DUMMY_QUIZZES.filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || quiz.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleCopyLink = (urlId: string) => {
    const link = `${window.location.origin}/quiz/${urlId}`;
    navigator.clipboard.writeText(link);
    alert('Quiz link copied to clipboard!');
    setShowDropdown(null);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      console.log('Deleting quiz:', id);
      // TODO: Implement actual delete logic
      alert('Quiz deleted successfully!');
      setShowDropdown(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">IntegriTest</span>
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{TEACHER_DATA.name}</p>
                  <p className="text-xs text-gray-600">{TEACHER_DATA.email}</p>
                </div>
                <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quiz Dashboard</h1>
          <p className="text-gray-600">Manage your quizzes and monitor student performance</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FileText className="h-6 w-6" />}
            label="Total Quizzes"
            value={TEACHER_DATA.totalQuizzes}
            color="blue"
          />
          <StatCard
            icon={<CheckCircle className="h-6 w-6" />}
            label="Active Quizzes"
            value={TEACHER_DATA.activeQuizzes}
            color="green"
          />
          <StatCard
            icon={<Users className="h-6 w-6" />}
            label="Total Students"
            value={TEACHER_DATA.totalStudents}
            color="purple"
          />
          <StatCard
            icon={<BarChart3 className="h-6 w-6" />}
            label="Total Submissions"
            value={TEACHER_DATA.totalSubmissions}
            color="orange"
          />
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                placeholder="Search quizzes..."
              />
            </div>

            {/* Filter & Create Button */}
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>

              <Link
                to="/quiz/create"
                className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
              >
                <Plus className="h-5 w-5" />
                Create Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Quizzes List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {filteredQuizzes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No quizzes found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Get started by creating your first quiz'}
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <Link
                  to="/quiz/create"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Create Your First Quiz
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredQuizzes.map((quiz) => (
                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                  showDropdown={showDropdown === quiz.id}
                  onToggleDropdown={() => setShowDropdown(showDropdown === quiz.id ? null : quiz.id)}
                  onCopyLink={handleCopyLink}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const StatCard: FC<StatCardProps> = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface Quiz {
  id: string;
  title: string;
  urlId: string;
  duration: number;
  questions: number;
  startDate: string;
  endDate: string;
  submissions: number;
  averageScore: number;
  status: 'active' | 'closed' | 'draft';
  antiCheating: {
    tabSwitch: boolean;
    screenshot: boolean;
  };
  createdAt: string;
}

interface QuizCardProps {
  quiz: Quiz;
  showDropdown: boolean;
  onToggleDropdown: () => void;
  onCopyLink: (urlId: string) => void;
  onDelete: (id: string, title: string) => void;
}

const QuizCard: FC<QuizCardProps> = ({
  quiz,
  showDropdown,
  onToggleDropdown,
  onCopyLink,
  onDelete,
}) => {
  const statusColors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    closed: 'bg-gray-100 text-gray-800 border-gray-200',
    draft: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Title and Status */}
          <div className="flex items-center gap-3 mb-3">
            <Link
              to={`/quiz/${quiz.id}/edit`}
              className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors"
            >
              {quiz.title}
            </Link>
            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[quiz.status]}`}>
              {quiz.status.charAt(0).toUpperCase() + quiz.status.slice(1)}
            </span>
          </div>

          {/* Quiz Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{quiz.duration} mins</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FileText className="h-4 w-4" />
              <span>{quiz.questions} questions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>{quiz.submissions} submissions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BarChart3 className="h-4 w-4" />
              <span>
                {quiz.submissions > 0 ? `${quiz.averageScore.toFixed(1)}% avg` : 'No data'}
              </span>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Start: <span className="font-medium">{formatDate(quiz.startDate)}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                End: <span className="font-medium">{formatDate(quiz.endDate)}</span>
              </span>
            </div>
          </div>

          {/* Anti-Cheating Features */}
          <div className="flex items-center gap-3">
            {quiz.antiCheating.tabSwitch && (
              <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded">
                <Shield className="h-3 w-3" />
                <span>Tab Detection</span>
              </div>
            )}
            {quiz.antiCheating.screenshot && (
              <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded">
                <Shield className="h-3 w-3" />
                <span>Screenshot Block</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions Menu */}
        <div className="relative ml-4">
          <button
            onClick={onToggleDropdown}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {showDropdown && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={onToggleDropdown}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                <Link
                  to={`/quiz/${quiz.id}/edit`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  Edit Quiz
                </Link>
                <Link
                  to={`/quiz/${quiz.id}/results`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <BarChart3 className="h-4 w-4" />
                  View Results
                </Link>
                <button
                  onClick={() => onCopyLink(quiz.urlId)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
                >
                  <Copy className="h-4 w-4" />
                  Copy Link
                </button>
                <a
                  href={`/quiz/${quiz.urlId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Preview Quiz
                </a>
                <div className="border-t border-gray-200 my-1" />
                <button
                  onClick={() => onDelete(quiz.id, quiz.title)}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Quiz
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
