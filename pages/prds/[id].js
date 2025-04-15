import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Box, Typography, Button, Paper, TextField, Grid,
  CircularProgress, Tabs, Tab, Divider, IconButton
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import Head from 'next/head';

// Sample PRD data - would be fetched from API in production
const mockPrdData = {
  1: {
    id: 1,
    title: 'Mobile App PRD',
    description: 'Product Requirements Document for our new mobile app',
    content: {
      objective: 'Create a user-friendly mobile application for booking services',
      background: 'Our current web platform lacks mobile optimization',
      requirements: [
        'User should be able to sign up using email or social accounts',
        'App should allow searching for services by location',
        'Users can book appointments and receive confirmation'
      ],
      userStories: [
        'As a customer, I want to quickly find nearby services',
        'As a service provider, I want to manage my bookings efficiently'
      ]
    },
    lastUpdated: '2025-04-10T15:32:00Z',
    template: 'Software Development'
  },
  2: {
    id: 2,
    title: 'E-commerce Platform PRD',
    description: 'Product Requirements Document for our e-commerce platform',
    content: {
      objective: 'Build a scalable e-commerce platform with modern features',
      background: 'Our current solution is outdated and lacks key functionality',
      requirements: [
        'Support for multiple payment providers',
        'Inventory management system',
        'Customer loyalty program'
      ],
      userStories: [
        'As a shopper, I want to easily find products',
        'As an admin, I want to manage inventory efficiently'
      ]
    },
    lastUpdated: '2025-04-05T09:14:00Z',
    template: 'Web Application'
  }
};

export default function PrdView() {
  const router = useRouter();
  const { id } = router.query;
  
  const [loading, setLoading] = useState(true);
  const [prd, setPrd] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [editableContent, setEditableContent] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    // In a real app, fetch from API
    // For now, use mock data
    const fetchPrd = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const prdData = mockPrdData[id];
        if (!prdData) {
          router.push('/dashboard');
          return;
        }
        
        setPrd(prdData);
        setEditableContent(prdData.content);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PRD:', error);
        setLoading(false);
      }
    };

    fetchPrd();
  }, [id, router]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleContentChange = (section, value) => {
    setEditableContent(prev => ({
      ...prev,
      [section]: value
    }));
  };

  const handleRequirementChange = (index, value) => {
    const newRequirements = [...editableContent.requirements];
    newRequirements[index] = value;
    
    setEditableContent(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const handleUserStoryChange = (index, value) => {
    const newUserStories = [...editableContent.userStories];
    newUserStories[index] = value;
    
    setEditableContent(prev => ({
      ...prev,
      userStories: newUserStories
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // In a real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update mock data for now
      if (mockPrdData[id]) {
        mockPrdData[id] = {
          ...mockPrdData[id],
          content: editableContent,
          lastUpdated: new Date().toISOString()
        };
      }
      
      setPrd({
        ...prd,
        content: editableContent,
        lastUpdated: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error saving PRD:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddRequirement = () => {
    const newRequirements = [...(editableContent.requirements || []), 'New requirement'];
    setEditableContent(prev => ({
      ...prev,
      requirements: newRequirements
    }));
  };

  const handleAddUserStory = () => {
    const newUserStories = [...(editableContent.userStories || []), 'As a user, I want to...'];
    setEditableContent(prev => ({
      ...prev,
      userStories: newUserStories
    }));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{prd?.title || 'PRD'} | PRD Generator</title>
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <Typography variant="h4" component="h1">
                {prd.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last updated: {new Date(prd.lastUpdated).toLocaleString()}
              </Typography>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<SaveIcon />}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <IconButton color="primary" sx={{ ml: 1 }}>
                <CommentIcon />
              </IconButton>
              <IconButton color="primary" sx={{ ml: 1 }}>
                <ShareIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Paper sx={{ mt: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Edit" />
              <Tab label="Preview" />
              <Tab label="Comments" />
            </Tabs>
            <Divider />

            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box component="form" noValidate>
                  <Typography variant="h6" gutterBottom>
                    Objective
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editableContent.objective || ''}
                    onChange={(e) => handleContentChange('objective', e.target.value)}
                    margin="normal"
                  />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Background
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editableContent.background || ''}
                    onChange={(e) => handleContentChange('background', e.target.value)}
                    margin="normal"
                  />

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    Requirements
                    <Button 
                      size="small" 
                      onClick={handleAddRequirement} 
                      sx={{ ml: 2 }}
                    >
                      + Add Requirement
                    </Button>
                  </Typography>
                  {editableContent.requirements?.map((req, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      multiline
                      value={req}
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      margin="normal"
                      InputProps={{
                        startAdornment: <Box component="span" sx={{ mr: 1 }}>{index + 1}.</Box>
                      }}
                    />
                  ))}

                  <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                    User Stories
                    <Button 
                      size="small" 
                      onClick={handleAddUserStory} 
                      sx={{ ml: 2 }}
                    >
                      + Add User Story
                    </Button>
                  </Typography>
                  {editableContent.userStories?.map((story, index) => (
                    <TextField
                      key={index}
                      fullWidth
                      multiline
                      value={story}
                      onChange={(e) => handleUserStoryChange(index, e.target.value)}
                      margin="normal"
                      InputProps={{
                        startAdornment: <Box component="span" sx={{ mr: 1 }}>{index + 1}.</Box>
                      }}
                    />
                  ))}
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {prd.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Template: {prd.template}
                  </Typography>
                  <Divider sx={{ my: 2 }} />

                  <Typography variant="h6" gutterBottom>
                    Objective
                  </Typography>
                  <Typography paragraph>
                    {editableContent.objective || 'No objective specified.'}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Background
                  </Typography>
                  <Typography paragraph>
                    {editableContent.background || 'No background specified.'}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Requirements
                  </Typography>
                  {editableContent.requirements?.length ? (
                    <ol>
                      {editableContent.requirements.map((req, index) => (
                        <li key={index}>
                          <Typography paragraph>{req}</Typography>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <Typography paragraph>No requirements specified.</Typography>
                  )}

                  <Typography variant="h6" gutterBottom>
                    User Stories
                  </Typography>
                  {editableContent.userStories?.length ? (
                    <ol>
                      {editableContent.userStories.map((story, index) => (
                        <li key={index}>
                          <Typography paragraph>{story}</Typography>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <Typography paragraph>No user stories specified.</Typography>
                  )}
                </Box>
              )}

              {tabValue === 2 && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" gutterBottom>
                    Comments
                  </Typography>
                  <Typography color="textSecondary">
                    No comments yet. Start a discussion about this PRD!
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="Add a comment..."
                    margin="normal"
                    sx={{ mt: 3 }}
                  />
                  <Button variant="contained" sx={{ mt: 1 }}>
                    Add Comment
                  </Button>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
