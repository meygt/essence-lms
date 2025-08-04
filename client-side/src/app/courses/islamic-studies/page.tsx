'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Users, Star, CheckCircle, Play, Download, Calendar, ArrowLeft, GraduationCap, Heart } from 'lucide-react';

const courseModules = [
  {
    title: 'Aqeedah (Islamic Creed)',
    duration: '2 months',
    lessons: 16,
    topics: ['Six pillars of faith', 'Tawheed (Monotheism)', 'Names and attributes of Allah', 'Prophethood and messengers']
  },
  {
    title: 'Fiqh (Islamic Jurisprudence)',
    duration: '2 months',
    lessons: 20,
    topics: ['Five pillars of Islam', 'Prayer (Salah) rulings', 'Purification (Taharah)', 'Zakat and charity']
  },
  {
    title: "Seerah (Prophet's Biography)",
    duration: '2 months',
    lessons: 18,
    topics: ['Life of Prophet Muhammad ﷺ', 'Meccan period', 'Medinan period', 'Lessons and wisdom']
  },
  {
    title: 'Islamic History',
    duration: '1 month',
    lessons: 12,
    topics: ['Rightly-guided Caliphs', 'Islamic civilization', 'Major events', 'Historical lessons']
  },
  {
    title: 'Islamic Ethics & Morality',
    duration: '1 month',
    lessons: 10,
    topics: ['Character building', 'Social responsibilities', 'Family values', 'Community engagement']
  }
];

const features = [
  'Comprehensive Islamic foundation',
  'Authentic sources and references',
  'Interactive Q&A sessions',
  'Study materials and resources',
  'Community discussion forums',
  'Progress tracking system',
  'Certificate of completion',
  'Lifetime access to content'
];

const testimonials = [
  {
    name: 'Ahmed Hassan',
    role: 'New Muslim',
    content: 'This course gave me the solid foundation I needed as a new Muslim. Everything was explained clearly and with authentic sources.',
    rating: 5
  },
  {
    name: 'Mariam Abdullah',
    role: 'Student',
    content: 'I grew up Muslim but never had proper Islamic education. This course filled all the gaps in my knowledge.',
    rating: 5
  },
  {
    name: 'Omar Al-Rashid',
    role: 'Parent',
    content: 'Excellent course for both adults and teenagers. My whole family benefited from the structured approach.',
    rating: 5
  }
];

export default function IslamicStudiesPage() {
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
                  Beginner
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-current" />
                  <span className="font-medium">4.9</span>
                  <span className="text-emerald-200">(180 reviews)</span>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Islamic Studies Foundation
              </h1>
              
              <p className="text-xl text-emerald-100 mb-8">
                Essential Islamic knowledge covering Aqeedah, Fiqh, and Seerah for a strong foundation in faith
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>8 months duration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>180 active students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span>Faith building</span>
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
                  <GraduationCap className="w-24 h-24 text-white mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Sheikh Omar Ibn Malik</h3>
                  <p className="text-emerald-100 mb-6">
                    Islamic scholar with Ijazah in Islamic Studies and 18+ years of teaching experience
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold">300+</div>
                      <div className="text-emerald-200 text-sm">Students Guided</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">18</div>
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
                Our Islamic Studies Foundation course provides a comprehensive introduction to the essential knowledge 
                every Muslim should possess. Whether you&apos;re a new Muslim, someone who wants to strengthen their foundation, 
                or a parent seeking quality Islamic education for your family, this course covers all the fundamentals.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                The curriculum is carefully structured to build knowledge progressively, starting with the core beliefs 
                (Aqeedah) and moving through Islamic law (Fiqh), the life of Prophet Muhammad ﷺ (Seerah), and practical 
                applications for modern Muslim life. All teachings are based on authentic sources from the Quran and Sunnah.
              </p>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What You&apos;ll Learn:</h3>
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

            {/* Learning Methodology */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Teaching Methodology</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Authentic Sources</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All teachings are based on the Quran, authentic Hadith, and the understanding of the righteous predecessors.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Quranic verses with context</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Authentic Hadith references</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Scholarly consensus</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Interactive Learning</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Engage with the material through discussions, Q&A sessions, and practical applications.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Live Q&A sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Community discussions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600 dark:text-gray-300">Practical exercises</span>
                    </li>
                  </ul>
                </div>
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
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">$199/month</div>
                <p className="text-gray-600 dark:text-gray-300">8-month program</p>
                <p className="text-sm text-emerald-600 font-medium">Family discounts available</p>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Duration</span>
                  <span className="font-semibold dark:text-white">8 months</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Format</span>
                  <span className="font-semibold dark:text-white">Online</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-300">Level</span>
                  <span className="font-semibold dark:text-white">Beginner</span>
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
                  <span>Download Syllabus</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  <span>Schedule Consultation</span>
                </button>
                <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors dark:text-white">
                  <Play className="w-5 h-5 text-emerald-600" />
                  <span>Watch Introduction</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-gray-900 dark:bg-gray-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            13441 Ranch Rd 620 N, Austin, TX 78717 • contact@essenceqa.org • +1 (512) 516 7782
          </p>
        </div>
      </div>
    </div>
  );
}