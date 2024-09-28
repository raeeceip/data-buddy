import React from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Box
} from '@mui/material';
import { 
  BarChart as BarChartIcon, 
  DataUsage as DataUsageIcon, 
  Timeline as TimelineIcon, 
  Assignment as AssignmentIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Analysis Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Metric Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Datasets
              </Typography>
              <Typography variant="h5" component="div">
                3
              </Typography>
              <Typography variant="body2">
                Uploaded datasets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Visualizations
              </Typography>
              <Typography variant="h5" component="div">
                10
              </Typography>
              <Typography variant="body2">
                Created visualizations
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Data Points
              </Typography>
              <Typography variant="h5" component="div">
                1,234
              </Typography>
              <Typography variant="body2">
                Total data points analyzed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Analysis Tasks
              </Typography>
              <Typography variant="h5" component="div">
                5
              </Typography>
              <Typography variant="body2">
                Ongoing analysis tasks
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Datasets */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Datasets
              </Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Sales Data 2023" secondary="Uploaded 2 days ago" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Customer Survey Results" secondary="Uploaded 5 days ago" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Product Inventory" secondary="Uploaded 1 week ago" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Button
                  variant="contained"
                  startIcon={<BarChartIcon />}
                  component={Link}
                  to="/visualization"
                  fullWidth
                >
                  Create New Visualization
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<DataUsageIcon />}
                  component={Link}
                  to="/upload"
                  fullWidth
                >
                  Upload New Dataset
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<TimelineIcon />}
                  component={Link}
                  to="/analysis"
                  fullWidth
                >
                  Run Analysis
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  component={Link}
                  to="/reports"
                  fullWidth
                >
                  View Reports
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;