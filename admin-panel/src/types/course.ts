export const CourseStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED',
  SUSPENDED: 'SUSPENDED'
} as const;

export type CourseStatus = typeof CourseStatus[keyof typeof CourseStatus];

export const CourseLevel = {
  BEGINNER: 'BEGINNER',
  INTERMEDIATE: 'INTERMEDIATE',
  ADVANCED: 'ADVANCED'
} as const;

export type CourseLevel = typeof CourseLevel[keyof typeof CourseLevel];

export const EnrollmentStatus = {
  ENROLLED: 'ENROLLED',
  COMPLETED: 'COMPLETED',
  DROPPED: 'DROPPED',
  SUSPENDED: 'SUSPENDED'
} as const;

export type EnrollmentStatus = typeof EnrollmentStatus[keyof typeof EnrollmentStatus];

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription?: string;
  level: CourseLevel;
  status: CourseStatus;
  price: number;
  duration: number; // in hours
  maxStudents?: number;
  currentEnrollments: number;
  prerequisites?: string[];
  learningObjectives?: string[];
  syllabus?: string;
  thumbnail?: string;
  teacherId: string;
  teacherName?: string;
  averageRating: number;
  totalRatings: number;
  completionRate: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  studentId: string;
  status: EnrollmentStatus;
  enrolledAt: string;
  completedAt?: string;
  progress: number; // percentage 0-100
  lastAccessedAt?: string;
  certificateIssued: boolean;
  finalGrade?: number;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  orderIndex: number;
  duration: number; // in minutes
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string;
  content: string;
  orderIndex: number;
  duration: number; // in minutes
  videoUrl?: string;
  attachments?: string[];
  isRequired: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseRating {
  id: string;
  courseId: string;
  studentId: string;
  rating: number; // 1-5
  review?: string;
  createdAt: string;
  updatedAt: string;
}