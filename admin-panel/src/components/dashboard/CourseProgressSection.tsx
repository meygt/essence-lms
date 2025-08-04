import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Chip,
  LinearProgress,
  Divider,
  Grid,
  Skeleton,
  Alert,
} from '@mui/material';
import { useCourseStatistics, useCourseProgress } from '../../hooks/useCourses';
import { useActiveTeachers } from '../../hooks/useUsers';

interface CourseProgressSectionProps {
  className?: string;
}

const CourseProgressSection: React.FC<CourseProgressSectionProps> = ({ className }) => {
  const { data: courseStats, loading: statsLoading, error: statsError } = useCourseStatistics();
  const { data: progressData, loading: progressLoading, error: progressError } = useCourseProgress();
  const { data: teachersData, loading: teachersLoading } = useActiveTeachers();

  const isLoading = statsLoading || progressLoading || teachersLoading;
  const hasError = statsError || progressError;

  // Transform progress data for display
  const courseProgress = progressData?.slice(0, 4).map(course => ({
    name: course.courseName || 'Unknown Course',
    progress: Math.round(course.completionRate || 0),
    students: course.totalStudents || 0,
  })) || [];

  // Calculate completion rate from course statistics
  const completionRate = courseStats?.averageCompletionRate ? Math.round(courseStats.averageCompletionRate) : 0;
  const avgRating = courseStats?.averageRating ? courseStats.averageRating.toFixed(1) : '0.0';
  const activeTeachers = teachersData?.length || 0;

  return (
    <Paper sx={{ 
      p: { xs: 2, sm: 3 }, 
      height: { xs: 'auto', sm: 450 }, 
      minHeight: { xs: 350, sm: 450 },
      backgroundColor: '#334155', 
      color: '#ffffff' 
    }} className={className}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          fontSize: { xs: '1rem', sm: '1.25rem' }
        }}
      >
        Course Progress Overview
      </Typography>
      
      {hasError && (
        <Alert severity="error" sx={{ mt: 2, backgroundColor: 'rgba(244, 67, 54, 0.1)' }}>
          Failed to load course progress data
        </Alert>
      )}
      
      <Box sx={{ mt: { xs: 2, sm: 3 } }}>
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 1 
              }}>
                <Skeleton variant="text" width="40%" />
                <Skeleton variant="text" width="30%" />
              </Box>
              <Skeleton variant="rectangular" height={8} sx={{ borderRadius: 4 }} />
            </Box>
          ))
        ) : courseProgress.length === 0 ? (
          <Typography 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              color: 'rgba(255, 255, 255, 0.7)',
              py: 4
            }}
          >
            No course progress data available
          </Typography>
        ) : (
          courseProgress.map((course, index) => (
            <Box key={index} sx={{ mb: { xs: 2.5, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 1, sm: 0 },
                mb: 1 
              }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', sm: '0.875rem' }
                  }}
                >
                  {course.name}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: { xs: 1, sm: 2 },
                  flexWrap: 'wrap'
                }}>
                  <Chip 
                    label={`${course.students} students`} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      fontSize: { xs: '0.6875rem', sm: '0.75rem' },
                      height: { xs: 20, sm: 24 }
                    }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                  >
                    {course.progress}%
                  </Typography>
                </Box>
              </Box>
              <LinearProgress 
                variant="determinate" 
                value={course.progress} 
                sx={{ 
                  height: { xs: 6, sm: 8 }, 
                  borderRadius: 4,
                  backgroundColor: '#64748b',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    backgroundColor: index % 2 === 0 ? '#16a34a' : '#d97706',
                  }
                }}
              />
            </Box>
          ))
        )}
      </Box>
      
      {/* Quick Stats */}
      <Divider sx={{ my: { xs: 2, sm: 3 } }} />
      <Grid container spacing={{ xs: 1, sm: 2 }}>
         <Grid size={{ xs: 4 }}>
           <Box sx={{ textAlign: 'center' }}>
             {isLoading ? (
               <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
             ) : (
               <Typography 
                 variant="h5" 
                 sx={{ 
                   fontWeight: 700, 
                   color: '#16a34a',
                   fontSize: { xs: '1rem', sm: '1.5rem' }
                 }}
               >
                 {completionRate}%
               </Typography>
             )}
             <Typography 
               variant="caption" 
               color="text.secondary"
               sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
             >
               Completion Rate
             </Typography>
           </Box>
         </Grid>
         <Grid size={{ xs: 4 }}>
           <Box sx={{ textAlign: 'center' }}>
             {isLoading ? (
               <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
             ) : (
               <Typography 
                 variant="h5" 
                 sx={{ 
                   fontWeight: 700, 
                   color: '#d97706',
                   fontSize: { xs: '1rem', sm: '1.5rem' }
                 }}
               >
                 {avgRating}
               </Typography>
             )}
             <Typography 
               variant="caption" 
               color="text.secondary"
               sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
             >
               Avg Rating
             </Typography>
           </Box>
         </Grid>
         <Grid size={{ xs: 4 }}>
           <Box sx={{ textAlign: 'center' }}>
             {isLoading ? (
               <Skeleton variant="text" width="60%" height={32} sx={{ mx: 'auto' }} />
             ) : (
               <Typography 
                 variant="h5" 
                 sx={{ 
                   fontWeight: 700, 
                   color: '#0ea5e9',
                   fontSize: { xs: '1rem', sm: '1.5rem' }
                 }}
               >
                 {activeTeachers}
               </Typography>
             )}
             <Typography 
               variant="caption" 
               color="text.secondary"
               sx={{ fontSize: { xs: '0.625rem', sm: '0.75rem' } }}
             >
               Active Teachers
             </Typography>
           </Box>
         </Grid>
       </Grid>
    </Paper>
  );
};

export default CourseProgressSection;