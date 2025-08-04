import api from './api';
// import { mockDataService } from './mockDataService';
import type { ApiResponse } from './api';
import type { PaginatedResponse, SearchParams } from '../types/api';

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: 'CLASS' | 'WORKSHOP' | 'LECTURE' | 'EXAM' | 'MEETING' | 'OTHER';
  courseId?: string;
  courseName?: string;
  teacherId?: string;
  teacherName?: string;
  location?: string;
  isRecurring: boolean;
  recurringPattern?: 'DAILY' | 'WEEKLY' | 'MONTHLY';
  maxAttendees?: number;
  currentAttendees?: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
}

export interface CalendarStatistics {
  totalEvents: number;
  todayEvents: number;
  weeklyEvents: number;
  monthlyEvents: number;
  eventsByType: Record<string, number>;
  upcomingEvents: CalendarEvent[];
  completedEvents: number;
  cancelledEvents: number;
}

export interface CreateCalendarEventRequest {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: CalendarEvent['type'];
  courseId?: string;
  teacherId?: string;
  location?: string;
  isRecurring?: boolean;
  recurringPattern?: CalendarEvent['recurringPattern'];
  maxAttendees?: number;
}

export interface UpdateCalendarEventRequest extends Partial<CreateCalendarEventRequest> {
  status?: CalendarEvent['status'];
}

class CalendarService {
  // Get calendar statistics
  async getCalendarStatistics(): Promise<CalendarStatistics> {
    try {
      const response = await api.get<ApiResponse<CalendarStatistics>>('/api/calendar/statistics');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch calendar statistics:', error);
      // Return empty statistics instead of mock data
      return {
        totalEvents: 0,
        todayEvents: 0,
        weeklyEvents: 0,
        monthlyEvents: 0,
        eventsByType: {},
        upcomingEvents: [],
        completedEvents: 0,
        cancelledEvents: 0
      };
    }
  }

  // Get all calendar events with pagination
  async getCalendarEvents(params: SearchParams & {
    type?: CalendarEvent['type'];
    status?: CalendarEvent['status'];
    teacherId?: string;
    courseId?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<CalendarEvent>> {
    try {
      const response = await api.get<PaginatedResponse<CalendarEvent>>('/api/calendar/events', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch calendar events:', error);
      // Return empty paginated response instead of mock data
       return {
         content: [],
         totalElements: 0,
         totalPages: 0,
         size: 10,
         number: 0,
         first: true,
         last: true,
         numberOfElements: 0,
         empty: true,
       };
    }
  }

  // Get calendar event by ID
  async getCalendarEventById(id: string): Promise<CalendarEvent> {
    const response = await api.get<ApiResponse<CalendarEvent>>(`/api/calendar/events/${id}`);
    return response.data.data;
  }

  // Create calendar event
  async createCalendarEvent(eventData: CreateCalendarEventRequest): Promise<CalendarEvent> {
    const response = await api.post<ApiResponse<CalendarEvent>>('/api/calendar/events', eventData);
    return response.data.data;
  }

  // Update calendar event
  async updateCalendarEvent(id: string, eventData: UpdateCalendarEventRequest): Promise<CalendarEvent> {
    const response = await api.put<ApiResponse<CalendarEvent>>(`/api/calendar/events/${id}`, eventData);
    return response.data.data;
  }

  // Delete calendar event
  async deleteCalendarEvent(id: string): Promise<void> {
    await api.delete(`/api/calendar/events/${id}`);
  }

  // Get today's events
  async getTodayEvents(): Promise<CalendarEvent[]> {
    try {
      const response = await api.get<ApiResponse<CalendarEvent[]>>('/api/calendar/events/today');
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch today events:', error);
      // Return empty array instead of mock data
      return [];
    }
  }

  // Get events by date
  async getEventsByDate(date: string): Promise<CalendarEvent[]> {
    const response = await api.get<ApiResponse<CalendarEvent[]>>(`/api/calendar/events/date/${date}`);
    return response.data.data;
  }

  // Get events by date range
  async getEventsByDateRange(startDate: string, endDate: string, params: SearchParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>('/api/calendar/events/date-range', {
      params: { startDate, endDate, ...params }
    });
    return response.data;
  }

  // Get events by type
  async getEventsByType(type: CalendarEvent['type'], params: SearchParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>(`/api/calendar/events/type/${type}`, { params });
    return response.data;
  }

  // Get events by status
  async getEventsByStatus(status: CalendarEvent['status'], params: SearchParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>(`/api/calendar/events/status/${status}`, { params });
    return response.data;
  }

  // Get events by teacher
  async getEventsByTeacher(teacherId: string, params: SearchParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>(`/api/calendar/events/teacher/${teacherId}`, { params });
    return response.data;
  }

  // Get events by course
  async getEventsByCourse(courseId: string, params: SearchParams = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>(`/api/calendar/events/course/${courseId}`, { params });
    return response.data;
  }

  // Get upcoming events
  async getUpcomingEvents(limit: number = 10): Promise<CalendarEvent[]> {
    const response = await api.get<ApiResponse<CalendarEvent[]>>('/api/calendar/events/upcoming', {
      params: { limit }
    });
    return response.data.data;
  }

  // Search calendar events
  async searchCalendarEvents(params: SearchParams & {
    type?: CalendarEvent['type'];
    status?: CalendarEvent['status'];
    teacherId?: string;
    courseId?: string;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<CalendarEvent>> {
    const response = await api.get<PaginatedResponse<CalendarEvent>>('/api/calendar/events/search', { params });
    return response.data;
  }

  // Update event status
  async updateEventStatus(id: string, status: CalendarEvent['status']): Promise<CalendarEvent> {
    const response = await api.patch<ApiResponse<CalendarEvent>>(`/api/calendar/events/${id}/status`, { status });
    return response.data.data;
  }

  // Cancel event
  async cancelEvent(id: string, reason?: string): Promise<CalendarEvent> {
    const response = await api.patch<ApiResponse<CalendarEvent>>(`/api/calendar/events/${id}/cancel`, { reason });
    return response.data.data;
  }

  // Complete event
  async completeEvent(id: string): Promise<CalendarEvent> {
    const response = await api.patch<ApiResponse<CalendarEvent>>(`/api/calendar/events/${id}/complete`);
    return response.data.data;
  }

  // Get weekly schedule
  async getWeeklySchedule(startDate: string): Promise<CalendarEvent[]> {
    const response = await api.get<ApiResponse<CalendarEvent[]>>('/api/calendar/events/weekly', {
      params: { startDate }
    });
    return response.data.data;
  }

  // Get monthly schedule
  async getMonthlySchedule(year: number, month: number): Promise<CalendarEvent[]> {
    const response = await api.get<ApiResponse<CalendarEvent[]>>('/api/calendar/events/monthly', {
      params: { year, month }
    });
    return response.data.data;
  }
}

export default new CalendarService();