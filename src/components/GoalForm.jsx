import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { validateGoalTarget, validateDeadline } from '../utils/validators';
import { API_URL } from '../services/api';
import Modal from './Modal';

const GoalForm = () => {
  const [goalType, setGoalType] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [deadline, setDeadline] = useState(null);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleGoalTypeChange = (event) => {
    setGoalType(event.target.value);
    setErrors({ ...errors, targetValue: null });
  };

  const handleTargetValueChange = (event) => {
    setTargetValue(event.target.value);
  };

  const handleDeadlineChange = (date) => {
    setDeadline(date);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const targetError = validateGoalTarget(goalType, targetValue);
    const deadlineError = validateDeadline(deadline);

    setErrors({
      targetValue: targetError,
      deadline: deadlineError,
    });

    if (targetError || deadlineError) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(API_URL + '/goals', {
        goalType,
        targetValue,
        deadline,
        description,
      });

      if (response.status === 201) {
        setShowSuccessModal(true);
      } else {
        setShowErrorModal(true);
      }
    } catch (error) {
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="goal-type">Goal Type</InputLabel>
        <Select
          id="goal-type"
          value={goalType}
          onChange={handleGoalTypeChange}
          required
        >
          <MenuItem value="weightLoss">Weight Loss</MenuItem>
          <MenuItem value="distance">Distance</MenuItem>
          <MenuItem value="caloriesBurned">Calories Burned</MenuItem>
        </Select>
        {errors.goalType && <FormHelperText error>{errors.goalType}</FormHelperText>}
      </FormControl>

      <TextField
        label="Target Value"
        type="number"
        value={targetValue}
        onChange={handleTargetValueChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.targetValue}
        helperText={errors.targetValue}
      />

      <DatePicker
        label="Deadline"
        value={deadline}
        onChange={handleDeadlineChange}
        required
        fullWidth
        margin="normal"
        error={!!errors.deadline}
        helperText={errors.deadline}
        disablePast
      />

      <TextField
        label="Description (optional)"
        value={description}
        onChange={handleDescriptionChange}
        fullWidth
        margin="normal"
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isSubmitting}
        fullWidth
      >
        {isSubmitting ? 'Submitting...' : 'Set Goal'}
      </Button>

      <Modal
        isOpen={showSuccessModal}
        title="Success!"
        onClose={() => setShowSuccessModal(false)}
      >
        Your goal has been successfully set.
      </Modal>

      <Modal
        isOpen={showErrorModal}
        title="Error"
        onClose={() => setShowErrorModal(false)}
      >
        An error occurred while setting your goal. Please try again later.
      </Modal>
    </form>
  );
};

export default GoalForm;