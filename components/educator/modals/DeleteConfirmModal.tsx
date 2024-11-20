import { buttonStyle, modalStyle } from '@/styles/CommonStyle.module';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React from 'react';

interface  DeleteConfirmModalProps {
    onClose: () => void;
    confirm: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ onClose,confirm }) => {
    return (
        <Modal open={true}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h2">
                    <IconButton color="secondary" >
                        <DeleteIcon
                            sx={{ fontSize: '50px', color: 'red' }}
                        />
                    </IconButton>
                    Are you sure to delete ?
                </Typography>
                <div style={buttonStyle}>
                    <Button onClick={confirm} variant="contained" style={{color:'white',background:'red'}}>
                        Confirm
                    </Button>
                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default DeleteConfirmModal;
