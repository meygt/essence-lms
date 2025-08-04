import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Divider,


  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  School,
  Schedule,
  Star,
  Person,

  ShoppingCart,
  CheckCircle,
  VideoLibrary,
  Quiz,
  Assignment,
  Close,
  CreditCard,
  AccountBalance
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';
import SquarePayment from '../components/payments/SquarePayment';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  category: string;
  level: string;
  duration: string;
  price: number;
  students: number;
  rating: number;
  status: string;
  thumbnail: string;
  lessons: number;
  quizzes: number;
  assignments: number;
  schedule?: string;
  startDate?: string;
  endDate?: string;
}

interface EnrollmentData {
  studentName: string;
  studentEmail: string;
  parentName?: string;
  parentEmail?: string;
  phone: string;
  emergencyContact: string;
  specialRequirements?: string;
}

interface PaymentResult {
  token: string;
  details: Record<string, unknown>;
  amount: number;
  currency: string;
  timestamp: string;
}

interface SquareError {
  message: string;
  type: string;
}

// Initial empty courses - would come from API in real application
const initialCourses: Course[] = [];

const steps = ['Course Selection', 'Student Information', 'Payment', 'Confirmation'];

function CourseEnrollmentContent() {
  const { user } = useUser();
  const [courses] = useState<Course[]>(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openEnrollDialog, setOpenEnrollDialog] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentData>({
    studentName: '',
    studentEmail: '',
    parentName: '',
    parentEmail: '',
    phone: '',
    emergencyContact: '',
    specialRequirements: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const [error, setError] = useState('');

  // Check if user is student or parent (not admin)
  const canEnroll = user?.role === 'STUDENT' || user?.role === 'PARENT';

  useEffect(() => {
    if (user?.role === 'STUDENT') {
      setEnrollmentData(prev => ({
        ...prev,
        studentName: `${user.firstName} ${user.lastName}`,
        studentEmail: user.email
      }));
    }
  }, [user]);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel && course.status === 'Published';
  });

  const handleEnrollClick = (course: Course) => {
    if (!canEnroll) {
      setError('Only students and parents can enroll in courses.');
      return;
    }
    setSelectedCourse(course);
    setActiveStep(0);
    setOpenEnrollDialog(true);
    setError('');
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validate enrollment data
      if (!enrollmentData.studentName || !enrollmentData.studentEmail || !enrollmentData.phone) {
        setError('Please fill in all required fields.');
        return;
      }
      if (user?.role === 'PARENT' && (!enrollmentData.parentName || !enrollmentData.parentEmail)) {
        setError('Parent information is required.');
        return;
      }
    }
    setError('');
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentSuccess = (result: PaymentResult) => {
    console.log('Payment successful:', result);
    setPaymentProcessing(false);

    setActiveStep(3);
  };

  const handlePaymentError = (error: SquareError[] | Error) => {
    console.error('Payment failed:', error);
    setPaymentProcessing(false);
    const errorMessage = Array.isArray(error) ? error.map(e => e.message).join(', ') : error.message;
    setError(`Payment failed: ${errorMessage}. Please try again.`);
  };

  const handleCloseDialog = () => {
    setOpenEnrollDialog(false);
    setSelectedCourse(null);
    setActiveStep(0);
    setEnrollmentData({
      studentName: user?.role === 'STUDENT' ? `${user.firstName} ${user.lastName}` : '',
      studentEmail: user?.role === 'STUDENT' ? user.email : '',
      parentName: '',
      parentEmail: '',
      phone: '',
      emergencyContact: '',
      specialRequirements: ''
    });
    setPaymentMethod('card');
    setPaymentProcessing(false);

    setError('');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Course Details
            </Typography>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {selectedCourse?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {selectedCourse?.description}
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Person sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.instructor}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Schedule sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.duration}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <School sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.level}</Typography>
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <VideoLibrary sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.lessons} Lessons</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Quiz sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.quizzes} Quizzes</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Assignment sx={{ mr: 1, fontSize: 20 }} />
                      <Typography variant="body2">{selectedCourse?.assignments} Assignments</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h4" color="primary">
                    ${selectedCourse?.price}
                  </Typography>
                  <Chip
                    icon={<Star />}
                    label={`${selectedCourse?.rating} (${selectedCourse?.students} students)`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Student Information
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Student Name *"
                  value={enrollmentData.studentName}
                  onChange={(e) => setEnrollmentData({...enrollmentData, studentName: e.target.value})}
                  disabled={user?.role === 'STUDENT'}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Student Email *"
                  type="email"
                  value={enrollmentData.studentEmail}
                  onChange={(e) => setEnrollmentData({...enrollmentData, studentEmail: e.target.value})}
                  disabled={user?.role === 'STUDENT'}
                />
              </Grid>
              {user?.role === 'PARENT' && (
                <>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Parent Name *"
                      value={enrollmentData.parentName}
                      onChange={(e) => setEnrollmentData({...enrollmentData, parentName: e.target.value})}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Parent Email *"
                      type="email"
                      value={enrollmentData.parentEmail}
                      onChange={(e) => setEnrollmentData({...enrollmentData, parentEmail: e.target.value})}
                    />
                  </Grid>
                </>
              )}
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number *"
                  value={enrollmentData.phone}
                  onChange={(e) => setEnrollmentData({...enrollmentData, phone: e.target.value})}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Emergency Contact *"
                  value={enrollmentData.emergencyContact}
                  onChange={(e) => setEnrollmentData({...enrollmentData, emergencyContact: e.target.value})}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Special Requirements (Optional)"
                  multiline
                  rows={3}
                  value={enrollmentData.specialRequirements}
                  onChange={(e) => setEnrollmentData({...enrollmentData, specialRequirements: e.target.value})}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Payment Information
            </Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Course: {selectedCourse?.title}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Duration: {selectedCourse?.duration}</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">Total Amount:</Typography>
                  <Typography variant="h6" color="primary">
                    ${selectedCourse?.price}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Payment Method</InputLabel>
              <Select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                label="Payment Method"
              >
                <MenuItem value="card">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreditCard sx={{ mr: 1 }} />
                    Credit/Debit Card
                  </Box>
                </MenuItem>
                <MenuItem value="bank">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBalance sx={{ mr: 1 }} />
                    Bank Transfer
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {paymentMethod === 'card' && (
              <SquarePayment
                amount={selectedCourse?.price || 0}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            )}

            {paymentMethod === 'bank' && (
              <Alert severity="info">
                <Typography variant="body2">
                  Bank transfer instructions will be provided after enrollment confirmation.
                  Please proceed to complete your enrollment.
                </Typography>
              </Alert>
            )}
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Enrollment Successful!
            </Typography>
            <Typography variant="body1" paragraph>
              Congratulations! You have successfully enrolled in {selectedCourse?.title}.
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              You will receive a confirmation email shortly with course access details and schedule information.
            </Typography>
            <Alert severity="success" sx={{ mt: 2 }}>
              Course starts on {selectedCourse?.startDate} - {selectedCourse?.schedule}
            </Alert>
          </Box>
        );
      default:
        return null;
    }
  };

  if (!canEnroll) {
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Alert severity="warning">
          <Typography variant="h6">Access Restricted</Typography>
          <Typography>
            Course enrollment is only available for students and parents. 
            Please contact an administrator if you need assistance.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Course Enrollment
        </Typography>
        <Chip
          icon={<Person />}
          label={`Welcome, ${user?.firstName} ${user?.lastName}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="Quran Studies">Quran Studies</MenuItem>
                <MenuItem value="Language">Language</MenuItem>
                <MenuItem value="Islamic Studies">Islamic Studies</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Level</InputLabel>
              <Select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                label="Level"
              >
                <MenuItem value="all">All Levels</MenuItem>
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Intermediate">Intermediate</MenuItem>
                <MenuItem value="Advanced">Advanced</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Course Grid */}
      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={course.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }} />
                  <Typography variant="body2">{course.instructor}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Schedule sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2">{course.schedule}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Chip label={course.level} size="small" />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star sx={{ color: 'gold', fontSize: 16, mr: 0.5 }} />
                    <Typography variant="body2">{course.rating}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" color="primary">
                    ${course.price}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    onClick={() => handleEnrollClick(course)}
                  >
                    Enroll Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {courses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <School sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Courses Available
          </Typography>
          <Typography variant="body2" color="text.secondary">
            There are currently no courses available for enrollment. Please check back later.
          </Typography>
        </Box>
      ) : filteredCourses.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <School sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Courses Found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            No courses match your current search criteria. Try adjusting your filters.
          </Typography>
        </Box>
      ) : null}

      {/* Enrollment Dialog */}
      <Dialog
        open={openEnrollDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Enroll in Course
            </Typography>
            <IconButton onClick={handleCloseDialog}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {renderStepContent(activeStep)}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleCloseDialog}
            >
              Close
            </Button>
          ) : activeStep === 2 && paymentMethod === 'card' ? (
            paymentProcessing ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography>Processing...</Typography>
              </Box>
            ) : null
          ) : (
            <Button
              variant="contained"
              onClick={activeStep === 2 && paymentMethod === 'bank' ? () => handlePaymentSuccess({ token: 'bank-transfer', details: {}, amount: selectedCourse?.price || 0, currency: 'USD', timestamp: new Date().toISOString() }) : handleNext}
            >
              {activeStep === 2 && paymentMethod === 'bank' ? 'Complete Enrollment' : 'Next'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function CourseEnrollment() {
  const { user } = useUser();

  // Restrict access to students and parents only
  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please log in to access course enrollment.
        </Typography>
      </Box>
    );
  }

  if (user.role !== 'STUDENT' && user.role !== 'PARENT') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Course enrollment is only available for students and parents.
        </Typography>
      </Box>
    );
  }

  return <CourseEnrollmentContent />;
}