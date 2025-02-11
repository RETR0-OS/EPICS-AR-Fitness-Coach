// pages/index.js
import Navbar from '../components/Navbar';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main className="bg-white dark:bg-gray-900 min-h-screen">
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-5xl md:text-6xl">
              AR Fitness Trainer
            </h1>
            <p className="mt-3 max-w-4xl mx-auto text-xl text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-2xl">
              Transform your fitness routine with augmented reality technology.
            </p>
            <div className="mt-8">
              <Link href="/apphome">
                <button className="inline-flex items-center justify-center px-60 py-6 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;