import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Card, CardContent, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import CreateFourOptionCard from '../cards/CreateFourOptionCard';
import { Question, QuestionType } from '@/types/types';
import { toast, ToastContainer } from 'react-toastify';
import CreateTwoOptionCard from '../cards/CreateTwoOptionCard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createQuestionRequest, resetQuestionState } from '@/redux/slices/questionSlice';
import { RootState } from '@/redux/store';

interface QuestionCreateModalProps {
    onClose: () => void;
}

const QuestionCreateModal: React.FC<QuestionCreateModalProps> = ({ onClose }) => {
    const [questionType, setQuestionType] = useState<QuestionType>(QuestionType.FOUROPTION);
    const { questionMessage, questionError } = useAppSelector((state: RootState) => state.question);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (questionMessage) {
            toast.success(questionMessage, { position: 'top-center', autoClose: 500 });
            dispatch(resetQuestionState())
        }
        if (questionError) {
            toast.error(questionError, { position: 'top-center' });
            dispatch(resetQuestionState())
        }
    }, [questionMessage, questionError]);

    const handleAddQuestion = async (question: Question) => {
        dispatch(createQuestionRequest({ ...question, questionType: questionType }))
    }

    const renderQuestion = () => {
        if (questionType == QuestionType.FOUROPTION)
            return <CreateFourOptionCard handleAddQuestion={handleAddQuestion}
                onClose={onClose}
            />
        if (questionType == QuestionType.TWOOPTION)
            return <CreateTwoOptionCard handleAddQuestion={handleAddQuestion}
                onClose={onClose}
            />

        return <CreateFourOptionCard handleAddQuestion={handleAddQuestion}
            onClose={onClose}
        />
    }

    return (
        <Modal open={true} onClose={onClose}
        >
            <Box
                sx={boxStyle}
            >
                <Card sx={{ minWidth: 300, maxWidth: 600, margin: 'auto', mt: 4 }}>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Create a Question
                        </Typography>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="question-type-label">Question Type</InputLabel>
                            <Select
                                labelId="question-type-label"
                                id="question-type"
                                value={questionType}
                                label="Question Type"
                                onChange={(e) => setQuestionType(e.target.value as QuestionType)}
                            >
                                <MenuItem value={QuestionType.FOUROPTION}>4 Option Question</MenuItem>
                                <MenuItem value={QuestionType.TWOOPTION}>2 Option Question</MenuItem>
                            </Select>
                            {
                                renderQuestion()
                            }
                        </FormControl>
                    </CardContent>
                </Card>

            </Box>
        </Modal>
    );
};

const boxStyle = {
    maxHeight: '95%',
    margin: 'auto',
    overflow: 'auto'
}

export default QuestionCreateModal;
