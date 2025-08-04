'use client'

import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { 
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  AlertTriangle
} from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Main Content */}
      <main className="py-16">
        <div className="prose-container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Your privacy and data security are fundamental to our mission at Essence Academy
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We collect information you provide directly to us, such as:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Account credentials and profile information</li>
                  <li>Payment and billing information</li>
                  <li>Course progress and learning data</li>
                  <li>Communications with our support team</li>
                  <li>Device information and usage analytics</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide, maintain, and improve our educational services</li>
                  <li>Process payments and manage your account</li>
                  <li>Send you course updates and important notifications</li>
                  <li>Provide customer support and respond to your inquiries</li>
                  <li>Analyze usage patterns to enhance user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We may share your information in the following circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your consent or at your direction</li>
                  <li>With service providers who assist in our operations</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
                <p className="font-medium">We do not sell, rent, or trade your personal information to third parties for marketing purposes.</p>
              </div>
            </section>

            {/* Data Security */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <p>However, please note that no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.</p>
              </div>
            </section>

            {/* Liability Disclaimer */}
            <section className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Important Disclaimer</h2>
              </div>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p className="font-semibold text-amber-800 dark:text-amber-300">
                  LIMITATION OF LIABILITY: Essence Academy is not responsible for any theft, including identity theft, that may occur through the use of our platform or services.
                </p>
                <p>
                  While we implement security measures to protect your information, users acknowledge that they use our services at their own risk. We strongly recommend that you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use strong, unique passwords for your account</li>
                  <li>Keep your login credentials confidential</li>
                  <li>Monitor your account for any suspicious activity</li>
                  <li>Report any security concerns immediately</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Your Rights and Choices</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your account and data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>To exercise these rights, please contact us at privacy@essenceacademy.com</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Us</h2>
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@essenceacademy.com</p>
                  <p><strong>Phone:</strong> +1 (512) 516-7782</p>
                  <p><strong>Address:</strong> 13441 Ranch Rd 620 N, Austin, TX 78717</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}