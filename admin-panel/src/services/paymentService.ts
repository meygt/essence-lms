import api from './api';
// import { mockDataService } from './mockDataService';
import type { PaginatedResponse, SearchParams, PaginationParams } from '../types/api';
import type { Payment } from '../types/payment';
import { PaymentStatus, PaymentMethod } from '../types/payment';

export interface PaymentStatistics {
  totalRevenue: number;
  monthlyRevenue: number;
  totalPayments: number;
  successfulPayments: number;
  pendingPayments: number;
  failedPayments: number;
  refundedPayments: number;
  averagePaymentAmount: number;
  revenueGrowthRate: number;
  monthlyGrowthRate?: number;
  paymentsByMethod: Record<PaymentMethod, number>;
  monthlyRevenueData: {
    month: string;
    revenue: number;
  }[];
}

export interface CreatePaymentRequest {
  userId: string;
  courseId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  description?: string;
}

export interface UpdatePaymentRequest {
  status?: PaymentStatus;
  transactionId?: string;
  description?: string;
}

export interface RefundRequest {
  refundAmount: number;
  reason?: string;
}

class PaymentService {
  // Get payment statistics
  async getPaymentStatistics(params?: {
    startDate?: string;
    endDate?: string;
    courseId?: string;
    teacherId?: string;
  }): Promise<PaymentStatistics> {
    try {
      const response = await api.get('/payments/statistics', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch payment statistics:', error);
      // Return empty statistics instead of mock data
      return {
        totalRevenue: 0,
        monthlyRevenue: 0,
        totalPayments: 0,
        successfulPayments: 0,
        pendingPayments: 0,
        failedPayments: 0,
        refundedPayments: 0,
        averagePaymentAmount: 0,
        revenueGrowthRate: 0,
        paymentsByMethod: {} as Record<PaymentMethod, number>,
        monthlyRevenueData: [],
      };
    }
  }

  // Get all payments with pagination and filtering
  async getPayments(params: SearchParams & {
    userId?: string;
    courseId?: string;
    status?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    minAmount?: number;
    maxAmount?: number;
    startDate?: string;
    endDate?: string;
  } = {}): Promise<PaginatedResponse<Payment>> {
    try {
      const response = await api.get('/payments', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch payments:', error);
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

  // Get payment by ID
  async getPaymentById(id: string): Promise<Payment> {
    const response = await api.get(`/payments/${id}`);
    return response.data;
  }

  // Create new payment
  async createPayment(paymentData: CreatePaymentRequest): Promise<Payment> {
    const response = await api.post('/payments', paymentData);
    return response.data;
  }

  // Update payment
  async updatePayment(id: string, paymentData: UpdatePaymentRequest): Promise<Payment> {
    const response = await api.put(`/payments/${id}`, paymentData);
    return response.data;
  }

  // Delete payment
  async deletePayment(id: string): Promise<void> {
    await api.delete(`/payments/${id}`);
  }

  // Get payments by user
  async getPaymentsByUser(userId: string, params: PaginationParams & {
    status?: PaymentStatus;
  } = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get(`/payments/user/${userId}`, { params });
    return response.data;
  }

  // Get payments by course
  async getPaymentsByCourse(courseId: string, params: PaginationParams & {
    status?: PaymentStatus;
  } = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get(`/payments/course/${courseId}`, { params });
    return response.data;
  }

  // Get payments by status
  async getPaymentsByStatus(status: PaymentStatus, params: PaginationParams = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get(`/payments/status/${status}`, { params });
    return response.data;
  }

  // Get payments by method
  async getPaymentsByMethod(method: PaymentMethod, params: PaginationParams = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get(`/payments/method/${method}`, { params });
    return response.data;
  }

  // Get payment by transaction ID
  async getPaymentByTransactionId(transactionId: string): Promise<Payment | null> {
    try {
      const response = await api.get(`/payments/transaction/${transactionId}`);
      return response.data;
    } catch {
      return null;
    }
  }

  // Get payment by invoice number
  async getPaymentByInvoiceNumber(invoiceNumber: string): Promise<Payment | null> {
    try {
      const response = await api.get(`/payments/invoice/${invoiceNumber}`);
      return response.data;
    } catch {
      return null;
    }
  }

  // Search payments
  async searchPayments(params: SearchParams & {
    userId?: string;
    courseId?: string;
    status?: PaymentStatus;
    paymentMethod?: PaymentMethod;
    minAmount?: number;
    maxAmount?: number;
    startDate?: string;
    endDate?: string;
    keyword?: string;
  } = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get('/payments/search', { params });
    return response.data;
  }

  // Get payments by date range
  async getPaymentsByDateRange(
    startDate: string,
    endDate: string,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<Payment>> {
    const response = await api.get('/payments/date-range', {
      params: { startDate, endDate, ...params }
    });
    return response.data;
  }

  // Get payments by amount range
  async getPaymentsByAmountRange(
    minAmount: number,
    maxAmount: number,
    params: PaginationParams = {}
  ): Promise<PaginatedResponse<Payment>> {
    const response = await api.get('/payments/amount-range', {
      params: { minAmount, maxAmount, ...params }
    });
    return response.data;
  }

  // Get overdue payments
  async getOverduePayments(params: PaginationParams = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get('/payments/overdue', { params });
    return response.data;
  }

  // Get refunded payments
  async getRefundedPayments(params: PaginationParams = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get('/payments/refunded', { params });
    return response.data;
  }

  // Get payments by teacher
  async getPaymentsByTeacher(teacherId: string, params: PaginationParams = {}): Promise<PaginatedResponse<Payment>> {
    const response = await api.get(`/payments/teacher/${teacherId}`, { params });
    return response.data;
  }

  // Update payment status
  async updatePaymentStatus(id: string, status: PaymentStatus): Promise<Payment> {
    const response = await api.patch(`/payments/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  }

  // Process refund
  async processRefund(id: string, refundData: RefundRequest): Promise<Payment> {
    const response = await api.post(`/payments/${id}/refund`, refundData);
    return response.data;
  }

  // Get total revenue
  async getTotalRevenue(params?: {
    startDate?: string;
    endDate?: string;
    courseId?: string;
    teacherId?: string;
  }): Promise<number> {
    const response = await api.get('/payments/revenue', { params });
    return response.data;
  }

  // Get total refunds
  async getTotalRefunds(params?: {
    startDate?: string;
    endDate?: string;
    courseId?: string;
    teacherId?: string;
  }): Promise<number> {
    const response = await api.get('/payments/refunds/total', { params });
    return response.data;
  }

  // Get average payment amount
  async getAveragePaymentAmount(params?: {
    startDate?: string;
    endDate?: string;
    courseId?: string;
    teacherId?: string;
  }): Promise<number> {
    const response = await api.get('/payments/average-amount', { params });
    return response.data;
  }
}

export const paymentService = new PaymentService();
export default paymentService;