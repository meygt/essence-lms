'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Star, CheckCircle, Play, ArrowLeft, Volume2, Mic } from 'lucide-react';

const courseModules = [
  {
    title: 'Tajweed Fundamentals',
    duration: '1 month',
    lessons: 8,
    topics: ['Arabic pronunciation basics', 'Makharij (articulation points)', 'Sifaat (characteristics)', 'Basic rules']
  },
  {
    title: 'Advanced Rules',
    duration: '2 months',
    lessons: 16,
    topics: ['Noon and Meem rules', 'Qalqalah', 'Madd (elongation)', 'Waqf and Ibtida']
  },
  {
    title: 'Practical Application',
    duration: '2 months',
    lessons: 20,
    topics: ['Recitation practice', 'Error correction', 'Beautiful recitation', 'Different Qira&apos;at']
  },
  {
    title: 'Mastery & Assessment',
    duration: '1 month',
    lessons: 8,
    topics: ['Final assessments', 'Certification preparation', 'Teaching methodology', 'Continued improvement']
  }
];

const features = [
  'Audio practice with feedback',
  'Pronunciation correction',
  'Rule explanations with examples',
  'Recitation assessment',
  'One-on-one sessions',
  'Progress tracking',
  'Certificate upon completion',
  'Lifetime access to recordings'
];

export default function TajweedMasteryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/courses" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-500 text-white text-sm font-medium rounded-full">
                  Intermediate
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span className="text-emerald-200">(120 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Tajweed Mastery
              </h1>
              
              <p className="text-xl text-emerald-100 mb-8">
                Perfect your Qur&apos;anic recitation with proper pronunciation and beautiful Tajweed rules
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>6 months duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>120 active students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  <span>Audio focused</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Learn More
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
                  Contact Instructor
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center">
                  <Mic className="w-24 h-24 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Qari Yusuf Al-Makki</h3>
                  <p className="text-emerald-100 mb-6">
                    Master Qari with Ijazah in multiple Qira&apos;at and 20+ years of teaching Tajweed
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">250+</div>
                      <div className="text-emerald-200 text-sm">Students Certified</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">7</div>
                      <div className="text-emerald-200 text-sm">Qira&apos;at Mastered</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Course Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Master the art of beautiful Qur&apos;anic recitation through our comprehensive Tajweed course. 
                Learn the precise rules of pronunciation, rhythm, and melody that make Qur&apos;anic recitation 
                both correct and beautiful.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You&apos;ll Master:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Course Modules</h2>
              <div className="space-y-6">
                {courseModules.map((module, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{module.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{module.duration}</span>
                        <span>{module.lessons} lessons</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {module.topics.map((topic, topicIndex) => (
                        <div key={topicIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Enrollment Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$149/month</div>
                <p className="text-gray-600 dark:text-gray-300">6-month program</p>
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 mb-4">
                Learn More
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Questions? Contact us:</p>
                <p className="text-sm font-medium text-emerald-600">contact@essenceqa.org</p>
                <p className="text-sm font-medium text-emerald-600">+1 (512) 516 7782</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-900 dark:bg-gray-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300 dark:text-gray-400">
            13441 Ranch Rd 620 N, Austin, TX 78717 • contact@essenceqa.org • +1 (512) 516 7782
          </p>
        </div>
      </div>
    </div>
  );
}