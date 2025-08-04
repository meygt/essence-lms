'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Star, CheckCircle, Play, Download, Calendar, ArrowLeft, Globe, MessageCircle } from 'lucide-react';

const courseModules = [
  {
    title: 'Arabic Alphabet & Basics',
    duration: '1 month',
    lessons: 12,
    topics: ['Arabic letters and sounds', 'Writing practice', 'Basic vocabulary', 'Simple greetings']
  },
  {
    title: 'Grammar Foundation',
    duration: '2 months',
    lessons: 20,
    topics: ['Noun and verb patterns', 'Sentence structure', 'Gender and number', 'Basic conjugation']
  },
  {
    title: 'Intermediate Grammar',
    duration: '3 months',
    lessons: 28,
    topics: ['Complex sentences', 'Verb tenses', 'Conditional statements', 'Passive voice']
  },
  {
    title: 'Conversation & Speaking',
    duration: '3 months',
    lessons: 32,
    topics: ['Daily conversations', 'Pronunciation practice', 'Listening comprehension', 'Cultural context']
  },
  {
    title: 'Advanced Arabic',
    duration: '3 months',
    lessons: 24,
    topics: ['Classical Arabic', 'Literature reading', 'Advanced writing', 'Quranic Arabic']
  }
];

const features = [
  'Interactive online lessons',
  'Native Arabic-speaking instructors',
  'Speaking practice sessions',
  'Grammar mastery exercises',
  'Cultural context learning',
  'Progress tracking dashboard',
  'Certificate of completion',
  'Lifetime access to materials'
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Student',
    content: 'I went from knowing no Arabic to having conversations in just 6 months. The structured approach really works!',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Professional',
    content: 'The course helped me understand Arabic for my work in the Middle East. Excellent teaching methodology.',
    rating: 5
  },
  {
    name: 'Aisha Rahman',
    role: 'Student',
    content: 'As someone who wanted to understand the Quran better, this course gave me the foundation I needed.',
    rating: 5
  }
];

export default function ArabicLanguagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                  Beginner to Advanced
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">4.8</span>
                  <span className="text-emerald-200">(200 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Arabic Language Mastery
              </h1>
              
              <p className="text-xl text-emerald-100 mb-8">
                Comprehensive Arabic language course from beginner to advanced level with native speakers
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>12 months duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>200 active students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>Online & Interactive</span>
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
                  <MessageCircle className="w-24 h-24 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Dr. Fatima Al-Zahra</h3>
                  <p className="text-emerald-100 mb-6">
                    PhD in Arabic Linguistics with 15+ years of teaching experience to international students
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">500+</div>
                      <div className="text-emerald-200 text-sm">Students Taught</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-emerald-200 text-sm">Years Experience</div>
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
                Our comprehensive Arabic language program is designed to take you from complete beginner to advanced proficiency. 
                Whether you want to understand the Quran, communicate with Arabic speakers, or advance your career, 
                this course provides the foundation you need.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                The course combines modern teaching methods with traditional Arabic learning techniques. You&apos;ll learn from 
                native speakers who understand the challenges faced by non-Arabic speakers and provide personalized guidance 
                throughout your learning journey.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You&apos;ll Achieve:</h3>
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
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
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

            {/* Learning Approach */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Learning Approach</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interactive Learning</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Engage with multimedia content, interactive exercises, and real-time feedback to accelerate your learning.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Video lessons with subtitles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Interactive quizzes</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Writing practice tools</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Speaking Practice</h3>
                  <p className="text-gray-600 mb-4">
                    Regular conversation sessions with native speakers to build confidence and fluency.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Weekly conversation sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Pronunciation correction</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Cultural context learning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Student Success Stories</h2>
              <div className="space-y-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="border-l-4 border-emerald-500 pl-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 italic">&quot;{testimonial.content}&quot;</p>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</div>
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
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$299/month</div>
                <p className="text-gray-600 dark:text-gray-300">12-month program</p>
                <p className="text-sm text-emerald-600 font-medium">30-day money-back guarantee</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Duration</span>
                  <span className="font-semibold dark:text-white">12 months</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Format</span>
                  <span className="font-semibold dark:text-white">Online</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 dark:text-gray-300">Level</span>
                  <span className="font-semibold dark:text-white">All Levels</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-300">Certificate</span>
                  <span className="font-semibold dark:text-white">Yes</span>
                </div>
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

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Download className="w-5 h-5 text-emerald-600" />
                  <span>Download Curriculum</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Schedule Free Trial</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Play className="w-5 h-5 text-emerald-600" />
                  <span>Watch Sample Lesson</span>
                </button>
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