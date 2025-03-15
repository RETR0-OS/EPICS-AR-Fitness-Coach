// pages/landing.js
import Navbar from '../components/Navbar';
import Link from 'next/link';
import SplitText from '../components/react-bits/SplitText';
import ScrollFloat from '@/components/react-bits/ScrollFloat';
import ScrollReveal from '@/components/react-bits/ScrollReveal';

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <main>
        /* Hero Section */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <div className="text-left max-w-3xl">
              <h1 className="text-7xl font-bold text-black mb-8 leading-tight">
                <SplitText 
            text="Transform Your Fitness Journey" 
            textAlign="left"
                />
              </h1>
              <div className="text-2xl text-gray-600 mb-12">
                <SplitText 
            text="Experience personalized workouts with real-time form correction using your webcam. Train smarter, safer, and more effectively."
            textAlign="left"
                />
              </div>
              <div className="flex gap-4" id="hero-buttons">
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

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center mb-12">
            <span className="text-lg font-medium text-gray-600 mb-2">Scroll to learn more</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 animate-bounce text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>

          {/* Features Section */}
          <div id="features" className="py-48">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-5xl font-bold text-black mb-24">
                <ScrollFloat>Revolutionary Features</ScrollFloat>
              </h2>
              <div className="grid md:grid-cols-3 gap-16">
                <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              <SplitText text="Real-time Form Correction" textAlign="left" />
            </h3>
            <div className="text-xl text-gray-600">
              <SplitText 
                text="Our AI technology uses your webcam to analyze movements and provide instant feedback, ensuring safe and effective workouts."
                textAlign="left"
              />
            </div>
                </div>
                <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              <SplitText text="Personalized Workouts" textAlign="left" />
            </h3>
            <div className="text-xl text-gray-600">
              <SplitText 
                text="Web-based training programs that adapt to your progress and fitness goals in real-time."
                textAlign="left"
              />
            </div>
                </div>
                <div>
            <h3 className="text-2xl font-semibold text-black mb-4">
              <SplitText text="Accessible Anywhere" textAlign="left" />
            </h3>
            <div className="text-xl text-gray-600">
              <SplitText 
                text="Train from any computer with a webcam. Mobile app coming soon for even more flexibility."
                textAlign="left"
              />
            </div>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
        <div className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24">
              <ScrollFloat>How It Works</ScrollFloat>
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              {[1, 2, 3].map((step, index) => (
                <div key={step}>
                  <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mb-8">
                    <span className="text-2xl font-bold text-black">{step}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-black mb-4">
                    <SplitText 
                      text={step === 1 ? "Click Get Started" : step === 2 ? "Set Up Your Space" : "Start Training"}
                      textAlign="left"
                    />
                  </h3>
                  <div className="text-xl text-gray-600">
                    <SplitText
                      text={
                        step === 1 
                          ? "Access our web application through your browser and click the Get Started button"
                          : step === 2 
                          ? "Clear space around you and ensure your whole body is visible in your webcam"
                          : "Begin your AR-powered workouts with real-time form tracking and guidance"
                      }
                      textAlign="left"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24 text-center">
              <ScrollFloat>FAQ</ScrollFloat>
            </h2>
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
                <div key={index}>
                  <h3 className="text-2xl font-semibold mb-4 text-black">
                    <SplitText text={faq.question} textAlign="left" />
                  </h3>
                  <div className="text-xl text-gray-600">
                    <SplitText text={faq.answer} textAlign="left" />
                  </div>
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