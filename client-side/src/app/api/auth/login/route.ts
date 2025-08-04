import { NextRequest, NextResponse } from 'next/server';

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'student@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    role: 'student',
    phone: '+1234567890',
    dateOfBirth: '2000-01-01',
    gender: 'Male'
  },
  {
    id: '2',
    email: 'teacher@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'teacher',
    phone: '+1234567891',
    dateOfBirth: '1985-05-15',
    gender: 'Female'
  },
  {
    id: '3',
    email: 'admin@example.com',
    password: 'password123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
    phone: '+1234567892',
    dateOfBirth: '1980-03-10',
    gender: 'Male'
  }
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Find user by email
    const user = mockUsers.find(u => u.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate a mock JWT token (in real app, use proper JWT library)
    const token = `mock-jwt-token-${user.id}-${Date.now()}`;

    // Remove password from user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    // Determine redirect URL based on role
    let redirectUrl = '/dashboard/student';
    if (user.role === 'teacher') {
      redirectUrl = '/dashboard/teacher';
    } else if (user.role === 'admin') {
      redirectUrl = '/dashboard/admin';
    }

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword,
      redirectUrl
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}