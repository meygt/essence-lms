'use client'

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  FileText,
  Scale,
  CreditCard,
  AlertTriangle,
  UserX,
  Shield,
  Clock,
  CheckCircle,
  Mail
} from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Main Content */}
      <main className="py-16">
        <div className="prose-container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Please read these terms carefully before using our educational platform
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>By accessing and using Essence Academy&apos;s services, you accept and agree to be bound by the terms and provision of this agreement.</p>
                <p>If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the service.</p>
              </div>
            </section>

            {/* Service Description */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Service Description</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Essence Academy provides online Islamic education services, including but not limited to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Qur&apos;anic memorization and recitation courses</li>
                  <li>Tajweed instruction and practice</li>
                  <li>Arabic language learning programs</li>
                  <li>Islamic studies and contextual education</li>
                  <li>One-on-one tutoring sessions</li>
                  <li>Progress tracking and assessment tools</li>
                </ul>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <UserX className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>As a user of our platform, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information during registration</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use the service only for lawful educational purposes</li>
                  <li>Respect the intellectual property rights of all content</li>
                  <li>Treat instructors and fellow students with respect</li>
                  <li>Attend scheduled classes punctually and prepared</li>
                  <li>Not share account access with unauthorized individuals</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Payment Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Payment terms for our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All fees are due in advance of service delivery</li>
                  <li>Payments are processed securely through our payment partners</li>
                  <li>Monthly subscriptions auto-renew unless cancelled</li>
                  <li>Price changes will be communicated 30 days in advance</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </div>
            </section>

            {/* Refund Policy */}
            <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Refund Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-amber-800 dark:text-amber-300">
                  IMPORTANT: Refunds are subject to individual circumstances and are not guaranteed.
                </p>
                <p>Refund considerations may include:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Technical issues preventing access to services</li>
                  <li>Instructor unavailability for extended periods</li>
                  <li>Documented service quality issues</li>
                  <li>Medical or emergency circumstances (with documentation)</li>
                </ul>
                <p className="font-medium">
                  All refund requests must be submitted in writing and will be reviewed on a case-by-case basis. Essence Academy reserves the right to approve or deny refund requests at its sole discretion.
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Refunds, if approved, may take 5-10 business days to process and appear in your account.
                </p>
              </div>
            </section>

            {/* Liability Disclaimer */}
            <section className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-800 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-red-800 dark:text-red-300">
                  ESSENCE ACADEMY IS NOT RESPONSIBLE FOR ANY THEFT, INCLUDING IDENTITY THEFT, FINANCIAL LOSS, OR DATA BREACH THAT MAY OCCUR THROUGH THE USE OF OUR PLATFORM OR SERVICES.
                </p>
                <p>By using our services, you acknowledge and agree that:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You use our platform at your own risk</li>
                  <li>We are not liable for any direct, indirect, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for services</li>
                  <li>You are responsible for maintaining the security of your account</li>
                  <li>We are not responsible for third-party actions or security breaches</li>
                </ul>
                <p className="font-medium text-red-700 dark:text-red-400">
                  Users are strongly advised to use secure internet connections, maintain strong passwords, and monitor their accounts regularly for any suspicious activity.
                </p>
              </div>
            </section>

            {/* Cancellation Policy */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Cancellation Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Cancellation terms:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Monthly subscriptions can be cancelled at any time</li>
                  <li>Cancellations take effect at the end of the current billing period</li>
                  <li>Individual class cancellations require 24-hour notice</li>
                  <li>No-shows may be charged the full session fee</li>
                  <li>We reserve the right to terminate accounts for policy violations</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Intellectual Property</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>All content, materials, and resources provided through Essence Academy are protected by intellectual property laws. This includes:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Course materials and curriculum</li>
                  <li>Video and audio recordings</li>
                  <li>Assessment tools and progress tracking systems</li>
                  <li>Platform software and user interface</li>
                  <li>Logos, trademarks, and branding materials</li>
                </ul>
                <p>Users may not reproduce, distribute, or create derivative works without explicit written permission.</p>
              </div>
            </section>

            {/* Modifications to Terms */}
            <section className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Modifications to Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>Essence Academy reserves the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.</p>
                <p>Continued use of our services after changes constitutes acceptance of the new terms. We recommend reviewing these terms periodically.</p>
                <p>Significant changes will be communicated via email to registered users.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Contact Information</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>For questions about these Terms of Service, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> legal@essenceacademy.com</p>
                  <p><strong>Phone:</strong> +1 (512) 516-7782</p>
                  <p><strong>Address:</strong> 13441 Ranch Rd 620 N, Austin, TX 78717</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Business hours: Monday - Friday, 9:00 AM - 6:00 PM CST
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}