'use client'

import React, { useEffect } from 'react'
import Link from "next/link";
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from '../contexts/AuthContext';
import { authUtils } from '../utils/authUtils';
import { 
  GraduationCap, 
  ChevronDown,
  Clock,
  Shield,
  Award,
  CreditCard,
  Bell,
  FileText,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Target,
  Search,
  Users,
  Sparkles
} from 'lucide-react'

// Course data with clickable links
const popularCourses = [
  {
    id: 'quran-memorization',
    title: "Qur'an Memorization",
    description: 'Complete memorization program with experienced teachers and personalized tracking',
    icon: BookOpen,
    duration: '2-4 years',
    level: 'All Levels',
    students: 150,
    rating: 4.9,
    instructor: 'Mustafa Yigit',
    price: 'Contact for pricing'
  },
  {
    id: 'tajweed-mastery',
    title: 'Tajweed Mastery',
    description: 'Perfect your recitation with detailed rules and one-on-one practice',
    icon: Target,
    duration: '6-12 months',
    level: 'Intermediate',
    students: 89,
    rating: 4.8,
    instructor: 'Mustafa Yigit',
    price: '$149/month'
  },
  {
    id: 'arabic-language',
    title: 'Arabic Language',
    description: 'Understand the language of the Qur&apos;an from basics to advanced',
    icon: GraduationCap,
    duration: '1-2 years',
    level: 'Beginner',
    students: 234,
    rating: 4.9,
    instructor: 'Mustafa Yigit',
    price: '$299/month'
  },
  {
    id: 'islamic-studies',
    title: 'Islamic Studies',
    description: 'Deep dive into Islamic knowledge and contextual understanding',
    icon: Search,
    duration: '8 months',
    level: 'Beginner',
    students: 67,
    rating: 4.7,
    instructor: 'Mustafa Yigit',
    price: '$199/month'
  }
]

// Features data
const features = [
  { icon: FileText, title: 'Structured Curriculum', description: 'Progressive learning path tailored to each student' },
  { icon: Award, title: 'Certified Teachers', description: 'All instructors hold Ijazah certifications' },
  { icon: Shield, title: 'Secure Parent Access', description: "Monitor your child's progress safely" },
  { icon: GraduationCap, title: 'Completion Certificates', description: 'Recognized certifications upon course completion' },
  { icon: CreditCard, title: 'Secure Payments', description: 'Easy and secure payment processing' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Classes scheduled for your convenience' },
  { icon: Bell, title: 'Live Notifications', description: 'Stay updated with real-time alerts' },
  { icon: FileText, title: 'Progress Reports', description: 'Detailed tracking and analytics' }
]

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    location: 'California, USA',
    role: 'Parent',
    text: "The structured approach and qualified teachers have made a remarkable difference in my children's Quranic education.",
    rating: 5,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 2,
    name: 'Ahmed Hassan',
    location: 'London, UK',
    role: 'Student',
    text: 'Learning Tajweed online seemed impossible until I joined Essence Academy. The teachers are incredibly patient.',
    rating: 5,
    avatar: '/api/placeholder/40/40'
  },
  {
    id: 3,
    name: 'Dr. Fatima Khan',
    location: 'Toronto, Canada',
    role: 'Parent',
    text: 'The flexible scheduling and quality of education has been a blessing for our busy family.',
    rating: 5,
    avatar: '/api/placeholder/40/40'
  }
]

