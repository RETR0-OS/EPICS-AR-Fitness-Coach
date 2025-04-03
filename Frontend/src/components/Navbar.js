// src/pages/components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {/* Toggle button - position changes when menu is open */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className={`fixed top-4 z-30 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all duration-300 focus:outline-none ${
          isOpen ? 'left-[calc(16rem+0.5rem)]' : 'left-4'
        }`}
        aria-label="Toggle menu"
      >
        {isOpen ? (
          // X icon when menu is open
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Hamburger icon when menu is closed
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Left side panel - slides in and out */}
      <div 
        className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl w-64 shadow-xl z-20 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo at the top */}
          <div className="flex items-center mb-10 pt-2">
            <Link href="/" className="text-2xl font-bold text-black">
              AR Fitness
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col space-y-6">
            <Link href="/">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                Home
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                Sign Up
              </button>
            </Link>
            <Link href="/profile">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                Profile
              </button>
            </Link>
            <Link href="/login">
              <button className="w-full text-left px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200">
                Login
              </button>
            </Link>
            
            {/* Get started button at the bottom */}
            <div className="mt-auto pt-10">
              <Link href="/signup">
                <button className="w-full px-5 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modified overlay that dims the page without affecting contrast */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/10 z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;