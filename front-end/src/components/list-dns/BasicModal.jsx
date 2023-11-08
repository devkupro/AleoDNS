import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BasicList from './BasicList';

const style = {
  position: 'absolute',
  width: 200,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
  borderRadius:'20px',
};

export default function BasicModal({open,setOpen}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        slotProps={{
            backdrop: {
              sx: {
                //Your style here....
                backgroundColor: 'transparent',
              },
            },
          }}
        
      >
        <Box sx={style}>
          <BasicList/>
        </Box>
      </Modal>
    </div>
  );
}