import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  School as SchoolIcon,
  Phone as PhoneIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
    parentEmail: '',
    parentPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    setError('');
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long.');
      setLoading(false);
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions.');
      setLoading(false);
      return;
    }

    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, just show success (replace with actual auth logic)
      alert('Account created successfully! (Demo mode)');
    } catch {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100vw',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: { xs: 2, sm: 3, md: 4 },
        position: 'relative', 
        zIndex: 1 
      }}>
        <Card
          sx={{
            backgroundColor: 'rgba(51, 65, 85, 0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(71, 85, 105, 0.8)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: { xs: '360px', sm: '420px', md: '480px' },
            mx: 2,
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              textAlign: 'center',
              pt: 6,
              pb: 4,
              px: 4,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
            </Box>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: 'white',
                fontSize: { xs: '1.75rem', sm: '2.125rem' }
              }}
            >
              Essence Academy
            </Typography>
            <Typography 
               variant="h6" 
               sx={{ 
                 color: '#22c55e', 
                 fontWeight: 600,
                 mb: 1
               }}
             >
               Student Registration
             </Typography>
             <Typography 
               variant="body2" 
               sx={{ 
                 color: '#94a3b8',
                 maxWidth: '400px',
                 mx: 'auto'
               }}
             >
               Join our learning community and start your educational journey
             </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  '& .MuiAlert-icon': {
                    color: '#ef4444'
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <TextField
                fullWidth
                placeholder="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#475569',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#64748b',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#22c55e',
                    },
                    '& input': {
                      color: 'white',
                      '&::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl fullWidth required>
                  <InputLabel sx={{ color: '#94a3b8' }}>Gender</InputLabel>
                  <Select
                    value={formData.gender}
                    label="Gender"
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    sx={{
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      color: 'white',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#64748b',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#22c55e',
                      },
                      '& .MuiSvgIcon-root': {
                        color: '#94a3b8',
                      },
                    }}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          backgroundColor: '#475569',
                          '& .MuiMenuItem-root': {
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#64748b',
                            },
                            '&.Mui-selected': {
                              backgroundColor: '#22c55e',
                              '&:hover': {
                                backgroundColor: '#16a34a',
                              },
                            },
                          },
                        },
                      },
                    }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#94a3b8', 
                    mb: 1,
                    fontWeight: 500
                  }}
                >
                  Date of Birth *
                </Typography>
                <TextField
                  fullWidth
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        fontSize: '1rem',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3, mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{ color: '#94a3b8' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                          sx={{ color: '#94a3b8' }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Parent Information Section */}
              <Typography 
                variant="h6" 
                sx={{ 
                  color: '#94a3b8', 
                  fontWeight: 600, 
                  mb: 2,
                  fontSize: '1.1rem'
                }}
              >
                Parent Information (Optional)
              </Typography>
              
              <TextField
                fullWidth
                placeholder="Parent Email (Optional)"
                name="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={handleChange}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#475569',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#64748b',
                    },
                    '&:hover fieldset': {
                      borderColor: '#94a3b8',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#22c55e',
                    },
                    '& input': {
                      color: 'white',
                      '&::placeholder': {
                        color: '#94a3b8',
                        opacity: 1,
                      },
                    },
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: '#94a3b8' }} />
                    </InputAdornment>
                  ),
                }}
              />

              {formData.parentEmail && (
                <TextField
                  fullWidth
                  placeholder="Parent Password"
                  name="parentPassword"
                  type="password"
                  value={formData.parentPassword}
                  onChange={handleChange}
                  required={!!formData.parentEmail}
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#475569',
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#64748b',
                      },
                      '&:hover fieldset': {
                        borderColor: '#94a3b8',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#22c55e',
                      },
                      '& input': {
                        color: 'white',
                        '&::placeholder': {
                          color: '#94a3b8',
                          opacity: 1,
                        },
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: '#94a3b8' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    name="agreeToTerms"
                    sx={{
                      color: '#94a3b8',
                      '&.Mui-checked': {
                        color: '#22c55e',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                    I agree to the{' '}
                    <Link href="#" sx={{ color: '#22c55e', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Terms and Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="#" sx={{ color: '#22c55e', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                sx={{ mb: 4 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mb: 4,
                  py: 2,
                  backgroundColor: '#22c55e',
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#16a34a',
                  },
                  '&:disabled': {
                    backgroundColor: '#64748b',
                  },
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Divider sx={{ mb: 4, borderColor: '#475569' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8', px: 2 }}>
                  or
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                size="large"
                startIcon={<GoogleIcon />}
                sx={{
                  mb: 4,
                  py: 2,
                  borderColor: '#475569',
                  color: '#94a3b8',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#64748b',
                    backgroundColor: 'rgba(148, 163, 184, 0.1)',
                  },
                  fontWeight: 600,
                  textTransform: 'none',
                }}
              >
                Continue with Google
              </Button>

              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                  Already have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    sx={{
                      color: '#22c55e',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        textAlign: 'center', 
        py: 3, 
        px: 2,
        position: 'relative', 
        zIndex: 1,
        borderTop: '1px solid rgba(71, 85, 105, 0.3)'
      }}>
        <Typography variant="body2" sx={{ color: 'rgba(148, 163, 184, 0.8)', fontSize: '0.875rem' }}>
          © 2025 Essence Academy. All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(148, 163, 184, 0.6)', mt: 0.5, fontSize: '0.75rem' }}>
          13441 Ranch Rd 620 N, Austin, TX 78717 • contact@essenceqa.org • +1 (512) 516 7782
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;