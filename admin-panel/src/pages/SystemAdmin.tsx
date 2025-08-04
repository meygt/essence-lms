import { useState } from 'react';
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
  Switch,
  FormControlLabel,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  AlertTitle,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  FormGroup,
  Grid
} from '@mui/material';
import {
  Settings,
  Security,
  Notifications,
  Storage,
  Save,
  Download,
  Upload,
  CheckCircle,
  Backup,
  RestoreFromTrash,
  Shield,
  Visibility,
  VisibilityOff,
  MonitorHeart,
  Block as BlockIcon,
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';

// Initial system settings - would be populated from API
const initialSystemSettings = {
  general: {
    siteName: 'EssenceQA LMS',
    siteDescription: 'Islamic Learning Management System',
    timezone: 'UTC',
    language: 'en',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerificationRequired: true
  },
  security: {
    passwordMinLength: 8,
    passwordRequireSpecialChars: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorEnabled: false,
    ipWhitelist: [],
    sslEnabled: true,
    corsEnabled: true
  },
  notifications: {
    emailEnabled: false,
    smsEnabled: false,
    pushEnabled: false,
    emailProvider: 'smtp',
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    smsProvider: 'twilio',
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioPhoneNumber: ''
  },
  storage: {
    provider: 'local',
    maxFileSize: 10,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'mp4', 'mp3', 'jpg', 'png'],
    s3Bucket: '',
    s3Region: '',
    s3AccessKey: '',
    s3SecretKey: '',
    cloudinaryCloudName: '',
    cloudinaryApiKey: '',
    cloudinaryApiSecret: ''
  },
  backup: {
    autoBackupEnabled: false,
    backupFrequency: 'daily',
    backupRetention: 30,
    backupLocation: 'local',
    lastBackup: null
  }
};

// Initial system health - would be populated from API
const initialSystemHealth = {
  status: 'unknown',
  uptime: '0 days, 0 hours',
  cpuUsage: 0,
  memoryUsage: 0,
  diskUsage: 0,
  activeUsers: 0,
  totalRequests: 0,
  errorRate: 0,
  responseTime: 0
};

// Empty audit logs - would be populated from API
interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  ipAddress: string;
  status: 'success' | 'error';
}

const initialAuditLogs: AuditLog[] = [];

