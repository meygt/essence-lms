import { useState } from 'react';
import { useUser } from '../hooks/useUser';

// User type definitions
interface BaseUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  avatar: string;
  joinDate: string;
  lastLogin: string;
  location: string;
}

interface Student extends BaseUser {
  role: 'Student';
  courses: string[];
  progress: number;
  parentId: number;
  age: number;
  grade: string;
  totalHours: number;
}

interface Parent extends BaseUser {
  role: 'Parent';
  children: number[];
  subscriptionPlan: string;
  totalSpent: number;
}

interface Staff extends BaseUser {
  role: 'Staff';
  position: string;
  department: string;
  courses: string[];
  students: number;
  rating: number;
}

type User = Student | Parent | Staff;
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tabs,
  Tab,
  ListItemText,
  ListItemIcon,
  Badge,
  Divider,
  Menu,
  MenuItem as MenuItemComponent,
  LinearProgress,
  Grid
} from '@mui/material';
import {
  Edit,
  Delete,
  Visibility,
  Block,
  CheckCircle,
  People,
  PersonAdd,
  School,
  FamilyRestroom,
  Work,
  Email,
  Phone,
  LocationOn,
  MoreVert,
  Search,
  Download,
  Upload,
  Star,
  Assignment,
  TrendingUp
} from '@mui/icons-material';

// Test accounts data - these would come from the API in a real application
const testUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@essenceacademy.com',
    phone: '+1 (555) 000-0001',
    role: 'Staff',
    status: 'Active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-01',
    lastLogin: new Date().toISOString().split('T')[0],
    location: 'System',
    position: 'Administrator',
    department: 'Administration',
    courses: [],
    students: 0,
    rating: 5.0
  },
  {
    id: 2,
    name: 'Teacher User',
    email: 'teacher@essenceacademy.com',
    phone: '+1 (555) 000-0002',
    role: 'Staff',
    status: 'Active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-01',
    lastLogin: new Date().toISOString().split('T')[0],
    location: 'System',
    position: 'Teacher',
    department: 'Education',
    courses: [],
    students: 0,
    rating: 0
  },
  {
    id: 3,
    name: 'Student User',
    email: 'student@essenceacademy.com',
    phone: '+1 (555) 000-0003',
    role: 'Student',
    status: 'Active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-01',
    lastLogin: new Date().toISOString().split('T')[0],
    location: 'System',
    courses: [],
    progress: 0,
    parentId: 4,
    age: 16,
    grade: 'N/A',
    totalHours: 0
  },
  {
    id: 4,
    name: 'Parent User',
    email: 'parent@essenceacademy.com',
    phone: '+1 (555) 000-0004',
    role: 'Parent',
    status: 'Active',
    avatar: '/api/placeholder/40/40',
    joinDate: '2024-01-01',
    lastLogin: new Date().toISOString().split('T')[0],
    location: 'System',
    children: [3],
    subscriptionPlan: 'Basic',
    totalSpent: 0
  }
];

