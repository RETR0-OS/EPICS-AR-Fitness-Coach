// src/pages/components/Navbar.js
import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed w-full z-10 top-0 bg-white/90 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-black">
              AR Fitness
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-black transition-colors duration-200">
                Home
              </Link>
              <Link href="/signup" className="text-gray-600 hover:text-black transition-colors duration-200">
                Sign Up
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-black transition-colors duration-200">
                Profile
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-black transition-colors duration-200">
                Login
              </Link>
              <Link href="/apphome">
                <button className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-200">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;