function SystemAdminContent() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [settings, setSettings] = useState(initialSystemSettings);
  const [showPassword, setShowPassword] = useState(false);
  const [openBackupDialog, setOpenBackupDialog] = useState(false);
  const [openRestoreDialog, setOpenRestoreDialog] = useState(false);

  const handleSettingChange = (section: string, key: string, value: string | number | boolean | string[]) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    // In a real app, this would save to the backend
    console.log('Saving settings:', settings);
  };

  const handleBackup = () => {
    // In a real app, this would trigger a backup
    console.log('Creating backup...');
    setOpenBackupDialog(false);
  };

  const handleRestore = () => {
    // In a real app, this would restore from backup
    console.log('Restoring from backup...');
    setOpenRestoreDialog(false);
  };

  const renderGeneralSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Site Configuration
            </Typography>
            <TextField
              fullWidth
              label="Site Name"
              value={settings.general.siteName}
              onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Site Description"
              value={settings.general.siteDescription}
              onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
              margin="normal"
              multiline
              rows={2}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Timezone</InputLabel>
              <Select
                value={settings.general.timezone}
                label="Timezone"
                onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
              >
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="America/New_York">Eastern Time</MenuItem>
                <MenuItem value="America/Chicago">Central Time</MenuItem>
                <MenuItem value="America/Denver">Mountain Time</MenuItem>
                <MenuItem value="America/Los_Angeles">Pacific Time</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Language</InputLabel>
              <Select
                value={settings.general.language}
                label="Language"
                onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ar">Arabic</MenuItem>
                <MenuItem value="ur">Urdu</MenuItem>
                <MenuItem value="tr">Turkish</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
        
        <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Preferences
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Date Format</InputLabel>
              <Select
                value={settings.general.dateFormat}
                label="Date Format"
                onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
              >
                <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Currency</InputLabel>
              <Select
                value={settings.general.currency}
                label="Currency"
                onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
              >
                <MenuItem value="USD">USD - US Dollar</MenuItem>
                <MenuItem value="EUR">EUR - Euro</MenuItem>
                <MenuItem value="GBP">GBP - British Pound</MenuItem>
                <MenuItem value="CAD">CAD - Canadian Dollar</MenuItem>
              </Select>
            </FormControl>
            
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.general.maintenanceMode}
                    onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
                  />
                }
                label="Maintenance Mode"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.general.registrationEnabled}
                    onChange={(e) => handleSettingChange('general', 'registrationEnabled', e.target.checked)}
                  />
                }
                label="User Registration Enabled"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.general.emailVerificationRequired}
                    onChange={(e) => handleSettingChange('general', 'emailVerificationRequired', e.target.checked)}
                  />
                }
                label="Email Verification Required"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      </Grid>
  );

  const renderSecuritySettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Password Policy
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography gutterBottom>Minimum Password Length: {settings.security.passwordMinLength}</Typography>
              <Slider
                value={settings.security.passwordMinLength}
                onChange={(_, value) => handleSettingChange('security', 'passwordMinLength', value)}
                min={6}
                max={20}
                marks
                valueLabelDisplay="auto"
              />
            </Box>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.passwordRequireSpecialChars}
                    onChange={(e) => handleSettingChange('security', 'passwordRequireSpecialChars', e.target.checked)}
                  />
                }
                label="Require Special Characters"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.passwordRequireNumbers}
                    onChange={(e) => handleSettingChange('security', 'passwordRequireNumbers', e.target.checked)}
                  />
                }
                label="Require Numbers"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.passwordRequireUppercase}
                    onChange={(e) => handleSettingChange('security', 'passwordRequireUppercase', e.target.checked)}
                  />
                }
                label="Require Uppercase Letters"
              />
            </FormGroup>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Session & Access Control
            </Typography>
            <TextField
              fullWidth
              label="Session Timeout (minutes)"
              type="number"
              value={settings.security.sessionTimeout}
              onChange={(e) => handleSettingChange('security', 'sessionTimeout', Number(e.target.value))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Max Login Attempts"
              type="number"
              value={settings.security.maxLoginAttempts}
              onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', Number(e.target.value))}
              margin="normal"
            />
            
            <Box sx={{ mt: 3 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactorEnabled}
                    onChange={(e) => handleSettingChange('security', 'twoFactorEnabled', e.target.checked)}
                  />
                }
                label="Two-Factor Authentication"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.sslEnabled}
                    onChange={(e) => handleSettingChange('security', 'sslEnabled', e.target.checked)}
                  />
                }
                label="SSL/TLS Enabled"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.corsEnabled}
                    onChange={(e) => handleSettingChange('security', 'corsEnabled', e.target.checked)}
                  />
                }
                label="CORS Enabled"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderNotificationSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Email Configuration
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.emailEnabled}
                  onChange={(e) => handleSettingChange('notifications', 'emailEnabled', e.target.checked)}
                />
              }
              label="Email Notifications Enabled"
            />
            <TextField
              fullWidth
              label="SMTP Host"
              value={settings.notifications.smtpHost}
              onChange={(e) => handleSettingChange('notifications', 'smtpHost', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="SMTP Port"
              type="number"
              value={settings.notifications.smtpPort}
              onChange={(e) => handleSettingChange('notifications', 'smtpPort', Number(e.target.value))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="SMTP Username"
              value={settings.notifications.smtpUsername}
              onChange={(e) => handleSettingChange('notifications', 'smtpUsername', e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="SMTP Password"
              type={showPassword ? 'text' : 'password'}
              value={settings.notifications.smtpPassword}
              onChange={(e) => handleSettingChange('notifications', 'smtpPassword', e.target.value)}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                )
              }}
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              SMS Configuration
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifications.smsEnabled}
                  onChange={(e) => handleSettingChange('notifications', 'smsEnabled', e.target.checked)}
                />
              }
              label="SMS Notifications Enabled"
            />
            <TextField
              fullWidth
              label="Twilio Account SID"
              value={settings.notifications.twilioAccountSid}
              onChange={(e) => handleSettingChange('notifications', 'twilioAccountSid', e.target.value)}
              margin="normal"
              disabled={!settings.notifications.smsEnabled}
            />
            <TextField
              fullWidth
              label="Twilio Auth Token"
              type="password"
              value={settings.notifications.twilioAuthToken}
              onChange={(e) => handleSettingChange('notifications', 'twilioAuthToken', e.target.value)}
              margin="normal"
              disabled={!settings.notifications.smsEnabled}
            />
            <TextField
              fullWidth
              label="Twilio Phone Number"
              value={settings.notifications.twilioPhoneNumber}
              onChange={(e) => handleSettingChange('notifications', 'twilioPhoneNumber', e.target.value)}
              margin="normal"
              disabled={!settings.notifications.smsEnabled}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderStorageSettings = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              File Storage
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Storage Provider</InputLabel>
              <Select
                value={settings.storage.provider}
                label="Storage Provider"
                onChange={(e) => handleSettingChange('storage', 'provider', e.target.value)}
              >
                <MenuItem value="local">Local Storage</MenuItem>
                <MenuItem value="s3">Amazon S3</MenuItem>
                <MenuItem value="cloudinary">Cloudinary</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Max File Size (MB)"
              type="number"
              value={settings.storage.maxFileSize}
              onChange={(e) => handleSettingChange('storage', 'maxFileSize', Number(e.target.value))}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Allowed File Types (comma separated)"
              value={settings.storage.allowedFileTypes.join(', ')}
              onChange={(e) => handleSettingChange('storage', 'allowedFileTypes', e.target.value.split(', '))}
              margin="normal"
              helperText="e.g., pdf, doc, docx, mp4, mp3, jpg, png"
            />
          </CardContent>
        </Card>
      </Grid>
      
      {settings.storage.provider === 's3' && (
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Amazon S3 Configuration
              </Typography>
              <TextField
                fullWidth
                label="S3 Bucket Name"
                value={settings.storage.s3Bucket}
                onChange={(e) => handleSettingChange('storage', 's3Bucket', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="S3 Region"
                value={settings.storage.s3Region}
                onChange={(e) => handleSettingChange('storage', 's3Region', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Access Key ID"
                value={settings.storage.s3AccessKey}
                onChange={(e) => handleSettingChange('storage', 's3AccessKey', e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Secret Access Key"
                type="password"
                value={settings.storage.s3SecretKey}
                onChange={(e) => handleSettingChange('storage', 's3SecretKey', e.target.value)}
                margin="normal"
              />
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
  );

  const renderSystemHealth = () => (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography color="textSecondary" gutterBottom variant="overline">
                  System Status
                </Typography>
                <Chip 
                  label={initialSystemHealth.status.toUpperCase()} 
                  color={initialSystemHealth.status === 'healthy' ? 'success' : 'default'} 
                  icon={<CheckCircle />}
                />
              </Box>
              <MonitorHeart sx={{ fontSize: 40, color: initialSystemHealth.status === 'healthy' ? 'success.main' : 'text.secondary' }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              CPU Usage
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {initialSystemHealth.cpuUsage}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={initialSystemHealth.cpuUsage} 
              color={initialSystemHealth.cpuUsage > 80 ? 'error' : initialSystemHealth.cpuUsage > 60 ? 'warning' : 'success'}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Memory Usage
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {initialSystemHealth.memoryUsage}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={initialSystemHealth.memoryUsage} 
              color={initialSystemHealth.memoryUsage > 80 ? 'error' : initialSystemHealth.memoryUsage > 60 ? 'warning' : 'success'}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 3 }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom variant="overline">
              Disk Usage
            </Typography>
            <Typography variant="h4" sx={{ mb: 1 }}>
              {initialSystemHealth.diskUsage}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={initialSystemHealth.diskUsage} 
              color={initialSystemHealth.diskUsage > 80 ? 'error' : initialSystemHealth.diskUsage > 60 ? 'warning' : 'success'}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              System Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Uptime" secondary={initialSystemHealth.uptime} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Active Users" secondary={initialSystemHealth.activeUsers.toLocaleString()} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Total Requests" secondary={initialSystemHealth.totalRequests.toLocaleString()} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Error Rate" secondary={`${initialSystemHealth.errorRate}%`} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Avg Response Time" secondary={`${initialSystemHealth.responseTime}ms`} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Backup & Maintenance
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Last Backup: {settings.backup.lastBackup ? new Date(settings.backup.lastBackup).toLocaleString() : 'Never'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                startIcon={<Backup />}
                onClick={() => setOpenBackupDialog(true)}
              >
                Create Backup
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<RestoreFromTrash />}
                onClick={() => setOpenRestoreDialog(true)}
              >
                Restore
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<Download />}
              >
                Export Logs
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderAuditLogs = () => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Audit Logs
          </Typography>
          <Button startIcon={<Download />} variant="outlined">
            Export Logs
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>IP Address</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {initialAuditLogs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Audit Logs
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        System audit logs will appear here when actions are performed.
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                initialAuditLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      {new Date(log.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.resource}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                    <TableCell>
                      <Chip 
                        label={log.status} 
                        color={log.status === 'success' ? 'success' : 'error'}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          System Administration
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<Save />}
          onClick={handleSaveSettings}
        >
          Save All Settings
        </Button>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab icon={<Settings />} label="General" />
          <Tab icon={<Security />} label="Security" />
          <Tab icon={<Notifications />} label="Notifications" />
          <Tab icon={<Storage />} label="Storage" />
          <Tab icon={<MonitorHeart />} label="System Health" />
          <Tab icon={<Shield />} label="Audit Logs" />
        </Tabs>
      </Box>

      {selectedTab === 0 && renderGeneralSettings()}
      {selectedTab === 1 && renderSecuritySettings()}
      {selectedTab === 2 && renderNotificationSettings()}
      {selectedTab === 3 && renderStorageSettings()}
      {selectedTab === 4 && renderSystemHealth()}
      {selectedTab === 5 && renderAuditLogs()}

      {/* Backup Dialog */}
      <Dialog open={openBackupDialog} onClose={() => setOpenBackupDialog(false)}>
        <DialogTitle>Create System Backup</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This will create a complete backup of your system including:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="Database" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="User Files" />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle color="success" /></ListItemIcon>
              <ListItemText primary="System Configuration" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBackupDialog(false)}>Cancel</Button>
          <Button onClick={handleBackup} variant="contained">Create Backup</Button>
        </DialogActions>
      </Dialog>

      {/* Restore Dialog */}
      <Dialog open={openRestoreDialog} onClose={() => setOpenRestoreDialog(false)}>
        <DialogTitle>Restore from Backup</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Warning</AlertTitle>
            Restoring from backup will overwrite all current data. This action cannot be undone.
          </Alert>
          <Typography variant="body1">
            Select a backup file to restore from:
          </Typography>
          <Button 
            variant="outlined" 
            startIcon={<Upload />}
            sx={{ mt: 2 }}
            fullWidth
          >
            Choose Backup File
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenRestoreDialog(false)}>Cancel</Button>
          <Button onClick={handleRestore} variant="contained" color="warning">
            Restore
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default function SystemAdmin() {
  const { user } = useUser();

  // Role-based access control - Only Admin can access System Admin
  if (!user || user.role !== 'ADMIN') {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Only administrators can access system administration settings.
        </Typography>
      </Box>
    );
  }

  return <SystemAdminContent />;
}