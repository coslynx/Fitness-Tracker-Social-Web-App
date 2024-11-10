import validator from 'validator';

// Function to validate email addresses
const validateEmail = (email) => {
  if (validator.isEmail(email)) {
    return true;
  }
  return 'Please enter a valid email address';
};

// Function to validate password strength
const validatePassword = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/\d/.test(password)) {
    return 'Password must contain at least one digit';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character';
  }
  return true;
};

// Function to validate goal target values based on goal type
const validateGoalTarget = (goalType, targetValue) => {
  if (goalType === 'weightLoss') {
    if (isNaN(targetValue) || targetValue <= 0) {
      return 'Please enter a positive target value';
    }
    if (targetValue > 100) {
      return 'Please enter a target value within a reasonable range';
    }
    return true;
  }
  if (goalType === 'distance') {
    if (isNaN(targetValue) || targetValue <= 0) {
      return 'Please enter a positive target value';
    }
    if (targetValue > 100) {
      return 'Please enter a target value within a reasonable range';
    }
    return true;
  }
  if (goalType === 'caloriesBurned') {
    if (isNaN(targetValue) || targetValue <= 0) {
      return 'Please enter a positive target value';
    }
    if (targetValue > 5000) {
      return 'Please enter a target value within a reasonable range';
    }
    return true;
  }
  return 'Invalid goal type';
};

// Function to validate deadlines for goals
const validateDeadline = (deadline) => {
  if (!(deadline instanceof Date)) {
    return 'Please enter a valid date';
  }
  if (deadline < new Date()) {
    return 'Please enter a future date';
  }
  return true;
};

export { validateEmail, validatePassword, validateGoalTarget, validateDeadline };