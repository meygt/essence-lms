'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowRight, 
  Filter, 
  Search
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const courses = [
  {
    id: 'quran-memorization',
    title: "Qur'an Memorization (Hifz)",
    description: 'Complete memorization program with proper Tajweed and understanding',
    duration: '2-4 years',
    students: 150,
    rating: 4.9,
    level: 'All Levels',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: 'Contact for pricing',
    features: ['One-on-one sessions', 'Tajweed correction', 'Progress tracking', 'Certificate upon completion']
  },
  {
    id: 'arabic-language',
    title: 'Arabic Language Mastery',
    description: 'Comprehensive Arabic language course from beginner to advanced',
    duration: '12 months',
    students: 200,
    rating: 4.8,
    level: 'Beginner to Advanced',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: '$299/month',
    features: ['Interactive lessons', 'Speaking practice', 'Grammar mastery', 'Cultural context']
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies Foundation',
    description: 'Essential Islamic knowledge covering Aqeedah, Fiqh, and Seerah',
    duration: '8 months',
    students: 180,
    rating: 4.9,
    level: 'Beginner',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: '$199/month',
    features: ['Structured curriculum', 'Live Q&A sessions', 'Study materials', 'Community discussions']
  },
  {
    id: 'tajweed-mastery',
    title: 'Tajweed Mastery',
    description: 'Perfect your Qur&apos;anic recitation with proper pronunciation and rules',
    duration: '6 months',
    students: 120,
    rating: 4.8,
    level: 'Intermediate',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: '$149/month',
    features: ['Audio practice', 'Pronunciation correction', 'Rule explanations', 'Recitation assessment']
  },
  {
    id: 'hadith-studies',
    title: 'Hadith Studies',
    description: 'Study of authentic Hadith collections and their applications',
    duration: '10 months',
    students: 95,
    rating: 4.7,
    level: 'Intermediate',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: '$249/month',
    features: ['Authentic sources', 'Chain analysis', 'Practical applications', 'Research methods']
  },
  {
    id: 'islamic-finance',
    title: 'Islamic Finance & Economics',
    description: 'Understanding Sharia-compliant financial principles and practices',
    duration: '6 months',
    students: 75,
    rating: 4.6,
    level: 'Advanced',
    image: '/api/placeholder/400/250',
    instructor: 'Mustafa Yigit',
    price: '$349/month',
    features: ['Modern applications', 'Case studies', 'Practical examples', 'Industry insights']
  }
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-green-600 dark:text-green-400" />
        </div>
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-500 fill-current" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{course.rating}</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-sm font-medium rounded-full">
            {course.level}
          </span>
          <span className="text-gray-500 dark:text-gray-400 text-sm">{course.price}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
          {course.description}
        </p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students} students</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          <strong>Instructor:</strong> {course.instructor}
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">What you&apos;ll learn:</h4>
          <ul className="space-y-1">
            {course.features.slice(0, 2).map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={`/courses/${course.id}`}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          Learn More
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header currentPage="courses" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Islamic Courses
            </h1>
            <p className="text-xl text-green-100 max-w-auto mx-auto">
              Discover comprehensive Islamic education programs designed to deepen your knowledge and strengthen your faith
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Filter className="w-5 h-5" />
              Filter
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <span>Showing {courses.length} courses</span>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16 mt-16">
        <div className="max-w-auto mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Begin Your Islamic Learning Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of students worldwide in authentic Islamic education
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-green-50 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/signup"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}