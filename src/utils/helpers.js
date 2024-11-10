// src/utils/helpers.js

// Import necessary dependencies
import moment from 'moment';

// Function to format dates into a user-friendly format
export const formatDate = (dateString, format = 'MMMM Do YYYY, h:mm:ss a') => {
  // Use moment.js to handle date formatting
  const date = moment(dateString);
  return date.isValid() ? date.format(format) : 'Invalid Date';
};

// Function to capitalize the first letter of a string
export const capitalize = (str) => {
  // Handle empty strings gracefully
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Function to generate a random unique identifier (useful for creating temporary IDs)
export const generateUniqueId = () => {
  // Use a combination of Date.now() and Math.random() to generate a unique ID
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
};

// Function to sanitize user input using a library like DOMPurify (this prevents XSS attacks)
export const sanitizeInput = (input) => {
  // If you're using DOMPurify, import it and sanitize the input here
  // For example:
  // import DOMPurify from 'dompurify'; 
  // return DOMPurify.sanitize(input);
  // For a basic sanitization, you can use regular expressions to remove potentially harmful characters
  return input.replace(/<[^>]+>/g, ''); 
};