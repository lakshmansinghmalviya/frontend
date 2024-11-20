import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetQuestionState, updateQuestionRequest } from '@/redux/slices/questionSlice';
import { RootState } from '@/redux/store';
import { Question, } from '@/types/types';
import { Card, CardContent, FormControl } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import UpdateFourOptionCard from '../cards/UpdateFourOptionCard';
import UpdateTwoOptionCard from '../cards/UpdateTwoOptionCard';


interface QuestionEditModalProps {
    question: Question;
    onClose: () => void;
    index: number;
}

const QuestionEditModal: React.FC<QuestionEditModalProps> = ({ question, onClose, index }) => {
    const dispatch = useAppDispatch();
    const { questionMessage, questionError } = useAppSelector((state: RootState) => state.question);

    useEffect(() => {
        if (questionMessage) {
            toast.success(questionMessage, { position: 'top-center', autoClose: 600 });
            dispatch(resetQuestionState())
        }
        if (questionError) {
            toast.error(questionError, { position: 'top-center' });
            dispatch(resetQuestionState())
        }
    }, [questionError, questionMessage]);

    const handleUpdateQuestion = async (question: Question) => {
        dispatch(updateQuestionRequest(question))
    }

    const renderQuestion = () => {
        if (question.options.length == 4)
            return <UpdateFourOptionCard handleUpdateQuestion={handleUpdateQuestion}
                question={question}
                onClose={onClose}
                index={index}
            />
        if (question.options.length == 2)
            return <UpdateTwoOptionCard handleUpdateQuestion={handleUpdateQuestion}
                question={question}
                onClose={onClose}
                index={index}
            />

        return <UpdateFourOptionCard handleUpdateQuestion={handleUpdateQuestion}
            question={question}
            onClose={onClose}
            index={index + 1}
        />
    }

    return (
        <>
            <Modal open={true} onClose={onClose}>
                <Box sx={boxStyle}>
                    {renderQuestion()}
                </Box>
            </Modal>
        </>
    );
};

const boxStyle = {
    maxHeight: '95%',
    margin: 'auto',
    overflow: 'auto'
}

export default QuestionEditModal;
