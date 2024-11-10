import axios from 'axios';
import { API_URL } from '../services/auth';
import * as dotenv from 'dotenv';
dotenv.config();

class API {
  constructor() {
    axios.interceptors.request.use(async (config) => {
      const token = await API_URL.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  async fetchGoals(userId) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}/goals`);
      return response.data;
    } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
    }
  }

  async createGoal(goalData) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/goals`, goalData);
      return response.data;
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  }

  async updateGoal(goalId, updatedGoalData) {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/goals/${goalId}`, updatedGoalData);
      return response.data;
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  }

  async deleteGoal(goalId) {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/goals/${goalId}`);
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  async fetchUserData(userId) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw error;
    }
  }
}

export default new API();