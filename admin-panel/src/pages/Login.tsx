import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  Link,
  Chip,
  Stack,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email as EmailIcon,
  Lock as LockIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  SupervisorAccount as AdminIcon,
  Groups as ParentIcon,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [selectedRole, setSelectedRole] = useState('Student');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const roles = [
    { label: 'Student', icon: <PersonIcon />, color: '#22c55e' },
    { label: 'Parent', icon: <ParentIcon />, color: '#8b5cf6' },
    { label: 'Staff', icon: <AdminIcon />, color: '#f59e0b' },
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [user, navigate, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password, rememberMe);
      if (success) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch {
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            maxWidth: { xs: '320px', sm: '360px', md: '400px' },
            mx: 2,
          }}
        >
          <CardContent sx={{ p: 6 }}>
            {/* Logo and Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)',
                }}
              >
                <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography 
                variant="h4" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: 1, 
                  color: '#22c55e',
                  fontSize: '2rem'
                }}
              >
                Essence Academy
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#94a3b8',
                  fontSize: '0.95rem'
                }}
              >
                Our Best Education
              </Typography>
            </Box>

            {/* Welcome Back */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                  fontWeight: 600, 
                  color: 'white',
                  mb: 1
                }}
              >
                Welcome Back
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#94a3b8'
                }}
              >
                Sign in to continue your learning journey
              </Typography>
            </Box>

            {/* Role Selection */}
            <Box sx={{ mb: 4 }}>
              <Stack direction="row" spacing={1} justifyContent="center">
                {roles.map((role) => (
                  <Chip
                    key={role.label}
                    icon={role.icon}
                    label={role.label}
                    onClick={() => setSelectedRole(role.label)}
                    variant={selectedRole === role.label ? 'filled' : 'outlined'}
                    sx={{
                      px: 2,
                      py: 1,
                      height: 'auto',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      backgroundColor: selectedRole === role.label ? role.color : 'transparent',
                      color: selectedRole === role.label ? 'white' : '#94a3b8',
                      borderColor: selectedRole === role.label ? role.color : '#475569',
                      '&:hover': {
                        backgroundColor: selectedRole === role.label ? role.color : 'rgba(148, 163, 184, 0.1)',
                        borderColor: role.color,
                      },
                      '& .MuiChip-icon': {
                        color: selectedRole === role.label ? 'white' : '#94a3b8',
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>

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

              <TextField
                fullWidth
                placeholder="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
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

              {/* Remember Me */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
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
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => alert('Forgot password functionality coming soon!')}
                  sx={{ 
                    color: '#22c55e', 
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

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
                {loading ? 'Signing In...' : 'Sign In'}
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
                  Don't have an account?{' '}
                  <Link
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      color: '#22c55e',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Sign Up
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

export default Login;