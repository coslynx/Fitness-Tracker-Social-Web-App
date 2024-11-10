import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from '../services/api';
import { Chart } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const Dashboard = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        setErrors(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <Container maxWidth="md">
      {isLoading ? (
        <Typography variant="h6" align="center">Loading...</Typography>
      ) : errors ? (
        <Typography variant="h6" align="center" color="error">
          {errors}
        </Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Welcome, {userData.name}!
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Current Activity</Typography>
            <Typography variant="body1">
              Steps Today: {userData.stepsToday}
            </Typography>
            <Typography variant="body1">
              Calories Burned Today: {userData.caloriesBurnedToday}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6">Goal Progress</Typography>
            {userData.goals.map((goal) => (
              <Grid item xs={12} key={goal.id}>
                <Typography variant="body1">{goal.title}</Typography>
                <Line
                  data={{
                    labels: goal.progressData.map((dataPoint) => new Date(dataPoint.date)),
                    datasets: [
                      {
                        label: goal.title,
                        data: goal.progressData.map((dataPoint) => dataPoint.value),
                        fill: false,
                        borderColor: 'rgba(75,192,192,1)',
                        lineTension: 0.1,
                      },
                    ],
                  }}
                  options={{
                    scales: {
                      x: {
                        type: 'time',
                        time: {
                          unit: 'day',
                        },
                      },
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Recent Activity</Typography>
            {userData.recentActivity.map((activity) => (
              <Grid item xs={12} key={activity.id}>
                <Typography variant="body1">
                  {activity.type} - {activity.date}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Dashboard;