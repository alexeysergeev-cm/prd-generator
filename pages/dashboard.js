import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Box, Typography, Button, Paper, Grid, Card, CardContent,
  CardActions, IconButton, TextField, Dialog, DialogTitle, DialogContent,
  DialogActions, FormControl, InputLabel, Select, MenuItem, CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Head from 'next/head';
import axios from 'axios';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [prds, setPrds] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [newPrd, setNewPrd] = useState({
    title: '',
    description: '',
    templateId: ''
  });

  // Mocked data until we implement the backend
  const mockPrds = [
    { id: 1, title: 'Mobile App PRD', lastUpdated: '2025-04-10T15:32:00Z', template: 'Software Development' },
    { id: 2, title: 'E-commerce Platform PRD', lastUpdated: '2025-04-05T09:14:00Z', template: 'Web Application' },
    { id: 3, title: 'Marketing Dashboard PRD', lastUpdated: '2025-03-28T11:45:00Z', template: 'Analytics Platform' },
  ];

  const mockTemplates = [
    { id: 1, name: 'Software Development' },
    { id: 2, name: 'Web Application' },
    { id: 3, name: 'Analytics Platform' },
    { id: 4, name: 'Mobile App' },
  ];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Here we would fetch the user's PRDs from the API
    // For now, we'll use the mock data
    setPrds(mockPrds);
    setTemplates(mockTemplates);
    setLoading(false);
  }, [router]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPrds = prds.filter(prd => 
    prd.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreateDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleNewPrdChange = (e) => {
    const { name, value } = e.target;
    setNewPrd(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreatePrd = () => {
    // Here we would send the new PRD data to the API
    // For now, we'll just add it to our local state
    const newPrdItem = {
      id: prds.length + 1,
      title: newPrd.title,
      lastUpdated: new Date().toISOString(),
      template: templates.find(t => t.id === parseInt(newPrd.templateId))?.name || 'Custom'
    };
    
    setPrds([...prds, newPrdItem]);
    setNewPrd({ title: '', description: '', templateId: '' });
    handleCloseDialog();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const viewPrd = (id) => {
    router.push(`/prds/${id}`);
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
        <title>Dashboard | PRD Generator</title>
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
            <Grid item>
              <Typography variant="h4" component="h1">
                Your PRDs
              </Typography>
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleOpenCreateDialog}
              >
                Create New PRD
              </Button>
            </Grid>
          </Grid>

          <Paper sx={{ p: 2, mt: 4 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField
                    label="Search PRDs"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mt: 4 }}>
            <Grid container spacing={3}>
              {filteredPrds.length > 0 ? (
                filteredPrds.map((prd) => (
                  <Grid item xs={12} sm={6} md={4} key={prd.id}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="h6" component="div">
                            {prd.title}
                          </Typography>
                          <IconButton aria-label="more options" size="small">
                            <MoreVertIcon />
                          </IconButton>
                        </Box>
                        <Typography color="textSecondary" gutterBottom>
                          Template: {prd.template}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Last updated: {formatDate(prd.lastUpdated)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={() => viewPrd(prd.id)}>View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="body1">
                      No PRDs found. Create your first PRD to get started!
                    </Typography>
                  </Paper>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Container>

      {/* Create PRD Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Create New PRD</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="PRD Title"
              name="title"
              autoFocus
              value={newPrd.title}
              onChange={handleNewPrdChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              multiline
              rows={4}
              id="description"
              label="Description"
              name="description"
              value={newPrd.description}
              onChange={handleNewPrdChange}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="template-select-label">Template</InputLabel>
              <Select
                labelId="template-select-label"
                id="templateId"
                name="templateId"
                value={newPrd.templateId}
                label="Template"
                onChange={handleNewPrdChange}
              >
                {templates.map(template => (
                  <MenuItem key={template.id} value={template.id}>
                    {template.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleCreatePrd} 
            variant="contained"
            disabled={!newPrd.title.trim() || !newPrd.templateId}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
