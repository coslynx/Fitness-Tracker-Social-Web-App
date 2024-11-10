import React from 'react';
import { Button } from '@material-ui/core';

const ButtonComponent = ({ label, onClick, type = 'button', variant = 'contained', disabled = false }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <Button
      variant={variant}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      role="button"
      aria-label={label}
    >
      {label}
    </Button>
  );
};

export default ButtonComponent;