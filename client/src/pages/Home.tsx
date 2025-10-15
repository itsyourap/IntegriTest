import { type FC } from 'react';
import { Shield, Clock, Eye, CheckCircle, Users, Lock } from 'lucide-react';

const Home: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <Shield className="h-10 w-10 text-indigo-600" />
              <span className="text-3xl font-bold text-gray-900">IntegriTest</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Features
              </a>
              <a href="#technology" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                Technology
              </a>
              <button className="px-5 py-2.5 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors">
                Log In
              </button>
              <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Secure and Focused
              <span className="block text-indigo-600 mt-2">Online Quiz Platform</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
              IntegriTest is designed for educators who need a reliable, secure, and integrity-focused
              platform to conduct online quizzes. Minimize cheating and distractions with our focused testing environment.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
                Get Started Free
              </button>
              <button className="px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl border-2 border-indigo-600 hover:bg-indigo-50 transition-all hover:scale-105">
                View Demo
              </button>
            </div>
          </div>

          {/* Hero Image/Illustration Placeholder */}
          <div className="mt-20">
            <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-8 max-w-5xl mx-auto border border-gray-200">
              <div className="aspect-video bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 rounded-2xl flex items-center justify-center">
                <Shield className="h-24 w-24 sm:h-32 sm:w-32 text-indigo-600 opacity-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features Banner */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">🛡️ Security & Integrity Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105">
              <Eye className="h-14 w-14 mx-auto mb-5" />
              <h3 className="text-xl font-bold mb-3">Tab Switch Detection</h3>
              <p className="text-indigo-100 leading-relaxed">
                Auto-submits quiz if students switch tabs or minimize the browser
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105">
              <Lock className="h-14 w-14 mx-auto mb-5" />
              <h3 className="text-xl font-bold mb-3">Screenshot Protection</h3>
              <p className="text-indigo-100 leading-relaxed">
                Screen turns black automatically when screenshot attempts are detected
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all hover:scale-105 sm:col-span-2 lg:col-span-1">
              <Shield className="h-14 w-14 mx-auto mb-5" />
              <h3 className="text-xl font-bold mb-3">Content Protection</h3>
              <p className="text-indigo-100 leading-relaxed">
                Right-click, text selection, and copy-paste disabled during quizzes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create, manage, and conduct secure online quizzes
            </p>
          </div>

          {/* For Teachers */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <Users className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                👩‍🏫 For Teachers
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon={<Shield className="h-7 w-7" />}
                title="Secure Authentication"
                description="Sign up and log in to a personal dashboard with JWT-based authentication"
              />
              <FeatureCard
                icon={<CheckCircle className="h-7 w-7" />}
                title="Quiz Dashboard"
                description="Create, view, edit, and delete quizzes with an intuitive interface"
              />
              <FeatureCard
                icon={<Clock className="h-7 w-7" />}
                title="Dynamic Quiz Creator"
                description="Add titles, instructions, time limits, and multiple-choice questions"
              />
              <FeatureCard
                icon={<Clock className="h-7 w-7" />}
                title="Scheduled Quizzes"
                description="Set specific start and end times for access control"
              />
              <FeatureCard
                icon={<Lock className="h-7 w-7" />}
                title="Anti-Cheating Controls"
                description="Enable tab-switch prevention and screenshot blocking"
              />
              <FeatureCard
                icon={<CheckCircle className="h-7 w-7" />}
                title="Result Analytics"
                description="View submissions, scores, and detailed performance breakdowns"
              />
            </div>
          </div>

          {/* For Students */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-blue-100 p-3 rounded-xl">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                🧑‍🎓 For Students
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <FeatureCard
                icon={<Users className="h-7 w-7" />}
                title="No Account Needed"
                description="Join instantly via a quiz link - no registration required"
              />
              <FeatureCard
                icon={<Eye className="h-7 w-7" />}
                title="Focused UI"
                description="Minimal and distraction-free interface, one question at a time"
              />
              <FeatureCard
                icon={<Clock className="h-7 w-7" />}
                title="Live Countdown Timer"
                description="Real-time timer with auto-submit upon timeout"
              />
              <FeatureCard
                icon={<CheckCircle className="h-7 w-7" />}
                title="Instant Feedback"
                description="View score and correct answers right after submission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology" className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              💻 Built with Modern Technology
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powered by industry-leading tools and frameworks
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
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
      <section className="py-20 lg:py-28 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Ready to Create Secure Quizzes?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
            Join educators who trust IntegriTest for academic integrity
          </p>
          <button className="px-10 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105">
            Start for Free Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-10 w-10 text-indigo-400" />
                <span className="text-2xl font-bold">IntegriTest</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-base">
                Your Secure and Focused Online Quiz Platform
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-5">Resources</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors hover:underline">API Reference</a></li>
                <li><a href="https://github.com/Student-Chapter-CSE/integritest" className="hover:text-white transition-colors hover:underline">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-5">Connect</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="https://github.com/Student-Chapter-CSE" className="hover:text-white transition-colors hover:underline flex items-center gap-2">
                    💻 Students' Chapter CSE AOT
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Student-Chapter-CSE/integritest" className="hover:text-white transition-colors hover:underline flex items-center gap-2">
                    🌐 Project Repository
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p className="text-base">&copy; 2025 IntegriTest. Open-source and welcoming contributions! 🎉</p>
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
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-indigo-200 hover:scale-105 group">
      <div className="text-indigo-600 mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xl font-bold text-gray-900 mb-3">{title}</h4>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

interface TechCardProps {
  title: string;
  tech: string;
}

const TechCard: FC<TechCardProps> = ({ title, tech }) => {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-200 hover:border-indigo-200 text-center group hover:scale-105">
      <h4 className="font-bold text-gray-900 mb-3 text-lg">{title}</h4>
      <p className="text-indigo-600 font-semibold text-base">{tech}</p>
    </div>
  );
};

export default Home;
