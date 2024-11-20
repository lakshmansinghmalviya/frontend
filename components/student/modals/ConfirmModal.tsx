import { buttonStyle, modalStyle } from '@/styles/CommonStyle.module';
import WarningAmberTwoToneIcon from '@mui/icons-material/WarningAmberTwoTone';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { ReactNode } from 'react';

interface ConfirmModalProps {
    onClose: () => void;
    confirm: () => void;
    buttonName: string;
    text: string;
    icon?: ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onClose, confirm, buttonName, text, icon }) => {

    return (
        <Modal open={true}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h5">
                    <IconButton color="secondary" >
                        <WarningAmberTwoToneIcon sx={{ fontSize: '30px', color: 'red' }} />
                    </IconButton>
                    {text}
                </Typography>
                <div style={buttonStyle}>
                    <Button
                        onClick={() => { confirm(); }}
                        variant="contained"
                        style={{ color: 'white', background: 'dark' }}
                    >
                        {buttonName}
                    </Button>

                    <Button onClick={onClose} variant="outlined">
                        Cancel
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default ConfirmModal;
