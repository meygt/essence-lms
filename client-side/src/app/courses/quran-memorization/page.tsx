'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, Users, Star, CheckCircle, Play, Download, Calendar, Award, ArrowLeft } from 'lucide-react';

const courseModules = [
  {
    title: 'Foundation & Preparation',
    duration: '2 months',
    lessons: 16,
    topics: ['Arabic alphabet mastery', 'Basic Tajweed rules', 'Memorization techniques', 'Daily routine establishment']
  },
  {
    title: 'Juz 30 (Amma)',
    duration: '4 months',
    lessons: 24,
    topics: ['Short surahs memorization', 'Meaning and context', 'Recitation practice', 'Review sessions']
  },
  {
    title: 'Juz 29 & 28',
    duration: '6 months',
    lessons: 32,
    topics: ['Medium surahs', 'Advanced Tajweed', 'Connecting verses', 'Retention techniques']
  },
  {
    title: 'Progressive Memorization',
    duration: '18 months',
    lessons: 96,
    topics: ['Systematic progression', 'Daily targets', 'Weekly reviews', 'Monthly assessments']
  },
  {
    title: 'Completion & Certification',
    duration: '6 months',
    lessons: 24,
    topics: ['Final reviews', 'Complete recitation', 'Ijazah preparation', 'Teaching methodology']
  }
];

const features = [
  'One-on-one sessions with qualified Huffaz',
  'Personalized memorization schedule',
  'Regular Tajweed correction',
  'Progress tracking and reporting',
  'Family involvement program',
  'Flexible timing options',
  'Certificate upon completion',
  'Lifetime access to recordings'
];

const testimonials = [
  {
    name: 'Ahmad Hassan',
    role: 'Parent',
    content: 'My son completed his Hifz in 3 years with excellent Tajweed. The teachers are very patient and knowledgeable.',
    rating: 5
  },
  {
    name: 'Fatima Al-Zahra',
    role: 'Student',
    content: 'The structured approach and personal attention helped me memorize the Quran efficiently while understanding its meanings.',
    rating: 5
  },
  {
    name: 'Omar Ibn Malik',
    role: 'Parent',
    content: 'Excellent program with dedicated teachers. My daughter is now a Hafiza and teaches others. Highly recommended!',
    rating: 5
  }
];

export default function QuranMemorizationPage() {
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
                  All Levels
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">4.9</span>
                  <span className="text-emerald-200">(150 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Qur&apos;an Memorization (Hifz)
              </h1>
              
              <p className="text-xl text-emerald-100 mb-8">
                Complete memorization program with proper Tajweed and deep understanding of the Holy Qur&apos;an
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>2-4 years duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>150 active students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  <span>Ijazah certification</span>
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
                  <BookOpen className="w-24 h-24 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Sheikh Ahmad Al-Hafiz</h3>
                  <p className="text-emerald-100 mb-6">
                    Master Hafiz with 20+ years of teaching experience and Ijazah from Al-Azhar University
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">200+</div>
                      <div className="text-emerald-200 text-sm">Students Graduated</div>
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
                Our comprehensive Qur&apos;an memorization program is designed to help students of all ages memorize the entire Holy Qur&apos;an 
                with proper Tajweed and understanding. The program follows a structured approach that has been proven successful 
                with hundreds of students worldwide.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Students will work one-on-one with qualified Huffaz who provide personalized attention, regular assessments, 
                and continuous support throughout the memorization journey. The program emphasizes not just memorization, 
                but also understanding, reflection, and practical application of Qur&apos;anic teachings.
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

            {/* Testimonials */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Student Testimonials</h2>
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
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Contact for Pricing</div>
                <p className="text-gray-600 dark:text-gray-300">Flexible payment plans available</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Duration</span>
                  <span className="font-semibold dark:text-white">2-4 years</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Format</span>
                  <span className="font-semibold dark:text-white">One-on-one</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Certificate</span>
                  <span className="font-semibold dark:text-white">Ijazah</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 dark:text-gray-300">Support</span>
                  <span className="font-semibold dark:text-white">24/7</span>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-4 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 transition-all duration-300 mb-4">
                Learn More
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Questions? Contact us:</p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">contact@essenceqa.org</p>
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">+1 (512) 516 7782</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Download className="w-5 h-5 text-emerald-600" />
                  <span>Download Brochure</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Schedule Consultation</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Play className="w-5 h-5 text-emerald-600" />
                  <span>Watch Demo</span>
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