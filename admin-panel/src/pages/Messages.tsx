import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  List,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  InputAdornment,
  Grid,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  Divider,
  Badge,
  Tooltip,
  Alert,
  Card,
  CardContent,
  Tabs,
  Tab,
  ListItemButton,
} from '@mui/material';
import {
  Send as SendIcon,
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiIcon,
  Phone as PhoneIcon,
  VideoCall as VideoCallIcon,
  Info as InfoIcon,
  Archive as ArchiveIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  NotificationsOff as NotificationsOffIcon,
  Block as BlockIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { useUser } from '../hooks/useUser';

interface Message {
  id: number;
  senderId: number;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  unreadCount: number;
  isOnline: boolean;
  type: 'individual' | 'group';
  isStarred: boolean;
  isArchived: boolean;
  role: 'student' | 'teacher' | 'parent' | 'admin';
}

interface Contact {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'parent' | 'admin';
  avatar: string;
  isOnline: boolean;
}

const Messages: React.FC = () => {
  const { user } = useUser();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [newMessageDialog, setNewMessageDialog] = useState(false);
  const [showError, setShowError] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [filterType, setFilterType] = useState('all');

  // Role-based access control - Messages available to all authenticated users
  if (!user) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Access Restricted
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please log in to access messages.
        </Typography>
      </Box>
    );
  }

  // Empty initial data - would be populated from API
  const conversations: Conversation[] = [];
  const contacts: Contact[] = [];
  const sampleMessages: Message[] = [];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || 
      (filterType === 'unread' && conv.unreadCount > 0) ||
      (filterType === 'starred' && conv.isStarred) ||
      (filterType === 'archived' && conv.isArchived) ||
      (filterType === 'groups' && conv.type === 'group');
    return matchesSearch && matchesFilter;
  });

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'primary';
      case 'teacher': return 'success';
      case 'parent': return 'warning';
      case 'admin': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <ScheduleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />;
      case 'delivered': return <CheckCircleIcon sx={{ fontSize: 16, color: 'info.main' }} />;
      case 'read': return <CheckCircleIcon sx={{ fontSize: 16, color: 'success.main' }} />;
      default: return null;
    }
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAction = () => {
    handleMenuClose();
    setShowError(true);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessageText('');
      setShowError(true);
    }
  };

  const handleNewMessage = () => {
    setNewMessageDialog(false);
    setShowError(true);
  };

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const starredCount = conversations.filter(conv => conv.isStarred).length;
  // const archivedCount = conversations.filter(conv => conv.isArchived).length;

  return (
    <Box>
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
          Messages
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="outlined" startIcon={<GroupIcon />} onClick={handleAction}>
            Create Group
          </Button>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewMessageDialog(true)}>
            New Message
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="primary">Total Conversations</Typography>
                  <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>{conversations.length}</Typography>
                </Box>
                <PersonIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="error.main">Unread Messages</Typography>
                  <Typography variant="h3" color="error.main" sx={{ fontWeight: 'bold' }}>{totalUnread}</Typography>
                </Box>
                <NotificationsIcon sx={{ fontSize: 40, color: 'error.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="warning.main">Starred</Typography>
                  <Typography variant="h3" color="warning.main" sx={{ fontWeight: 'bold' }}>{starredCount}</Typography>
                </Box>
                <StarIcon sx={{ fontSize: 40, color: 'warning.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="h6" color="info.main">Groups</Typography>
                  <Typography variant="h3" color="info.main" sx={{ fontWeight: 'bold' }}>{conversations.filter(c => c.type === 'group').length}</Typography>
                </Box>
                <GroupIcon sx={{ fontSize: 40, color: 'info.main' }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ height: 'calc(100vh - 350px)' }}>
        {/* Conversations List */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Search and Filters */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                placeholder="Search conversations..."
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Tabs
                value={tabValue}
                onChange={(_, newValue) => setTabValue(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="All" onClick={() => setFilterType('all')} />
                <Tab label="Unread" onClick={() => setFilterType('unread')} />
                <Tab label="Starred" onClick={() => setFilterType('starred')} />
                <Tab label="Groups" onClick={() => setFilterType('groups')} />
              </Tabs>
            </Box>

            {/* Conversations */}
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List sx={{ p: 0 }}>
                {filteredConversations.length === 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, textAlign: 'center' }}>
                    <MessageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No Conversations
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      You don't have any conversations yet. Start a new message to begin chatting.
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setNewMessageDialog(true)}>
                      Start New Conversation
                    </Button>
                  </Box>
                ) : (
                  filteredConversations.map((conversation) => (
                    <ListItemButton
                      key={conversation.id}
                      selected={selectedConversation === conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                      <ListItemAvatar>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          variant="dot"
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: conversation.isOnline ? '#44b700' : '#grey.400',
                              color: conversation.isOnline ? '#44b700' : '#grey.400',
                            },
                          }}
                        >
                          <Avatar src={conversation.avatar}>
                            {conversation.name.charAt(0)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal' }}>
                              {conversation.name}
                            </Typography>
                            {conversation.type === 'group' && <GroupIcon sx={{ fontSize: 16, color: 'text.secondary' }} />}
                            {conversation.isStarred && <StarIcon sx={{ fontSize: 16, color: 'warning.main' }} />}
                            <Chip
                              label={conversation.role}
                              size="small"
                              color={getRoleColor(conversation.role) as 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default'}
                              variant="outlined"
                              sx={{ ml: 'auto', fontSize: '0.7rem', height: 20 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontWeight: conversation.unreadCount > 0 ? 'bold' : 'normal',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {conversation.lastMessage}
                          </Typography>
                        }
                      />
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.time}
                        </Typography>
                        {conversation.unreadCount > 0 && (
                          <Badge badgeContent={conversation.unreadCount} color="error" />
                        )}
                      </Box>
                    </ListItemButton>
                  ))
                )}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Chat Area */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedConv ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      sx={{
                        '& .MuiBadge-badge': {
                          backgroundColor: selectedConv.isOnline ? '#44b700' : '#grey.400',
                          color: selectedConv.isOnline ? '#44b700' : '#grey.400',
                        },
                      }}
                    >
                      <Avatar src={selectedConv.avatar} sx={{ width: 40, height: 40 }}>
                        {selectedConv.name.charAt(0)}
                      </Avatar>
                    </Badge>
                    <Box>
                      <Typography variant="h6">{selectedConv.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedConv.isOnline ? 'Online' : 'Last seen 2 hours ago'}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Tooltip title="Voice Call">
                      <IconButton onClick={handleAction}>
                        <PhoneIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Video Call">
                      <IconButton onClick={handleAction}>
                        <VideoCallIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="More Options">
                      <IconButton onClick={handleMenuClick}>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, p: 2, overflow: 'auto', backgroundColor: '#f5f5f5' }}>
                  {sampleMessages.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center' }}>
                      <MessageIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        No Messages Yet
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start the conversation by sending a message below.
                      </Typography>
                    </Box>
                  ) : (
                    sampleMessages.map((message) => (
                      <Box
                        key={message.id}
                        sx={{
                          display: 'flex',
                          justifyContent: message.senderId === 0 ? 'flex-end' : 'flex-start',
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: message.senderId === 0 ? 'primary.main' : 'white',
                            color: message.senderId === 0 ? 'white' : 'text.primary',
                            boxShadow: 1
                          }}
                        >
                          <Typography variant="body2">{message.content}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
                            <Typography variant="caption" sx={{ opacity: 0.7 }}>
                              {message.timestamp}
                            </Typography>
                            {message.senderId === 0 && getStatusIcon(message.status)}
                          </Box>
                        </Box>
                      </Box>
                    ))
                  )}
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <IconButton size="small" onClick={handleAction}>
                      <AttachFileIcon />
                    </IconButton>
                    <IconButton size="small" onClick={handleAction}>
                      <EmojiIcon />
                    </IconButton>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      placeholder="Type a message..."
                      variant="outlined"
                      size="small"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
                <PersonIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Choose a conversation from the left panel or start a new message
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleAction}>
          <InfoIcon sx={{ mr: 1 }} />
          View Info
        </MenuItem>
        <MenuItem onClick={handleAction}>
          {selectedConv?.isStarred ? <StarIcon sx={{ mr: 1 }} /> : <StarBorderIcon sx={{ mr: 1 }} />}
          {selectedConv?.isStarred ? 'Unstar' : 'Star'} Conversation
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <NotificationsOffIcon sx={{ mr: 1 }} />
          Mute Notifications
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleAction}>
          <ArchiveIcon sx={{ mr: 1 }} />
          Archive
        </MenuItem>
        <MenuItem onClick={handleAction}>
          <BlockIcon sx={{ mr: 1 }} />
          Block User
        </MenuItem>
        <MenuItem onClick={handleAction} sx={{ color: 'error.main' }}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Conversation
        </MenuItem>
      </Menu>

      {/* New Message Dialog */}
      <Dialog open={newMessageDialog} onClose={() => setNewMessageDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>New Message</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth>
                <InputLabel>Select Contact</InputLabel>
                <Select label="Select Contact">
                  {contacts.map((contact) => (
                    <MenuItem key={contact.id} value={contact.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={contact.avatar} sx={{ width: 24, height: 24 }}>
                          {contact.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2">{contact.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {contact.email} • {contact.role}
                          </Typography>
                        </Box>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subject"
                placeholder="Enter message subject"
                variant="outlined"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Message"
                placeholder="Type your message here..."
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewMessageDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleNewMessage} startIcon={<SendIcon />}>
            Send Message
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Messages;