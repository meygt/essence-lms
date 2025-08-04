'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GraduationCap, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = '' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const redirectToLogin = () => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    window.location.href = `${adminUrl}/login`;
  };

  const redirectToSignup = () => {
    const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:5173';
    window.location.href = `${adminUrl}/signup`;
  };

  const isActive = (page: string) => currentPage === page;

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Essence Academy</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Qur&apos;anic Education</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`transition-colors font-medium ${
                isActive('home') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/courses" 
              className={`transition-colors font-medium ${
                isActive('courses') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Courses
            </Link>
            <Link 
              href="/#features" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
            >
              Features
            </Link>
            <Link 
              href="/#testimonials" 
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
            >
              Reviews
            </Link>
            <Link 
              href="/contact" 
              className={`transition-colors font-medium ${
                isActive('contact') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
              }`}
            >
              Contact
            </Link>
          </nav>
          
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle />
            <button
              onClick={redirectToLogin}
              className="px-4 py-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
            >
              Login
            </button>
            <button
              onClick={redirectToSignup}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
            >
              Get Started
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className={`font-medium ${
                  isActive('home') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/courses" 
                className={`font-medium ${
                  isActive('courses') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                Courses
              </Link>
              <Link 
                href="/#features" 
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Features
              </Link>
              <Link 
                href="/#testimonials" 
                className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium"
              >
                Reviews
              </Link>
              <Link 
                href="/contact" 
                className={`font-medium ${
                  isActive('contact') ? 'text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400'
                }`}
              >
                Contact
              </Link>
              <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <ThemeToggle />
                <button 
                  onClick={redirectToLogin}
                  className="text-green-600 dark:text-green-400 font-medium text-left"
                >
                  Login
                </button>
                <button
                  onClick={redirectToSignup}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg text-center font-medium"
                >
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}