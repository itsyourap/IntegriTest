import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Clock, Eye, CheckCircle, Users, Lock } from 'lucide-react';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">IntegriTest</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition-colors">
                About
              </a>
              <Link to="/login" className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition-colors">
                Log In
              </Link>
              <Link to="/signup" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Your Secure and Focused
              <span className="text-indigo-600"> Online Quiz Platform</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              IntegriTest is designed for educators who need a reliable, secure, and integrity-focused
              platform to conduct online quizzes. Minimize cheating and distractions with our focused testing environment.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
                Get Started Free
              </Link>
              <button className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors">
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="mt-16 relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl mx-auto border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="h-32 w-32 text-indigo-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Banner */}
      <section className="bg-indigo-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8">🛡️ Security & Integrity Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tab Switch Detection</h3>
              <p className="text-indigo-100">
                Auto-submits quiz if students switch tabs or minimize the browser
              </p>
            </div>
            <div className="text-center">
              <Lock className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Screenshot Protection</h3>
              <p className="text-indigo-100">
                Screen turns black automatically when screenshot attempts are detected
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Content Protection</h3>
              <p className="text-indigo-100">
                Right-click, text selection, and copy-paste disabled during quizzes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Powerful Features for Everyone
          </h2>

          {/* For Teachers */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Users className="h-8 w-8 text-indigo-600 mr-3" />
              👩‍🏫 For Teachers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Shield className="h-6 w-6" />}
                title="Secure Authentication"
                description="Sign up and log in to a personal dashboard with JWT-based authentication"
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6" />}
                title="Quiz Dashboard"
                description="Create, view, edit, and delete quizzes with an intuitive interface"
              />
              <FeatureCard
                icon={<Clock className="h-6 w-6" />}
                title="Dynamic Quiz Creator"
                description="Add titles, instructions, time limits, and multiple-choice questions"
              />
              <FeatureCard
                icon={<Clock className="h-6 w-6" />}
                title="Scheduled Quizzes"
                description="Set specific start and end times for access control"
              />
              <FeatureCard
                icon={<Lock className="h-6 w-6" />}
                title="Anti-Cheating Controls"
                description="Enable tab-switch prevention and screenshot blocking"
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6" />}
                title="Result Analytics"
                description="View submissions, scores, and detailed performance breakdowns"
              />
            </div>
          </div>

          {/* For Students */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <Users className="h-8 w-8 text-indigo-600 mr-3" />
              🧑‍🎓 For Students
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard
                icon={<Users className="h-6 w-6" />}
                title="No Account Needed"
                description="Join instantly via a quiz link - no registration required"
              />
              <FeatureCard
                icon={<Eye className="h-6 w-6" />}
                title="Focused UI"
                description="Minimal and distraction-free interface, one question at a time"
              />
              <FeatureCard
                icon={<Clock className="h-6 w-6" />}
                title="Live Countdown Timer"
                description="Real-time timer with auto-submit upon timeout"
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6" />}
                title="Instant Feedback"
                description="View score and correct answers right after submission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            💻 Built with Modern Technology
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <TechCard title="Frontend" tech="React + TypeScript + Vite" />
            <TechCard title="Backend" tech="Node.js + Express.js" />
            <TechCard title="Database" tech="PostgreSQL / MySQL" />
            <TechCard title="Authentication" tech="JWT (JSON Web Tokens)" />
            <TechCard title="Styling" tech="Tailwind CSS" />
            <TechCard title="Package Manager" tech="pnpm" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Create Secure Quizzes?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join educators who trust IntegriTest for academic integrity
          </p>
          <Link to="/signup" className="inline-block px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl">
            Start for Free Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-indigo-400" />
                <span className="ml-2 text-xl font-bold">IntegriTest</span>
              </div>
              <p className="text-gray-400">
                Your Secure and Focused Online Quiz Platform
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://github.com/Student-Chapter-CSE" className="hover:text-white transition-colors">
                    💻 Students' Chapter CSE AOT
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Student-Chapter-CSE/integritest" className="hover:text-white transition-colors">
                    🌐 Project Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2025 IntegriTest. Open-source and welcoming contributions! 🎉</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
      <div className="text-indigo-600 mb-3">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

interface TechCardProps {
  title: string;
  tech: string;
}

const TechCard: FC<TechCardProps> = ({ title, tech }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-center">
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
      <p className="text-indigo-600 font-medium">{tech}</p>
    </div>
  );
};

export default Home;
