// pages/landing.js
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { ArrowRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="text-left max-w-3xl">
            <h1 className="text-7xl font-bold text-black mb-8 leading-tight animate-slide-up">
              Transform Your Fitness Journey
            </h1>
            <p className="text-2xl text-gray-600 mb-12 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Experience personalized workouts with real-time form correction using your webcam. Train smarter, safer, and more effectively.
            </p>
            <div className="flex gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/apphome">
                <button className="btn-primary">
                  Get Started
                </button>
              </Link>
              <Link href="#features">
                <button className="btn-secondary">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24">Revolutionary Features</h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
                <h3 className="text-2xl font-semibold text-black mb-4">Real-time Form Correction</h3>
                <p className="text-xl text-gray-600">
                  Our AI technology uses your webcam to analyze movements and provide instant feedback, ensuring safe and effective workouts.
                </p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
                <h3 className="text-2xl font-semibold text-black mb-4">Personalized Workouts</h3>
                <p className="text-xl text-gray-600">
                  Web-based training programs that adapt to your progress and fitness goals in real-time.
                </p>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <h3 className="text-2xl font-semibold text-black mb-4">Accessible Anywhere</h3>
                <p className="text-xl text-gray-600">
                  Train from any computer with a webcam. Mobile app coming soon for even more flexibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-16">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="animate-slide-up" style={{ animationDelay: `${0.2 * index}s` }}>
                  <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-8">
                    <span className="text-2xl font-bold text-black">{step}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    {step === 1 ? "Click Get Started" : step === 2 ? "Set Up Your Space" : "Start Training"}
                  </h3>
                  <p className="text-xl text-gray-600">
                    {step === 1 
                      ? "Access our web application through your browser and click the Get Started button"
                      : step === 2 
                      ? "Clear space around you and ensure your whole body is visible in your webcam"
                      : "Begin your AR-powered workouts with real-time form tracking and guidance"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24 text-center">FAQ</h2>
            <div className="space-y-12">
              {[
                {
                  question: "What equipment do I need?",
                  answer: "You just need a computer with a webcam and enough space to perform exercises. Make sure you have good lighting and can fit your whole body in the camera frame."
                },
                {
                  question: "How does proper form improve results?",
                  answer: "Research shows that proper form not only prevents injuries but also increases muscle activation by up to 40%. Better form means better muscle engagement, leading to more effective workouts and faster progress."
                },
                {
                  question: "Is a mobile app available?",
                  answer: "Currently, our service is available as a web application accessed through your browser. We're actively developing a mobile app that will be released in the future."
                },
                {
                  question: "How does the form tracking work?",
                  answer: "Our AI technology uses your webcam to analyze your movements in real-time, comparing them to correct form patterns. This helps prevent injuries and ensures you're getting the most out of each exercise."
                }
              ].map((faq, index) => (
                <div key={index} className="animate-slide-up" style={{ animationDelay: `${0.2 * index}s` }}>
                  <h3 className="text-2xl font-semibold mb-4 text-black">{faq.question}</h3>
                  <p className="text-xl text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-16 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-black mb-8">AR Fitness</h3>
                <p className="text-xl text-gray-600 mb-8 max-w-md">
                  Transform your fitness journey with cutting-edge AR technology
                </p>
              </div>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h4 className="text-lg font-semibold text-black mb-6">Links</h4>
                  <ul className="space-y-4">
                    <li><Link href="/" className="text-lg text-gray-600 hover:text-black transition-colors duration-200">Home</Link></li>
                    <li><Link href="#features" className="text-lg text-gray-600 hover:text-black transition-colors duration-200">Features</Link></li>
                    <li><Link href="#faq" className="text-lg text-gray-600 hover:text-black transition-colors duration-200">FAQ</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-black mb-6">Legal</h4>
                  <ul className="space-y-4">
                    <li><Link href="/privacy" className="text-lg text-gray-600 hover:text-black transition-colors duration-200">Privacy</Link></li>
                    <li><Link href="/terms" className="text-lg text-gray-600 hover:text-black transition-colors duration-200">Terms</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default LandingPage;