import { NextRequest, NextResponse } from 'next/server';

// Mock user storage (in real app, this would be a database)
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
  }
];

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      dateOfBirth,
      gender
    } = await request.json();

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      email,
      password,
      firstName,
      lastName,
      role: 'student', // Only students can sign up directly
      phone: phone || '',
      dateOfBirth,
      gender
    };

    // Add to mock storage
    mockUsers.push(newUser);

    // Generate a mock JWT token
    const token = `mock-jwt-token-${newUser.id}-${Date.now()}`;

    // Remove password from user object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      token,
      user: userWithoutPassword,
      redirectUrl: '/dashboard/student'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}