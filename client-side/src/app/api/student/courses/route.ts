import { NextRequest, NextResponse } from 'next/server';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: string;
  image: string;
  progress: number;
  enrolledAt: string | null;
  status: string;
}

interface EnrolledCourse extends Course {
  studentId: string;
  courseId: string;
}

// Mock enrolled courses data
const mockEnrolledCourses: EnrolledCourse[] = [
  // Student with ID '1' has no enrolled courses initially
  // This will demonstrate an empty state
];

// Mock available courses for reference
const mockAvailableCourses = [
  {
    id: '1',
    title: 'Quran Memorization',
    description: 'Complete Quran memorization program with Tajweed',
    instructor: 'Sheikh Ahmed Al-Mahmoud',
    duration: '2 years',
    level: 'Beginner to Advanced',
    image: '/api/placeholder/400/250',
    progress: 0,
    enrolledAt: null,
    status: 'available'
  },
  {
    id: '2',
    title: 'Islamic Studies',
    description: 'Comprehensive Islamic studies covering Fiqh, Aqeedah, and more',
    instructor: 'Dr. Fatima Al-Zahra',
    duration: '1 year',
    level: 'Intermediate',
    image: '/api/placeholder/400/250',
    progress: 0,
    enrolledAt: null,
    status: 'available'
  },
  {
    id: '3',
    title: 'Arabic Language',
    description: 'Learn classical Arabic for better Quran understanding',
    instructor: 'Ustadh Omar Ibn Khattab',
    duration: '6 months',
    level: 'Beginner',
    image: '/api/placeholder/400/250',
    progress: 0,
    enrolledAt: null,
    status: 'available'
  }
];

export async function GET(request: NextRequest) {
  try {
    // In a real app, you would:
    // 1. Extract user ID from JWT token
    // 2. Query database for user's enrolled courses
    // 3. Return the courses with progress and enrollment details
    
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || '1'; // Default to user ID 1
    
    // Filter enrolled courses for this user
    const userEnrolledCourses = mockEnrolledCourses.filter(
      course => course.studentId === userId
    );
    
    return NextResponse.json({
      success: true,
      data: userEnrolledCourses,
      message: userEnrolledCourses.length === 0 
        ? 'No enrolled courses found' 
        : `Found ${userEnrolledCourses.length} enrolled courses`
    });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { courseId, userId } = await request.json();
    
    // Check if course exists
    const course = mockAvailableCourses.find(c => c.id === courseId);
    if (!course) {
      return NextResponse.json(
        { success: false, message: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Check if already enrolled
    const existingEnrollment = mockEnrolledCourses.find(
      enrollment => enrollment.courseId === courseId && enrollment.studentId === userId
    );
    
    if (existingEnrollment) {
      return NextResponse.json(
        { success: false, message: 'Already enrolled in this course' },
        { status: 400 }
      );
    }
    
    // Create new enrollment
    const newEnrollment: EnrolledCourse = {
      studentId: userId,
      courseId: courseId,
      id: course.id,
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
      image: course.image,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      status: 'enrolled'
    };
    
    mockEnrolledCourses.push(newEnrollment);
    
    return NextResponse.json({
      success: true,
      data: newEnrollment,
      message: 'Successfully enrolled in course'
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}