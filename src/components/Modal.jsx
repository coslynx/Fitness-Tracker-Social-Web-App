import React, { useState } from 'react';
import { Modal, Box, Typography, Button } from '@material-ui/core';

const MyModal = ({ isOpen, title, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  if (typeof isOpen !== 'boolean') {
    console.error('Modal: isOpen prop must be a boolean');
    return null;
  }

  return (
    <Modal
      open={isModalOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      disableEnforceFocus
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
      >
        {title && <Typography variant="h6" id="modal-title">{title}</Typography>}
        <Typography variant="body1" id="modal-description">{children}</Typography>
        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default MyModal;