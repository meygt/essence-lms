import React from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Essence Academy</h3>
                <p className="text-sm text-gray-400">Qur&apos;anic Education</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-100">
              Empowering Muslims worldwide with authentic Islamic education through modern technology and traditional teaching methods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
              <li><Link href="/#features" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/#testimonials" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400">
                <Mail className="w-5 h-5 mr-3" />
                <a href="mailto:contact@essenceqa.org" className="hover:text-white transition-colors">
                  contact@essenceqa.org
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone className="w-5 h-5 mr-3" />
                <a href="tel:+15125167782" className="hover:text-white transition-colors">
                  +1 (512) 516 7782
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin className="w-5 h-5 mr-3" />
                <a href="https://maps.google.com/?q=13441+Ranch+Rd+620+N,+Austin,+TX+78717" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  13441 Ranch Rd 620 N, Austin, TX 78717
                </a>
              </li>
              <li className="flex items-center text-gray-400">
                <Globe className="w-5 h-5 mr-3" />
                <a href="https://essenceqa.org" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  essenceqa.org
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Essence Academy. All rights reserved. | 
            <Link href="/privacy" className="hover:text-white transition-colors"> Privacy Policy</Link> | 
            <Link href="/terms" className="hover:text-white transition-colors"> Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}