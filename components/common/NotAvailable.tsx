import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }`;

const NotAvailable = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                backgroundColor: '#f5f5f5',
                animation: `${fadeIn} 0.5s ease-in-out`,
            }}>
            <Card
                sx={{
                    borderRadius: 2,
                    boxShadow: 5,
                    overflow: 'hidden',
                }}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary" textAlign="center">
                        The content you are looking for is not available. Please try again later.
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default NotAvailable;
