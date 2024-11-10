import React, { useState, useEffect } from 'react';
import { Grid, List, ListItem, ListItemText, Typography, Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from '../services/api';
import GoalForm from '../components/GoalForm';
import Modal from '../components/Modal';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { userId } = useParams();
        const response = await axios.get(`${API_URL}/users/${userId}/goals`);
        setGoals(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchGoals();
    }
  }, [user]);

  const handleCreateGoal = () => {
    setSelectedGoalId(null);
    setIsModalOpen(true);
  };

  const handleEditGoal = (id) => {
    setSelectedGoalId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteGoal = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/goals/${id}`);

      if (response.status === 204) {
        setGoals(goals.filter((goal) => goal.id !== id));
      } else {
        setError('Failed to delete goal');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Grid container justify="center" alignItems="center" style={{ minHeight: '80vh' }}>
      <Grid item xs={12} sm={8} md={6}>
        <Typography variant="h5" align="center" gutterBottom>
          Your Goals
        </Typography>

        {isLoading ? (
          <Typography variant="body1" align="center" gutterBottom>
            Loading...
          </Typography>
        ) : error ? (
          <Typography variant="body1" align="center" color="error" gutterBottom>
            {error}
          </Typography>
        ) : (
          <List>
            {goals.map((goal) => (
              <ListItem key={goal.id}>
                <ListItemText
                  primary={goal.title}
                  secondary={`Target: ${goal.targetValue} - Deadline: ${goal.deadline}`}
                />
                <Button variant="contained" color="primary" onClick={() => handleEditGoal(goal.id)}>
                  Edit
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteGoal(goal.id)}>
                  Delete
                </Button>
              </ListItem>
            ))}
          </List>
        )}

        <Button variant="contained" color="primary" onClick={handleCreateGoal}>
          Create New Goal
        </Button>

        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Goal Form">
          <GoalForm
            goalId={selectedGoalId}
            onSuccess={() => {
              fetchGoals();
              handleCloseModal();
            }}
            onError={() => {
              setError('Failed to create or update goal');
            }}
          />
        </Modal>
      </Grid>
    </Grid>
  );
};

export default Goals;