function UserManagementContent() {
  // Initialize all state hooks first
  const [selectedTab, setSelectedTab] = useState(0);
  const [users, setUsers] = useState<User[]>(testUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'create' | 'edit' | 'view'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  // const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards'); // Commented out as not currently used

  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Student',
    status: 'Active',
    location: '',
    position: '',
    department: ''
  });

  const handleOpenDialog = (type: 'create' | 'edit' | 'view', user?: User) => {
    setDialogType(type);
    if (user) {
      setSelectedUser(user);
      setUserForm({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        location: user.location,
        position: user.role === 'Staff' ? (user as Staff).position : '',
        department: user.role === 'Staff' ? (user as Staff).department : ''
      });
    } else {
      setUserForm({
        name: '',
        email: '',
        phone: '',
        role: 'Student',
        status: 'Active',
        location: '',
        position: '',
        department: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleSaveUser = () => {
    if (dialogType === 'create') {
      const baseUser = {
        id: users.length + 1,
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
        status: userForm.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastLogin: new Date().toISOString().split('T')[0],
        avatar: '/api/placeholder/40/40',
        location: userForm.location
      };
      
      let newUser: User;
      switch (userForm.role) {
        case 'Student':
          newUser = {
            ...baseUser,
            role: 'Student' as const,
            courses: [],
            progress: 0,
            parentId: 0,
            age: 0,
            grade: 'N/A',
            totalHours: 0
          } as Student;
          break;
        case 'Parent':
          newUser = {
            ...baseUser,
            role: 'Parent' as const,
            children: [],
            subscriptionPlan: 'Basic',
            totalSpent: 0
          } as Parent;
          break;
        case 'Staff':
          newUser = {
            ...baseUser,
            role: 'Staff' as const,
            position: userForm.position || '',
            department: userForm.department || '',
            courses: [],
            students: 0,
            rating: 0
          } as Staff;
          break;
        default:
          // Default to Student if role is not recognized
          newUser = {
            ...baseUser,
            role: 'Student' as const,
            courses: [],
            progress: 0,
            parentId: 0,
            age: 0,
            grade: 'N/A',
            totalHours: 0
          } as Student;
      }
      
      setUsers([...users, newUser]);
    } else if (dialogType === 'edit' && selectedUser) {
      setUsers(users.map(user => {
        if (user.id === selectedUser.id) {
          // Create updated user based on role
          const baseUpdate = {
            ...user,
            name: userForm.name,
            email: userForm.email,
            phone: userForm.phone,
            status: userForm.status,
            location: userForm.location
          };
          
          // Handle role-specific updates
          if (user.role === 'Staff') {
            return {
              ...baseUpdate,
              position: userForm.position || (user as Staff).position,
              department: userForm.department || (user as Staff).department
            } as Staff;
          }
          
          return baseUpdate;
        }
        return user;
      }));
    }
    handleCloseDialog();
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    handleCloseMenu();
  };

  const handleToggleStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));
    handleCloseMenu();
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedUserId(null);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role.toLowerCase() === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'Pending': return 'warning';
      default: return 'default';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'Student': return <School />;
      case 'Parent': return <FamilyRestroom />;
      case 'Staff': return <Work />;
      default: return <People />;
    }
  };

  const UserCard = ({ user }: { user: User }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <Box sx={{ 
                  width: 12, 
                  height: 12, 
                  borderRadius: '50%', 
                  bgcolor: user.status === 'Active' ? 'success.main' : 'error.main',
                  border: '2px solid white'
                }} />
              }
            >
              <Avatar src={user.avatar} sx={{ width: 48, height: 48 }}>
                {user.name.split(' ').map((n: string) => n[0]).join('')}
              </Avatar>
            </Badge>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6" noWrap>{user.name}</Typography>
              <Chip 
                icon={getRoleIcon(user.role)}
                label={user.role} 
                size="small" 
                variant="outlined"
              />
            </Box>
          </Box>
          <IconButton 
            size="small"
            onClick={(e) => handleMenuClick(e, user.id)}
          >
            <MoreVert />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Email sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="textSecondary" noWrap>
              {user.email}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Phone sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="textSecondary">
              {user.phone}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="textSecondary">
              {user.location}
            </Typography>
          </Box>
        </Box>

        {user.role === 'Student' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Progress: {user.progress}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={user.progress} 
              sx={{ height: 6, borderRadius: 3 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">Grade: {user.grade}</Typography>
              <Typography variant="caption">{user.totalHours}h studied</Typography>
            </Box>
          </Box>
        )}

        {user.role === 'Staff' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              {user.position} • {user.department}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">{user.students} students</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star sx={{ fontSize: 14, color: 'warning.main', mr: 0.5 }} />
                <Typography variant="caption">{user.rating}</Typography>
              </Box>
            </Box>
          </Box>
        )}

        {user.role === 'Parent' && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Plan: {user.subscriptionPlan}
            </Typography>
            <Typography variant="caption">
              {user.children?.length} child(ren) • ${user.totalSpent} spent
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="caption" color="textSecondary">
            Joined {new Date(user.joinDate).toLocaleDateString()}
          </Typography>
          <Chip 
            label={user.status} 
            color={getStatusColor(user.status) as 'success' | 'error' | 'warning' | 'default'}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );

  const UserDialog = () => (
    <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
      <DialogTitle>
        {dialogType === 'create' ? 'Add New User' : 
         dialogType === 'edit' ? 'Edit User' : 'User Details'}
      </DialogTitle>
      <DialogContent>
        {dialogType === 'view' ? (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box sx={{ textAlign: 'center', mb: 3 }}>
                  <Avatar 
                    src={selectedUser?.avatar} 
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                  >
                    {selectedUser?.name.split(' ').map((n: string) => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h5">{selectedUser?.name}</Typography>
                  <Chip 
                    icon={getRoleIcon(selectedUser?.role || 'Student')}
                    label={selectedUser?.role} 
                    color="primary"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h6" gutterBottom>Contact Information</Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="textSecondary">Email</Typography>
                  <Typography variant="body1">{selectedUser?.email}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="textSecondary">Phone</Typography>
                  <Typography variant="body1">{selectedUser?.phone}</Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="textSecondary">Location</Typography>
                  <Typography variant="body1">{selectedUser?.location}</Typography>
                </Box>
                
                {selectedUser?.role === 'Student' && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Academic Information</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Current Courses</Typography>
                      <Box sx={{ mt: 1 }}>
                        {selectedUser?.courses?.map((course: string, index: number) => (
                          <Chip key={index} label={course} sx={{ mr: 1, mb: 1 }} />
                        ))}
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Overall Progress</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={selectedUser?.progress} 
                        sx={{ mt: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {selectedUser?.progress}% Complete
                      </Typography>
                    </Box>
                  </Box>
                )}

                {selectedUser?.role === 'Staff' && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Professional Information</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Position</Typography>
                      <Typography variant="body1">{selectedUser?.position}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Department</Typography>
                      <Typography variant="body1">{selectedUser?.department}</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="textSecondary">Students</Typography>
                      <Typography variant="body1">{selectedUser?.students}</Typography>
                    </Box>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
               <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                  margin="normal"
                />
              </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  margin="normal"
                />
              </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={userForm.phone}
                  onChange={(e) => setUserForm({...userForm, phone: e.target.value})}
                  margin="normal"
                />
              </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Location"
                  value={userForm.location}
                  onChange={(e) => setUserForm({...userForm, location: e.target.value})}
                  margin="normal"
                />
              </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={userForm.role}
                    label="Role"
                    onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  >
                    <MenuItem value="Student">Student</MenuItem>
                    <MenuItem value="Parent">Parent</MenuItem>
                    <MenuItem value="Staff">Staff</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={userForm.status}
                    label="Status"
                    onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                  >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Inactive">Inactive</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {userForm.role === 'Staff' && (
                <>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Position"
                      value={userForm.position}
                      onChange={(e) => setUserForm({...userForm, position: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Department"
                      value={userForm.department}
                      onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                      margin="normal"
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        {dialogType !== 'view' && (
          <Button onClick={handleSaveUser} variant="contained">
            {dialogType === 'create' ? 'Add User' : 'Save Changes'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );

  const renderUserCards = () => (
    <Box>
      {/* Filters and Search */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
          }}
          sx={{ minWidth: 250 }}
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={filterRole}
            label="Role"
            onChange={(e) => setFilterRole(e.target.value)}
          >
            <MenuItem value="all">All Roles</MenuItem>
            <MenuItem value="student">Students</MenuItem>
            <MenuItem value="parent">Parents</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <MenuItem value="all">All Status</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          startIcon={<Upload />}
          size="small"
        >
          Import
        </Button>
        <Button
          variant="outlined"
          startIcon={<Download />}
          size="small"
        >
          Export
        </Button>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => handleOpenDialog('create')}
          sx={{ ml: 'auto' }}
        >
          Add User
        </Button>
      </Box>

      {/* User Grid */}
      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>

      {filteredUsers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="textSecondary">
            No users found
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}
    </Box>
  );

  const renderUserTable = () => (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">All Users</Typography>
        <Button
          variant="contained"
          startIcon={<PersonAdd />}
          onClick={() => handleOpenDialog('create')}
        >
          Add User
        </Button>
      </Box>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={user.avatar} sx={{ mr: 2 }}>
                      {user.name.split(' ').map((n: string) => n[0]).join('')}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">{user.name}</Typography>
                      <Typography variant="caption" color="textSecondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    icon={getRoleIcon(user.role)}
                    label={user.role} 
                    size="small" 
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{user.phone}</Typography>
                </TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell align="center">
                  <Chip 
                    label={user.status} 
                    color={getStatusColor(user.status) as 'success' | 'error' | 'warning' | 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {new Date(user.lastLogin).toLocaleDateString()}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => handleOpenDialog('view', user)}>
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleOpenDialog('edit', user)}>
                    <Edit />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuClick(e, user.id)}
                  >
                    <MoreVert />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderAnalytics = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Total Students
                </Typography>
                <Typography variant="h4">
                  {users.filter(u => u.role === 'Student').length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <School />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Total Parents
                </Typography>
                <Typography variant="h4">
                  {users.filter(u => u.role === 'Parent').length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <FamilyRestroom />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Staff Members
                </Typography>
                <Typography variant="h4">
                  {users.filter(u => u.role === 'Staff').length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'info.main' }}>
                <Work />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  Active Users
                </Typography>
                <Typography variant="h4">
                  {users.filter(u => u.status === 'Active').length}
                </Typography>
              </Box>
              <Avatar sx={{ bgcolor: 'success.main' }}>
                <CheckCircle />
              </Avatar>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              User Activity Overview
            </Typography>
            <Box sx={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', borderRadius: 1 }}>
              <Typography variant="body1" color="textSecondary">
                📊 User activity charts would be implemented here with a charting library
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab icon={<People />} label="User Cards" />
          <Tab icon={<Assignment />} label="User List" />
          <Tab icon={<TrendingUp />} label="Analytics" />
        </Tabs>
      </Box>

      {selectedTab === 0 && renderUserCards()}
      {selectedTab === 1 && renderUserTable()}
      {selectedTab === 2 && renderAnalytics()}

      <UserDialog />

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItemComponent onClick={() => {
          const user = users.find(u => u.id === selectedUserId);
          if (user) handleOpenDialog('view', user);
        }}>
          <ListItemIcon><Visibility fontSize="small" /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => {
          const user = users.find(u => u.id === selectedUserId);
          if (user) handleOpenDialog('edit', user);
        }}>
          <ListItemIcon><Edit fontSize="small" /></ListItemIcon>
          <ListItemText>Edit User</ListItemText>
        </MenuItemComponent>
        <MenuItemComponent onClick={() => selectedUserId && handleToggleStatus(selectedUserId)}>
          <ListItemIcon><Block fontSize="small" /></ListItemIcon>
          <ListItemText>Toggle Status</ListItemText>
        </MenuItemComponent>
        <Divider />
        <MenuItemComponent 
          onClick={() => selectedUserId && handleDeleteUser(selectedUserId)}
          sx={{ color: 'error.main' }}
        >
          <ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete User</ListItemText>
        </MenuItemComponent>
      </Menu>
    </Box>
  );
}

export default function UserManagement() {
  const { user } = useUser();

  // Check if user is admin
  if (!user || user.role !== 'ADMIN') {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          Access Denied
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          User Management is only available for administrators.
        </Typography>
      </Box>
    );
  }

  return <UserManagementContent />;
}