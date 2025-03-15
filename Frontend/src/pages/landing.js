// pages/landing.js
import Navbar from '../components/Navbar';
import Link from 'next/link';
import SplitText from '../components/react-bits/SplitText';
import ScrollFloat from '@/components/react-bits/ScrollFloat';
import Particles from '../components/react-bits/Particles';
import Orb from '../components/react-bits/Orb';
import GradientText from '@/components/react-bits/GradientText';
import { useState, useEffect } from 'react';

const LandingPage = () => {
  const [visible, setVisible] = useState(false);
  
  // Set visible to true after component mounts to trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 600); // Delay the animation to allow the page to load
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen">
      {/* Background particles */}
      <div className="absolute inset-0 w-full h-full" style={{ zIndex: -20 }}>
        <Particles
          className="w-full h-full" 
          particleColors={['#ADD8E6', '#ADD8E6']}
          particleCount={2000}
          particleSpread={5}
          speed={0.05}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section with blur effect */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative">
          {/* Add orb behind the content with fade-in effect */}
          <div style={{ 
            position: 'absolute',
            right: '1%',
            top: '52%',
            transform: 'translate(0, -50%)',
            width: '520px',
            height: '520px',
            zIndex: 0,
            pointerEvents: 'auto',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
          }}>
            <Orb 
              forceHoverState={false}
              hue={50}
              hoverIntensity={0.6}
            />
          </div>
          
          <div className="flex flex-col relative">
            <div className="flex justify-between items-center">
              <div className="text-left max-w-2xl backdrop-blur-sm bg-white/30 p-8 rounded-lg z-10 relative">
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
                    delay={10}
                  />
                </div>
              </div>
            </div>
            
            {/* Position button with absolute positioning and fade-in animation */}
            <div 
              className="absolute right-40 top-40 z-10" 
              id="hero-buttons"
              style={{
                opacity: visible ? 1 : 0,
                transform: `translateY(${visible ? 0 : '20px'})`, 
                transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
              }}
            >
              <Link href="/apphome">
                <div className="cursor-pointer">
                  <GradientText 
                    className="px-2 py-5 text-2xl font-semibold bg-white/70 backdrop-blur-sm"
                    colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                    animationSpeed={10}
                    showBorder={false}
                  >
                    Get Started
                  </GradientText>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator arrow with blur effect */}
        <div className="relative flex flex-col items-center mb-12">
          <div className="flex flex-col items-center" style={{ zIndex: 2 }}>
            <span className="text-lg font-medium text-gray-600 mb-2 px-4 py-2 rounded-lg backdrop-blur-sm bg-white/30">
              Scroll to learn more
            </span>
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
        </div>
        
        {/* Added increased white margin space before How It Works section */}
        <div className="py-24"></div>

        {/* How It Works Section - Inverted colors with fade effect and white particles */}
        <div className="relative py-48">
          {/* Gradient fade effect at the top */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-transparent to-black z-0"></div>
          
          {/* Dark background */}
          <div className="absolute inset-0 bg-black z-0"></div>
          
          {/* White particles overlay */}
          <div className="absolute inset-0 z-1 pointer-events-none">
            <Particles
              className="w-full h-full"
              particleColors={['#FFFFFF', '#F8F8F8']} // White particles
              particleCount={300}
              particleSpread={5}
              speed={0.13}
              particleBaseSize={80}
              moveParticlesOnHover={false}
              alphaParticles={true}
              disableRotation={true}
            />
          </div>
          
          {/* Content - move it up more */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-32">
            <h2 className="text-5xl font-bold text-white mb-20 backdrop-blur-sm bg-black/30 p-4 rounded-lg inline-block">
              <ScrollFloat>How It Works</ScrollFloat>
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="backdrop-blur-sm bg-black/40 p-6 rounded-lg border border-gray-600">
                  <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-8">
                    <span className="text-2xl font-bold text-white">{step}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    <SplitText 
                      text={step === 1 ? "Click Get Started" : step === 2 ? "Set Up Your Space" : "Start Training"}
                      textAlign="left"
                    />
                  </h3>
                  <div className="text-xl text-gray-200">
                    <SplitText
                      text={
                        step === 1 
                          ? "Access our web application through your browser and click the Get Started button"
                          : step === 2 
                          ? "Clear space around you and ensure your whole body is visible in your webcam"
                          : "Begin your AR-powered workouts with real-time form tracking and guidance"
                      }
                      textAlign="left"
                      delay={10}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Make sure the gradient has a clearly defined height and is visible over the black background */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-0"></div>
        </div>

        {/* Features Section - moved after How It Works */}
        <div id="features" className="py-48">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24 backdrop-blur-sm bg-white/30 p-4 rounded-lg inline-block">
              <ScrollFloat>Revolutionary Features</ScrollFloat>
            </h2>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="backdrop-blur-sm bg-white/30 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  <SplitText 
                    text="Real-time Form Correction" 
                    textAlign="left" 
                  />
                </h3>
                <div className="text-xl text-gray-600">
                  <SplitText 
                    text="Our AI technology uses your webcam to analyze movements and provide instant feedback, ensuring safe and effective workouts."
                    textAlign="left"
                    delay={10}
                  />
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/30 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  <SplitText text="Personalized Workouts" textAlign="left" />
                </h3>
                <div className="text-xl text-gray-600">
                  <SplitText 
                    text="Web-based training programs that adapt to your progress and fitness goals in real-time."
                    textAlign="left"
                    delay={10}
                  />
                </div>
              </div>
              <div className="backdrop-blur-sm bg-white/30 p-6 rounded-lg">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  <SplitText text="Accessible Anywhere" textAlign="left" />
                </h3>
                <div className="text-xl text-gray-600">
                  <SplitText 
                    text="Train from any computer with a webcam. Mobile app coming soon for even more flexibility."
                    textAlign="left"
                    delay={10}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section - add a little margin to better position after gradient */}
        <div className="py-32 mt-4 bg-transparent relative z-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-black mb-24 text-center backdrop-blur-sm bg-white/30 p-4 rounded-lg">
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
                <div key={index} className="backdrop-blur-sm bg-white/30 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold mb-4 text-black">
                    <SplitText text={faq.question} textAlign="left" delay={10}/>
                  </h3>
                  <div className="text-xl text-gray-600">
                    <SplitText text={faq.answer} textAlign="left" delay={10}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient transition to dark gray for footer */}
        <div className="h-10 bg-gradient-to-b from-transparent to-gray-800"></div>

        {/* Footer - Dark gray background with white text */}
        <footer className="py-16 border-t border-gray-700 bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8">AR Fitness</h3>
                <p className="text-xl text-gray-300 mb-8 max-w-md">
                  Transform your fitness journey with cutting-edge AR technology
                </p>
              </div>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Links</h4>
                  <ul className="space-y-4">
                    <li><Link href="#features" className="text-lg text-gray-300 hover:text-white transition-colors duration-200">Features</Link></li>
                    <li><Link href="#faq" className="text-lg text-gray-300 hover:text-white transition-colors duration-200">FAQ</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
                  <ul className="space-y-4">
                    <li><Link href="/privacy" className="text-lg text-gray-300 hover:text-white transition-colors duration-200">Privacy</Link></li>
                    <li><Link href="/terms" className="text-lg text-gray-300 hover:text-white transition-colors duration-200">Terms</Link></li>
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