import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  CardHeader,
  Grid
} from '@mui/material';
import { CreditCard, Lock, CheckCircle } from '@mui/icons-material';

// Square Web Payments SDK types
interface SquareError {
  message: string;
  type: string;
}

interface SquareTokenResult {
  status: string;
  token?: string;
  errors?: SquareError[];
}

interface SquareCard {
  tokenize(): Promise<SquareTokenResult>;
  attach(selector: string): Promise<void>;
}

interface SquarePayments {
  card(): Promise<SquareCard>;
}

interface SquareSDK {
  payments(applicationId: string, locationId: string): SquarePayments;
}

declare global {
  interface Window {
    Square: SquareSDK;
  }
}

interface PaymentResult {
  token: string;
  details: PaymentDetails;
  amount: number;
  currency: string;
  timestamp: string;
}

interface PaymentFormProps {
  amount: number;
  currency?: string;
  onPaymentSuccess?: (result: PaymentResult) => void;
  onPaymentError?: (error: SquareError[] | Error) => void;
}

interface PaymentDetails {
  cardholderName: string;
  email: string;
  amount: number;
  description: string;
  [key: string]: unknown;
}

const SQUARE_CONFIG = {
  environment: 'sandbox', // Change to 'production' for live
  applicationId: 'sandbox-sq0idb-6rXkuMFtiNc1QacPSJXq5A',
  locationId: 'LTXCD6F0SCSVH'
};

export default function SquarePayment({ 
  amount, 
  currency = 'USD', 
  onPaymentSuccess, 
  onPaymentError 
}: PaymentFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [paymentForm, setPaymentForm] = useState<SquarePayments | null>(null);
  const [cardButton, setCardButton] = useState<SquareCard | null>(null);
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    cardholderName: '',
    email: '',
    amount: amount,
    description: 'Course Payment'
  });

  const initializeSquare = useCallback(async () => {
    try {
      // Load Square Web Payments SDK
      if (!window.Square) {
        const script = document.createElement('script');
        script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
        script.async = true;
        script.onload = () => setupSquarePayments();
        document.head.appendChild(script);
      } else {
        setupSquarePayments();
      }
    } catch (err) {
      console.error('Failed to load Square SDK:', err);
      setError('Failed to initialize payment system');
    }
  }, []);

  useEffect(() => {
    initializeSquare();
  }, [initializeSquare]);

  const setupSquarePayments = async () => {
    try {
      const payments = window.Square.payments(SQUARE_CONFIG.applicationId, SQUARE_CONFIG.locationId);
      setPaymentForm(payments);

      const card = await payments.card();
      await card.attach('#card-container');
      setCardButton(card);
    } catch (err) {
      console.error('Failed to setup Square payments:', err);
      setError('Failed to setup payment form');
    }
  };

  const handlePayment = async () => {
    if (!cardButton || !paymentForm) {
      setError('Payment form not initialized');
      return;
    }

    if (!paymentDetails.cardholderName || !paymentDetails.email) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await cardButton.tokenize();
      
      if (result.status === 'OK' && result.token) {
        // In a real application, you would send this token to your backend
        // For demo purposes, we'll simulate a successful payment
        const paymentResult = {
          token: result.token,
          details: paymentDetails,
          amount: amount,
          currency: currency,
          timestamp: new Date().toISOString()
        };

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setSuccess(true);
        onPaymentSuccess?.(paymentResult);
      } else {
        const errorMessage = result.errors?.map((error: SquareError) => error.message).join(', ') || 'Payment failed';
        setError(errorMessage);
        onPaymentError?.(result.errors || []);
      }
    } catch (err: unknown) {
      console.error('Payment error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Payment processing failed';
      setError(errorMessage);
      onPaymentError?.(err instanceof Error ? err : new Error('Payment processing failed'));
    } finally {
      setIsLoading(false);
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount / 100); // Square uses cents
  };

  if (success) {
    return (
      <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <CardContent sx={{ textAlign: 'center', py: 4 }}>
          <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Payment Successful!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your payment of {formatAmount(amount)} has been processed successfully.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ mt: 3 }}
            onClick={() => {
              setSuccess(false);
              setPaymentDetails({
                cardholderName: '',
                email: '',
                amount: amount,
                description: 'Course Payment'
              });
            }}
          >
            Make Another Payment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardHeader
        title="Secure Payment"
        subheader="Complete your course enrollment"
        avatar={<CreditCard />}
      />
      <CardContent>
        <Grid container spacing={3}>
           {/* Payment Summary */}
           <Grid size={{ xs: 12 }}>
            <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="h6" gutterBottom>
                Payment Summary
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography>Course Fee:</Typography>
                <Typography>{formatAmount(amount)}</Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">{formatAmount(amount)}</Typography>
              </Box>
            </Box>
          </Grid>
 
           {/* Customer Information */}
           <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Cardholder Name"
              value={paymentDetails.cardholderName}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
              required
            />
          </Grid>
             <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={paymentDetails.email}
              onChange={(e) => setPaymentDetails(prev => ({ ...prev, email: e.target.value }))}
              required
            />
          </Grid>
 
           {/* Square Card Form */}
           <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle1" gutterBottom>
              Card Information
            </Typography>
            <Box 
              id="card-container"
              sx={{ 
                border: '1px solid #e0e0e0',
                borderRadius: 1,
                p: 2,
                minHeight: 60,
                bgcolor: 'background.paper'
              }}
            />
          </Grid>
 
           {/* Security Notice */}
           <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Lock sx={{ fontSize: 16, color: 'success.main' }} />
              <Typography variant="caption" color="text.secondary">
                Your payment information is encrypted and secure
              </Typography>
            </Box>
            <Chip 
              label="Sandbox Environment" 
              color="warning" 
              size="small" 
              sx={{ mb: 2 }}
            />
          </Grid>

          {/* Error Display */}
           {error && (
             <Grid size={{ xs: 12 }}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}

          {/* Payment Button */}
           <Grid size={{ xs: 12 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handlePayment}
              disabled={isLoading || !cardButton}
              startIcon={isLoading ? <CircularProgress size={20} /> : <CreditCard />}
              sx={{ py: 1.5 }}
            >
              {isLoading ? 'Processing...' : `Pay ${formatAmount(amount)}`}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}