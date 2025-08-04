import { useApi, usePaginatedApi, useApiMutation } from './useApi';
import calendarService from '../services/calendarService';
import type { CalendarEvent, CalendarStatistics, CreateCalendarEventRequest, UpdateCalendarEventRequest } from '../services/calendarService';
import type { SearchParams } from '../types/api';

// Hook for calendar statistics
export function useCalendarStatistics() {
  return useApi<CalendarStatistics>(
    () => calendarService.getCalendarStatistics(),
    { immediate: true }
  );
}

// Hook for paginated calendar events list
export function useCalendarEvents(params: SearchParams & {
  type?: CalendarEvent['type'];
  status?: CalendarEvent['status'];
  teacherId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
} = {}) {
  return usePaginatedApi(
    (apiParams) => calendarService.getCalendarEvents({ ...params, ...apiParams }),
    params,
    { immediate: true }
  );
}

// Hook for single calendar event
export function useCalendarEvent(id: string, enabled: boolean = true) {
  return useApi<CalendarEvent>(
    () => calendarService.getCalendarEventById(id),
    { immediate: enabled }
  );
}

// Hook for creating calendar event
export function useCreateCalendarEvent() {
  return useApiMutation<CalendarEvent, CreateCalendarEventRequest>(
    (eventData) => calendarService.createCalendarEvent(eventData)
  );
}

// Hook for updating calendar event
export function useUpdateCalendarEvent() {
  return useApiMutation<CalendarEvent, { id: string; data: UpdateCalendarEventRequest }>(
    ({ id, data }) => calendarService.updateCalendarEvent(id, data)
  );
}

// Hook for deleting calendar event
export function useDeleteCalendarEvent() {
  return useApiMutation<void, string>(
    (id) => calendarService.deleteCalendarEvent(id)
  );
}

// Hook for today's events
export function useTodayEvents() {
  return useApi<CalendarEvent[]>(
    () => calendarService.getTodayEvents(),
    { immediate: true }
  );
}

// Hook for events by date
export function useEventsByDate(date: string, enabled: boolean = true) {
  return useApi<CalendarEvent[]>(
    () => calendarService.getEventsByDate(date),
    { immediate: enabled }
  );
}

// Hook for events by date range
export function useEventsByDateRange(startDate: string, endDate: string) {
  return usePaginatedApi(
    (params) => calendarService.getEventsByDateRange(startDate, endDate, params),
    {},
    { immediate: true }
  );
}

// Hook for events by type
export function useEventsByType(type: CalendarEvent['type']) {
  return usePaginatedApi(
    (params) => calendarService.getEventsByType(type, params),
    {},
    { immediate: true }
  );
}

// Hook for events by status
export function useEventsByStatus(status: CalendarEvent['status']) {
  return usePaginatedApi(
    (params) => calendarService.getEventsByStatus(status, params),
    {},
    { immediate: true }
  );
}

// Hook for events by teacher
export function useEventsByTeacher(teacherId: string) {
  return usePaginatedApi(
    (params) => calendarService.getEventsByTeacher(teacherId, params),
    {},
    { immediate: true }
  );
}

// Hook for events by course
export function useEventsByCourse(courseId: string) {
  return usePaginatedApi(
    (params) => calendarService.getEventsByCourse(courseId, params),
    {},
    { immediate: true }
  );
}

// Hook for upcoming events
export function useUpcomingEvents(limit: number = 10) {
  return useApi<CalendarEvent[]>(
    () => calendarService.getUpcomingEvents(limit),
    { immediate: true }
  );
}

// Hook for searching calendar events
export function useSearchCalendarEvents(params: SearchParams & {
  type?: CalendarEvent['type'];
  status?: CalendarEvent['status'];
  teacherId?: string;
  courseId?: string;
  startDate?: string;
  endDate?: string;
} = {}) {
  return usePaginatedApi(
    (apiParams) => calendarService.searchCalendarEvents({ ...params, ...apiParams }),
    params,
    { immediate: false }
  );
}

// Hook for updating event status
export function useUpdateEventStatus() {
  return useApiMutation<CalendarEvent, { id: string; status: CalendarEvent['status'] }>(
    ({ id, status }) => calendarService.updateEventStatus(id, status)
  );
}

// Hook for cancelling event
export function useCancelEvent() {
  return useApiMutation<CalendarEvent, { id: string; reason?: string }>(
    ({ id, reason }) => calendarService.cancelEvent(id, reason)
  );
}

// Hook for completing event
export function useCompleteEvent() {
  return useApiMutation<CalendarEvent, string>(
    (id) => calendarService.completeEvent(id)
  );
}

// Hook for weekly schedule
export function useWeeklySchedule(startDate: string, enabled: boolean = true) {
  return useApi<CalendarEvent[]>(
    () => calendarService.getWeeklySchedule(startDate),
    { immediate: enabled }
  );
}

// Hook for monthly schedule
export function useMonthlySchedule(year: number, month: number, enabled: boolean = true) {
  return useApi<CalendarEvent[]>(
    () => calendarService.getMonthlySchedule(year, month),
    { immediate: enabled }
  );
}