import { useApi, usePaginatedApi, useApiMutation } from './useApi';
import paymentService from '../services/paymentService';
import type { PaymentStatistics, CreatePaymentRequest, UpdatePaymentRequest, RefundRequest } from '../services/paymentService';
import type { Payment } from '../types/payment';
import { PaymentStatus, PaymentMethod } from '../types/payment';
import type { SearchParams } from '../types/api';

// Hook for payment statistics
export function usePaymentStatistics() {
  return useApi<PaymentStatistics>(
    () => paymentService.getPaymentStatistics(),
    { immediate: true }
  );
}

// Hook for paginated payments list
export function usePayments(params: SearchParams & {
  userId?: string;
  courseId?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
} = {}) {
  return usePaginatedApi(
    (apiParams) => paymentService.getPayments({ ...params, ...apiParams }),
    params,
    { immediate: true }
  );
}

// Hook for single payment
export function usePayment(id: string, enabled: boolean = true) {
  return useApi<Payment>(
    () => paymentService.getPaymentById(id),
    { immediate: enabled }
  );
}

// Hook for creating payment
export function useCreatePayment() {
  return useApiMutation<Payment, CreatePaymentRequest>(
    (paymentData) => paymentService.createPayment(paymentData)
  );
}

// Hook for updating payment
export function useUpdatePayment() {
  return useApiMutation<Payment, { id: string; data: UpdatePaymentRequest }>(
    ({ id, data }) => paymentService.updatePayment(id, data)
  );
}

// Hook for deleting payment
export function useDeletePayment() {
  return useApiMutation<void, string>(
    (id) => paymentService.deletePayment(id)
  );
}

// Hook for searching payments
export function useSearchPayments(params: SearchParams & {
  userId?: string;
  courseId?: string;
  status?: PaymentStatus;
  method?: PaymentMethod;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
} = {}) {
  return usePaginatedApi(
    (apiParams) => paymentService.searchPayments({ ...params, ...apiParams }),
    params,
    { immediate: false }
  );
}

// Hook for payments by user
export function usePaymentsByUser(userId: string) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByUser(userId, params),
    {},
    { immediate: true }
  );
}

// Hook for payments by course
export function usePaymentsByCourse(courseId: string) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByCourse(courseId, params),
    {},
    { immediate: true }
  );
}

// Hook for payments by status
export function usePaymentsByStatus(status: PaymentStatus) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByStatus(status, params),
    {},
    { immediate: true }
  );
}

// Hook for payments by method
export function usePaymentsByMethod(method: PaymentMethod) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByMethod(method, params),
    {},
    { immediate: true }
  );
}

// Hook for payment by transaction ID
export function usePaymentByTransactionId(transactionId: string, enabled: boolean = true) {
  return useApi<Payment | null>(
    () => paymentService.getPaymentByTransactionId(transactionId),
    { immediate: enabled }
  );
}

// Hook for payment by invoice number
export function usePaymentByInvoiceNumber(invoiceNumber: string, enabled: boolean = true) {
  return useApi<Payment | null>(
    () => paymentService.getPaymentByInvoiceNumber(invoiceNumber),
    { immediate: enabled }
  );
}

// Hook for payments by date range
export function usePaymentsByDateRange(startDate: string, endDate: string) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByDateRange(startDate, endDate, params),
    {},
    { immediate: true }
  );
}

// Hook for payments by amount range
export function usePaymentsByAmountRange(minAmount: number, maxAmount: number) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByAmountRange(minAmount, maxAmount, params),
    {},
    { immediate: true }
  );
}

// Hook for overdue payments
export function useOverduePayments() {
  return usePaginatedApi(
    (params) => paymentService.getOverduePayments(params),
    {},
    { immediate: true }
  );
}

// Hook for refunded payments
export function useRefundedPayments() {
  return usePaginatedApi(
    (params) => paymentService.getRefundedPayments(params),
    {},
    { immediate: true }
  );
}

// Hook for payments by teacher
export function usePaymentsByTeacher(teacherId: string) {
  return usePaginatedApi(
    (params) => paymentService.getPaymentsByTeacher(teacherId, params),
    {},
    { immediate: true }
  );
}

// Hook for updating payment status
export function useUpdatePaymentStatus() {
  return useApiMutation<Payment, { id: string; status: PaymentStatus }>(
    ({ id, status }) => paymentService.updatePaymentStatus(id, status)
  );
}

// Hook for processing refund
export function useProcessRefund() {
  return useApiMutation<Payment, { id: string; refundData: RefundRequest }>(
    ({ id, refundData }) => paymentService.processRefund(id, refundData)
  );
}

// Hook for total revenue
export function useTotalRevenue() {
  return useApi<number>(
    () => paymentService.getTotalRevenue(),
    { immediate: true }
  );
}

// Hook for total refunds
export function useTotalRefunds() {
  return useApi<number>(
    () => paymentService.getTotalRefunds(),
    { immediate: true }
  );
}

// Hook for average payment amount
export function useAveragePaymentAmount() {
  return useApi<number>(
    () => paymentService.getAveragePaymentAmount(),
    { immediate: true }
  );
}