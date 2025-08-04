import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useTheme } from '../hooks/useTheme';
// import { mockDataService } from '../services/mockDataService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'TEACHER' | 'STUDENT' | 'PARENT';
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  joinDate: string;
  lastActive: string;
}

const UserDirectory: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to fetch users
        // const response = await fetch('/api/users');
        // const usersData = await response.json();
        
        // Temporary empty array until backend is ready
        const usersData: User[] = [];
        
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === '' || user.role === selectedRole;
    const matchesStatus = selectedStatus === '' || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return '#ef4444';
      case 'TEACHER': return '#3b82f6';
      case 'STUDENT': return '#10b981';
      case 'PARENT': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return '#10b981';
      case 'INACTIVE': return '#6b7280';
      case 'PENDING': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, color: isDarkMode ? '#f1f5f9' : '#1e293b' }}>
        User Directory
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, color: isDarkMode ? '#94a3b8' : '#64748b' }}>
        View all users in the system (read-only access)
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: '300px' } }}>
            <TextField
              fullWidth
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& fieldset': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                },
                '& .MuiInputBase-input': {
                  color: isDarkMode ? '#f1f5f9' : '#1f2937',
                },
              }}
            />
          </Box>
          <Box sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Role</InputLabel>
              <Select
                value={selectedRole}
                label="Role"
                onChange={(e) => setSelectedRole(e.target.value)}
                sx={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  },
                }}
              >
                <MenuItem value="">All Roles</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="TEACHER">Teacher</MenuItem>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="PARENT">Parent</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: { xs: '100%', md: '200px' } }}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: isDarkMode ? '#94a3b8' : '#64748b' }}>Status</InputLabel>
              <Select
                value={selectedStatus}
                label="Status"
                onChange={(e) => setSelectedStatus(e.target.value)}
                sx={{
                  backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#475569' : '#d1d5db',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDarkMode ? '#64748b' : '#9ca3af',
                  },
                  '& .MuiSelect-select': {
                    color: isDarkMode ? '#f1f5f9' : '#1f2937',
                  },
                }}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Users List */}
      {filteredUsers.length === 0 ? (
        <Alert severity="info" sx={{ mt: 2 }}>
          No users found matching your criteria.
        </Alert>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode 
                    ? '0 10px 25px rgba(0, 0, 0, 0.3)' 
                    : '0 10px 25px rgba(0, 0, 0, 0.1)',
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      mr: 2,
                      backgroundColor: getRoleColor(user.role),
                    }}
                  >
                    <PersonIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: isDarkMode ? '#f1f5f9' : '#1e293b',
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDarkMode ? '#94a3b8' : '#64748b',
                      }}
                    >
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={user.role}
                    size="small"
                    sx={{
                      backgroundColor: getRoleColor(user.role),
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      backgroundColor: getStatusColor(user.status),
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      mb: 0.5,
                    }}
                  >
                    Joined: {new Date(user.joinDate).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                    }}
                  >
                    Last Active: {new Date(user.lastActive).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserDirectory;