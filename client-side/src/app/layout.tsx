import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from './components/ThemeProvider';
import { AuthProvider } from '@/contexts/AuthContext';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Essence Academy - Master the Qur'an with Expert Guidance",
  description: "Join thousands of students worldwide in our comprehensive Islamic learning platform. Learn Qur'anic recitation, memorization, and Arabic with certified Ijazah holders.",
  keywords: "Quran, Islamic education, Arabic learning, Quranic recitation, memorization, Ijazah, online Islamic courses",
  authors: [{ name: "Essence Academy" }],
  creator: "Essence Academy",
  publisher: "Essence Academy",
  openGraph: {
    title: "Essence Academy - Master the Qur'an with Expert Guidance",
    description: "Join thousands of students worldwide in our comprehensive Islamic learning platform.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Essence Academy - Master the Qur'an with Expert Guidance",
    description: "Join thousands of students worldwide in our comprehensive Islamic learning platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} ${plusJakarta.variable} font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
