import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const NotFound = () => {
    return (
        <Card
            sx={{
                maxWidth: 400,
                margin: 'auto',
                marginTop: 8,
                borderRadius: 2,
                boxShadow: 3,
            }}
        >
            <CardMedia
                component="img"
                height="300"
                image="/error.png"
                alt="Not Found"
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" textAlign="center" fontWeight='bold'>
                    Not Found
                </Typography>
            </CardContent>
        </Card>
    );
};

export default NotFound;
