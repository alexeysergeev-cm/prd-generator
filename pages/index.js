import { useState } from 'react';
import { Container, Typography, Box, Button, Paper, Grid } from '@mui/material';
import Link from 'next/link';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PRD Generator</title>
        <meta name="description" content="A tool for generating and managing Product Requirements Documents" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="lg">
          <Box sx={{ my: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              PRD Generator
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom align="center" color="textSecondary">
              Simplify and streamline the creation of comprehensive product requirements documents
            </Typography>

            <Box sx={{ mt: 6, mb: 4 }}>
              <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      For Product Managers
                    </Typography>
                    <Typography paragraph>
                      Create standardized PRDs using templates so you can focus on content rather than format.
                      Collaborate in real-time with your team to ensure everyone is aligned.
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Button 
                        variant="contained" 
                        component={Link} 
                        href="/login"
                        size="large"
                      >
                        Get Started
                      </Button>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      Key Features
                    </Typography>
                    <ul>
                      <li>Template library with industry-standard formats</li>
                      <li>Real-time collaboration tools</li>
                      <li>AI-powered suggestions for improvement</li>
                      <li>Integration with project management tools</li>
                      <li>User-friendly interface with drag-and-drop</li>
                    </ul>
                  </Grid>
                </Grid>
              </Paper>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6">Template Library</Typography>
                  <Typography paragraph>
                    Choose from a wide variety of industry-standard templates that can be customized to fit your project needs.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6">Collaboration Tools</Typography>
                  <Typography paragraph>
                    Work together with your team in real-time, add comments, and manage versions effectively.
                  </Typography>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6">Intelligent Suggestions</Typography>
                  <Typography paragraph>
                    Get AI-powered recommendations to improve the clarity, completeness, and quality of your PRDs.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>

      <footer>
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="body2" color="text.secondary" align="center">
            {'© '}
            {new Date().getFullYear()}
            {' PRD Generator. All rights reserved.'}
          </Typography>
        </Box>
      </footer>
    </>
  );
}