export default function Home() {
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user) {
      // Redirect authenticated users to their dashboard
      const dashboardUrl = authUtils.getDashboardUrl(user.role);
      window.location.href = dashboardUrl;
    }
  }, [isLoading, isAuthenticated, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header currentPage="home" />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Islamic Patterns */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-400/10 to-green-600/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-amber-400/10 to-amber-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-br from-green-500/10 to-green-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-700 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2" />
              ✨ Certified Islamic Education Platform
            </span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-8 leading-tight animate-fade-in-up text-center">
            Master the{' '}
            <span className="bg-gradient-to-r from-green-600 via-green-500 to-amber-500 bg-clip-text text-transparent">
              Qur&apos;an
            </span>{' '}
            with Expert Guidance
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-auto mx-auto leading-relaxed animate-fade-in-up text-center" style={{ animationDelay: '0.2s' }}>
            Join thousands of students worldwide in our comprehensive Islamic learning platform. <span className="text-green-600 dark:text-green-400 font-semibold">Learn Qur&apos;anic recitation, memorization, and Arabic</span> with certified Ijazah holders.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              href="/courses"
              className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-2xl hover:shadow-green-500/25 transform hover:-translate-y-2 hover:scale-105 flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <BookOpen className="w-6 h-6 mr-3" />
              Start Learning Today
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              href="#courses"
              className="group border-3 border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 px-10 py-5 rounded-2xl text-lg font-bold hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center"
            >
              <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
              Watch Demo
            </Link>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="group text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">1000+</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base leading-tight">Active Students</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Worldwide</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base leading-tight">Certified Teachers</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Ijazah Holders</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">25+</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base leading-tight">Countries</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Global Reach</div>
            </div>
            <div className="group text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-2xl md:text-3xl lg:text-4xl font-black bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">4.9</div>
              <div className="text-gray-800 dark:text-gray-200 font-semibold text-sm md:text-base leading-tight">Average Rating</div>
              <div className="flex items-center justify-center mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-green-600" />
        </div>
      </section>

      {/* Popular Courses Section */}
      <section id="courses" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-auto mx-auto px-4 md:px-0 mb-12">
            Start your Islamic learning journey with our most loved courses
          </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularCourses.map((course) => {
              const IconComponent = course.icon
              return (
                <Link key={course.id} href={`/courses/${course.id}`} className="group block">
                  <div className="bg-white dark:bg-gray-700 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-600 hover:border-green-200 dark:hover:border-green-400 transform hover:-translate-y-3 hover:scale-105">
                    <div className="p-8">
                      {/* Icon with enhanced styling */}
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                          <IconComponent className="w-8 h-8 text-green-600" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      
                      {/* Course Title */}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 leading-tight">
                        {course.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed line-clamp-3">
                        {course.description}
                      </p>
                      
                      {/* Course Meta Info */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Clock className="w-4 h-4 mr-2" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Target className="w-4 h-4 mr-2" />
                            <span>{course.level}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-gray-500 dark:text-gray-400">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{course.students} students</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-amber-400 fill-current mr-1" />
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{course.rating}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-gray-600 dark:text-gray-300">
                            <span className="font-medium">Instructor:</span> {course.instructor}
                          </div>
                          <div className="text-green-600 font-bold">
                            {course.price}
                          </div>
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-green-700 p-0.5 group-hover:from-green-500 group-hover:to-green-600 transition-all duration-300">
                        <div className="bg-gradient-to-r from-green-600 to-green-700 group-hover:from-green-500 group-hover:to-green-600 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 flex items-center justify-center">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          
          <div className="text-center mt-16">
            <Link
              href="/courses"
              className="group inline-flex items-center px-10 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              <BookOpen className="w-6 h-6 mr-3" />
              View All Courses
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Essence Academy?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-auto mx-auto px-4 md:px-0 mb-16">
            Experience the finest Islamic education with modern technology and traditional values
          </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-800 dark:to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-auto mx-auto px-4 md:px-0 mb-16">
            Hear from our global community of learners
          </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic text-left">
                  &quot;{testimonial.text}&quot;
                </p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role} • {testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-auto mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
            Ready to Begin Your Islamic Learning Journey?
          </h2>
          <p className="text-xl text-green-100 mb-12 text-center max-w-auto mx-auto px-4">
            Join thousands of students worldwide and start learning with certified teachers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="bg-white text-green-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
