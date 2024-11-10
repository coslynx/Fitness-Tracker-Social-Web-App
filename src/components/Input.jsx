import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import DOMPurify from 'dompurify'; // For input sanitization

const Input = ({ label, type, value, onChange, placeholder, required, error, helperText }) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    onChange(DOMPurify.sanitize(event.target.value)); // Sanitize input
  };

  return (
    <TextField
      label={label}
      type={type}
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      required={required}
      error={error}
      helperText={helperText}
      fullWidth
    />
  );
};

export default Input;