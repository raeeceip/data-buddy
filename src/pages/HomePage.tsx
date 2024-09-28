import React from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Container,
  Paper
} from '@mui/material';
import { 
  BarChart as BarChartIcon, 
  DataUsage as DataUsageIcon, 
  Timeline as TimelineIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', pt: 8, pb: 6 }}>
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome to DataBuddy
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" paragraph>
          Your powerful companion for data analysis and visualization.
          Upload your datasets, create stunning visualizations, and gain valuable insights with ease.
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <BarChartIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    Visualize Data
                  </Typography>
                  <Typography>
                    Create interactive charts and graphs to visualize your data in meaningful ways.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/visualization"
                    fullWidth
                  >
                    Start Visualizing
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <DataUsageIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    Analyze Data
                  </Typography>
                  <Typography>
                    Perform in-depth analysis on your datasets to uncover trends and patterns.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/analysis"
                    fullWidth
                  >
                    Start Analyzing
                  </Button>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <TimelineIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
                  <Typography gutterBottom variant="h5" component="h2">
                    View Dashboard
                  </Typography>
                  <Typography>
                    Access your data overview, recent activities, and quick actions all in one place.
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button 
                    variant="contained" 
                    component={Link} 
                    to="/dashboard"
                    fullWidth
                  >
                    Go to Dashboard
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Paper sx={{ mt: 8, p: 4, bgcolor: 'background.paper' }} elevation={3}>
          <Typography variant="h5" gutterBottom>
            Get Started
          </Typography>
          <Typography paragraph>
            To begin your data journey with DataBuddy, follow these simple steps:
          </Typography>
          <ol>
            <li>Upload your dataset in CSV format</li>
            <li>Choose from a variety of visualization options</li>
            <li>Analyze your data with our powerful tools</li>
            <li>Share your insights with customizable reports</li>
          </ol>
          <Button 
            variant="outlined" 
            component={Link} 
            to="/upload"
            sx={{ mt: 2 }}
          >
            Upload Your First Dataset
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;