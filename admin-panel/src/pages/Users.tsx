// PASTE THE ENTIRE USERS.TSX CODE HERE (INCLUDING IMPORTS AND ALL STATE/FUNCTIONS)
// Make sure to paste the version of Users.tsx that currently has the problem,
// ideally the one with the <Container> wrapper if you left it in.
// If you reverted the <Container> wrapper, paste the version that doesn't have it.
// The most recent version you provided should be good.
// It's crucial for Claude to see the exact state of the code.

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  phone: string;
  joinDate: string;
}
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  FamilyRestroom as FamilyRestroomIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
} from '@mui/icons-material';

const Users: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [roleFilter, setRoleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showError, setShowError] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    // Student specific
    grade: '',
    parentName: '',
    parentEmail: '',
    parentPhone: '',
    emergencyContact: '',
    medicalInfo: '',
    // Teacher specific
    subject: '',
    qualification: '',
    experience: '',
    salary: '',
    // Parent specific
    childrenNames: '',
    occupation: '',
    address: '',
    // Admin specific
    department: '',
    permissions: [] as string[],
  });

  // Handle URL query parameters for filtering
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      switch (filterParam.toLowerCase()) {
        case 'students':
          setRoleFilter('Student');
          break;
        case 'teachers':
          setRoleFilter('Teacher');
          break;
        case 'parents':
          setRoleFilter('Parent');
          break;
        case 'administrators':
          setRoleFilter('Administrator');
          break;
        default:
          setRoleFilter('All');
      }
    }

    const actionParam = searchParams.get('action');
    if (actionParam === 'add') {
      setShowError(true); // Show demo error for add action
    }
  }, [searchParams]);

  const users = [
    { id: 1, name: 'Ahmad Hassan', email: 'ahmad.hassan@essenceacademy.com', role: 'Student', status: 'Active', phone: '+1-555-0101', joinDate: '2024-01-15' },
    { id: 2, name: 'Sheikh Omar Al-Qari', email: 'sheikh.omar@essenceacademy.com', role: 'Teacher', status: 'Active', phone: '+1-555-0102', joinDate: '2023-09-10' },
    { id: 3, name: 'Dr. Fatima Rahman', email: 'dr.fatima@essenceacademy.com', role: 'Administrator', status: 'Active', phone: '+1-555-0103', joinDate: '2023-01-01' },
    { id: 4, name: 'Aisha Abdullah', email: 'aisha.abdullah@essenceacademy.com', role: 'Student', status: 'Active', phone: '+1-555-0104', joinDate: '2024-02-20' },
    { id: 5, name: 'Ustadh Yusuf Ibrahim', email: 'ustadh.yusuf@essenceacademy.com', role: 'Teacher', status: 'Active', phone: '+1-555-0105', joinDate: '2023-08-15' },
    { id: 6, name: 'Maryam Ali', email: 'maryam.ali@essenceacademy.com', role: 'Student', status: 'Inactive', phone: '+1-555-0106', joinDate: '2023-12-01' },
    { id: 7, name: 'Hafiz Muhammad Salim', email: 'hafiz.salim@essenceacademy.com', role: 'Teacher', status: 'Active', phone: '+1-555-0107', joinDate: '2023-07-20' },
    { id: 8, name: 'Khadija Mahmoud', email: 'khadija.mahmoud@essenceacademy.com', role: 'Student', status: 'Active', phone: '+1-555-0108', joinDate: '2024-01-30' },
    { id: 9, name: 'Abdullah Al-Rashid', email: 'abdullah.rashid@essenceacademy.com', role: 'Parent', status: 'Active', phone: '+1-555-0109', joinDate: '2024-02-01' },
    { id: 10, name: 'Zahra Malik', email: 'zahra.malik@essenceacademy.com', role: 'Parent', status: 'Active', phone: '+1-555-0110', joinDate: '2024-01-25' },
  ];

  // Filter users based on role and search term
  const filteredUsers = users.filter(user => {
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setViewDialog(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialog(true);
    // Show error for demo
    setTimeout(() => {
      setShowError(true);
      setEditDialog(false);
    }, 1000);
  };

  const handleDeleteUser = () => {
    // Show error for demo
    setShowError(true);
  };

  const handleAddUserSubmit = () => {
    setAddUserDialogOpen(false);
    setSelectedRole('');
    setNewUserData({
      name: '',
      email: '',
      phone: '',
      role: '',
      grade: '',
      parentName: '',
      parentEmail: '',
      parentPhone: '',
      emergencyContact: '',
      medicalInfo: '',
      subject: '',
      qualification: '',
      experience: '',
      salary: '',
      childrenNames: '',
      occupation: '',
      address: '',
      department: '',
      permissions: [],
    });
    setShowError(true);
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setNewUserData({ ...newUserData, role });
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setNewUserData({ ...newUserData, [field]: value });
  };

  const getRoleColor = (role: string): 'error' | 'warning' | 'primary' | 'default' => {
    switch (role) {
      case 'Admin': return 'error';
      case 'Teacher': return 'warning';
      case 'Student': return 'primary';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string): 'success' | 'default' => {
    return status === 'Active' ? 'success' : 'default';
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {showError && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setShowError(false)}
        >
          This feature is not yet implemented. This is a demo interface.
        </Alert>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Users Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setAddUserDialogOpen(true)}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
            },
          }}
        >
          Add User
        </Button>
      </Box>

      {/* Filters and Search */}
      <Paper sx={{ p: 2, mb: 3, background: 'rgba(255, 255, 255, 0.05)', width: '100%', maxWidth: '100%' }}>
        <Grid container spacing={2} alignItems="center" sx={{ width: '100%', margin: 0 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Filter by Role</InputLabel>
              <Select
                value={roleFilter}
                label="Filter by Role"
                onChange={(e) => {
                  const newFilter = e.target.value;
                  setRoleFilter(newFilter);
                  // Update URL params when filter changes
                  const newParams = new URLSearchParams(searchParams);
                  if (newFilter === 'All') {
                    newParams.delete('filter');
                  } else {
                    newParams.set('filter', newFilter.toLowerCase() + 's');
                  }
                  setSearchParams(newParams);
                }}
                startAdornment={<FilterIcon sx={{ mr: 1, color: 'text.secondary' }} />}
              >
                <MenuItem value="All">All Roles</MenuItem>
                <MenuItem value="Student">Students</MenuItem>
                <MenuItem value="Parent">Parents</MenuItem>
                <MenuItem value="Teacher">Teachers</MenuItem>
                <MenuItem value="Administrator">Administrators</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              size="small"
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
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 12, md: 5 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredUsers.length} of {users.length} users
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 600, overflowX: 'auto', width: '100%' }}>
          <Table stickyHeader sx={{ minWidth: 650, width: '100%' }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={getRoleColor(user.role)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleViewUser(user)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="secondary"
                      onClick={() => handleEditUser(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteUser()}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View User Dialog */}
      <Dialog open={viewDialog} onClose={() => setViewDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Name</Typography>
                <Typography variant="body1">{selectedUser.name}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                <Typography variant="body1">{selectedUser.email}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                 <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                <Typography variant="body1">{selectedUser.phone}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                 <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                 <Chip label={selectedUser.role} color={getRoleColor(selectedUser.role)} size="small" />
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                 <Typography variant="subtitle2" color="text.secondary">Status</Typography>
                 <Chip label={selectedUser.status} color={getStatusColor(selectedUser.status)} size="small" />
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="subtitle2" color="text.secondary">Join Date</Typography>
                <Typography variant="body1">{selectedUser.joinDate}</Typography>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialog} onClose={() => setEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Name"
                  defaultValue={selectedUser.name}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue={selectedUser.email}
                  variant="outlined"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                 <TextField
                   fullWidth
                   label="Phone"
                   defaultValue={selectedUser.phone}
                   variant="outlined"
                 />
               </Grid>
               <Grid size={{ xs: 12, sm: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select defaultValue={selectedUser.role} label="Role">
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Teacher">Teacher</MenuItem>
                    <MenuItem value="Administrator">Administrator</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={() => selectedUser && handleEditUser(selectedUser)}>Save Changes</Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={addUserDialogOpen} onClose={() => setAddUserDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {!selectedRole ? 'Add New User - Select Role' : `Add New ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`}
        </DialogTitle>
        <DialogContent>
          {!selectedRole ? (
            // Role Selection Step
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                What type of user would you like to add?
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer', 
                      border: '2px solid transparent',
                      '&:hover': { boxShadow: 4, borderColor: 'primary.main' }
                    }}
                    onClick={() => handleRoleSelect('student')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <SchoolIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Student</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add a new student to the learning management system
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer', 
                      border: '2px solid transparent',
                      '&:hover': { boxShadow: 4, borderColor: 'success.main' }
                    }}
                    onClick={() => handleRoleSelect('teacher')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <PersonIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Teacher</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add a new teacher or instructor to the system
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer', 
                      border: '2px solid transparent',
                      '&:hover': { boxShadow: 4, borderColor: 'warning.main' }
                    }}
                    onClick={() => handleRoleSelect('parent')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <FamilyRestroomIcon sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Parent</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add a parent or guardian to monitor student progress
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer', 
                      border: '2px solid transparent',
                      '&:hover': { boxShadow: 4, borderColor: 'error.main' }
                    }}
                    onClick={() => handleRoleSelect('admin')}
                  >
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <AdminPanelSettingsIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
                      <Typography variant="h6" gutterBottom>Admin</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Add an administrator with system management access
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          ) : (
            // User Details Form
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                {/* Common Fields */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={newUserData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={newUserData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={newUserData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    variant="outlined"
                    required
                  />
                </Grid>

                {/* Student Specific Fields */}
                {selectedRole === 'student' && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Grade Level</InputLabel>
                        <Select 
                          value={newUserData.grade} 
                          onChange={(e) => handleInputChange('grade', e.target.value)}
                          label="Grade Level"
                        >
                          <MenuItem value="kindergarten">Kindergarten</MenuItem>
                          <MenuItem value="grade1">Grade 1</MenuItem>
                          <MenuItem value="grade2">Grade 2</MenuItem>
                          <MenuItem value="grade3">Grade 3</MenuItem>
                          <MenuItem value="grade4">Grade 4</MenuItem>
                          <MenuItem value="grade5">Grade 5</MenuItem>
                          <MenuItem value="grade6">Grade 6</MenuItem>
                          <MenuItem value="grade7">Grade 7</MenuItem>
                          <MenuItem value="grade8">Grade 8</MenuItem>
                          <MenuItem value="grade9">Grade 9</MenuItem>
                          <MenuItem value="grade10">Grade 10</MenuItem>
                          <MenuItem value="grade11">Grade 11</MenuItem>
                          <MenuItem value="grade12">Grade 12</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Parent/Guardian Name"
                        value={newUserData.parentName}
                        onChange={(e) => handleInputChange('parentName', e.target.value)}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Parent Email"
                        type="email"
                        value={newUserData.parentEmail}
                        onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Parent Phone"
                        value={newUserData.parentPhone}
                        onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Emergency Contact"
                        value={newUserData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Medical Information"
                        value={newUserData.medicalInfo}
                        onChange={(e) => handleInputChange('medicalInfo', e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        placeholder="Any allergies, medications, or medical conditions"
                      />
                    </Grid>
                  </>
                )}

                {/* Teacher Specific Fields */}
                {selectedRole === 'teacher' && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Subject/Department</InputLabel>
                        <Select 
                          value={newUserData.subject} 
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          label="Subject/Department"
                        >
                          <MenuItem value="quran">Quran Studies</MenuItem>
                          <MenuItem value="arabic">Arabic Language</MenuItem>
                          <MenuItem value="islamic-studies">Islamic Studies</MenuItem>
                          <MenuItem value="tajweed">Tajweed</MenuItem>
                          <MenuItem value="hadith">Hadith</MenuItem>
                          <MenuItem value="fiqh">Fiqh</MenuItem>
                          <MenuItem value="mathematics">Mathematics</MenuItem>
                          <MenuItem value="science">Science</MenuItem>
                          <MenuItem value="english">English</MenuItem>
                          <MenuItem value="history">History</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Qualification"
                        value={newUserData.qualification}
                        onChange={(e) => handleInputChange('qualification', e.target.value)}
                        variant="outlined"
                        placeholder="e.g., Bachelor's in Islamic Studies"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Years of Experience"
                        type="number"
                        value={newUserData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                        variant="outlined"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Monthly Salary"
                        type="number"
                        value={newUserData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                        variant="outlined"
                        InputProps={{
                          startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                      />
                    </Grid>
                  </>
                )}

                {/* Parent Specific Fields */}
                {selectedRole === 'parent' && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Children Names"
                        value={newUserData.childrenNames}
                        onChange={(e) => handleInputChange('childrenNames', e.target.value)}
                        variant="outlined"
                        placeholder="Names of children in the school"
                        required
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Occupation"
                        value={newUserData.occupation}
                        onChange={(e) => handleInputChange('occupation', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        fullWidth
                        label="Home Address"
                        value={newUserData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        variant="outlined"
                        multiline
                        rows={2}
                        required
                      />
                    </Grid>
                  </>
                )}

                {/* Admin Specific Fields */}
                {selectedRole === 'admin' && (
                  <>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <FormControl fullWidth>
                        <InputLabel>Department</InputLabel>
                        <Select 
                          value={newUserData.department} 
                          onChange={(e) => handleInputChange('department', e.target.value)}
                          label="Department"
                        >
                          <MenuItem value="academic">Academic Affairs</MenuItem>
                          <MenuItem value="finance">Finance</MenuItem>
                          <MenuItem value="hr">Human Resources</MenuItem>
                          <MenuItem value="it">Information Technology</MenuItem>
                          <MenuItem value="student-affairs">Student Affairs</MenuItem>
                          <MenuItem value="operations">Operations</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        System Permissions
                      </Typography>
                      <FormGroup row>
                        {['User Management', 'Course Management', 'Financial Reports', 'System Settings', 'Attendance Management', 'Grade Management'].map((permission) => (
                          <FormControlLabel
                            key={permission}
                            control={
                              <Checkbox
                                checked={newUserData.permissions.includes(permission)}
                                onChange={(e) => {
                                  const permissions = e.target.checked
                                    ? [...newUserData.permissions, permission]
                                    : newUserData.permissions.filter(p => p !== permission);
                                  handleInputChange('permissions', permissions);
                                }}
                              />
                            }
                            label={permission}
                          />
                        ))}
                      </FormGroup>
                    </Grid>
                  </>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setAddUserDialogOpen(false);
            setSelectedRole('');
          }}>
            Cancel
          </Button>
          {selectedRole && (
            <Button onClick={() => setSelectedRole('')} sx={{ mr: 1 }}>
              Back to Role Selection
            </Button>
          )}
          {selectedRole && (
            <Button variant="contained" onClick={handleAddUserSubmit}>
              Add {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;