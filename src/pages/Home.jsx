import React, { useState, useEffect } from 'react';
import { Grid, Container, Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { API_URL } from '../services/api'; 

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} justify="center" alignItems="center" style={{ minHeight: '80vh' }}>
        <Grid item xs={12} sm={8} md={6}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to the Fitness Tracker
          </Typography>
          {isAuthenticated && (
            <Typography variant="body1" align="center" gutterBottom>
              Welcome back! You are already logged in.
            </Typography>
          )}
          {errorMessage && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              fullWidth
              className={classes.textField}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              fullWidth
              className={classes.textField}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading}
              className={classes.button}
            >
              {isLoading ? 'Loading...' : 'Login'}
            </Button>
          </form>
          <Typography variant="body2" align="center" gutterBottom>
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </Typography>
        </Grid>
      </Grid>
      <footer>
        <Typography variant="body2" align="center" gutterBottom>
          &copy; {new Date().getFullYear()} Fitness Tracker MVP
        </Typography>
      </footer>
    </Container>
  );
};

export default Home;