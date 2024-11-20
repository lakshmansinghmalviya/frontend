import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetQuizState, updateQuizRequest } from '@/redux/slices/quizSlice';
import { RootState } from '@/redux/store';
import { buttonStyle, modalStyle } from '@/styles/CommonStyle.module';
import { Quiz, Severity } from '@/types/types';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import style from '@/styles/educator/CatQuizQuestionRow.module.css';

interface QuizEditModalProps {
    quiz: Quiz;
    onClose: () => void;
}

const QuizEditModal: React.FC<QuizEditModalProps> = ({ quiz, onClose }) => {
    const dispatch = useAppDispatch();
    const { quizMessage, quizError } = useAppSelector((state: RootState) => state.quiz);

    useEffect(() => {
        if (quizError) {
            toast.error(quizError, { position: 'top-center' });
            dispatch(resetQuizState())
        }
    }, [quizError]);

    const [quizData, setQuizData] = useState<Quiz>({ ...quiz });
    const [errors, setErrors] = useState({
        title: '',
        timeLimit: '',
        description: ''
    });

    const validateForm = (): boolean => {
        let valid = true;
        let titleError = '';
        let timeLimitError = '';
        let descriptionError = '';

        if (!quizData.title.trim()) {
            titleError = "Title is required.";
            valid = false;
        } else if (quizData.title.length < 3 || quizData.title.length > 100) {
            titleError = "Title should be between 3 and 100 characters.";
            valid = false;
        }

        if (quizData.timeLimit <= 0) {
            timeLimitError = "Time Limit must be greater than 0.";
            valid = false;
        }

        if (!quizData.description.trim()) {
            descriptionError = "Description is required.";
            valid = false;
        } else if (quizData.description.length < 10 || quizData.description.length > 500) {
            descriptionError = "Description should be between 10 and 500 characters.";
            valid = false;
        }

        setErrors({
            title: titleError,
            timeLimit: timeLimitError,
            description: descriptionError
        });

        return valid;
    };

    const handleChange = (e: SelectChangeEvent<number | Severity> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Quiz) => {
        const value = field === 'randomizeQuestions' ? (e.target as HTMLInputElement).checked : e.target.value;
        setQuizData(prevQuiz => ({
            ...prevQuiz,
            [field]: value,
        }));
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(updateQuizRequest(quizData));
            onClose();
        }
    };

    const handleQuizPictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            convertImageToBase64String(file);
        }
    };

    const convertImageToBase64String = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = (reader.result as string).replace('jpeg', 'png');
            setQuizData((quizData) => ({
                ...quizData,
                quizPic: result,
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Modal open={true}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        Edit Quiz
                    </Typography>
                    <form onSubmit={handleSave} autoComplete="off">
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl} sx={{ marginLeft: "20px" }}>
                            <InputLabel>Severity</InputLabel>
                            <Select
                                name="severity"
                                value={quizData.severity as Severity}
                                onChange={(e) => handleChange(e, 'severity')}
                                label="severity"
                            >
                                <MenuItem value={Severity.HARD}>Hard</MenuItem>
                                <MenuItem value={Severity.MEDIUM}>Medium</MenuItem>
                                <MenuItem value={Severity.BEGINNER}>Beginner</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Title"
                            fullWidth
                            value={quizData.title}
                            onChange={(e) => handleChange(e, 'title')}
                            margin="normal"
                            size='small'
                            error={Boolean(errors.title)}
                            helperText={errors.title}
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            rows={2}
                            value={quizData.description}
                            onChange={(e) => handleChange(e, 'description')}
                            margin="normal"
                            size='small'
                            error={Boolean(errors.description)}
                            helperText={errors.description}
                        />
                        <TextField
                            label="Time Limit (in minutes)"
                            name="timeLimit"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            type="number"
                            value={quizData.timeLimit}
                            onChange={(e) => handleChange(e, 'timeLimit')}
                            size='small'
                            error={Boolean(errors.timeLimit)}
                            helperText={errors.timeLimit}
                        />
                        <Box display="flex" alignItems="center" justifyContent={'center'} mt={1} mb={1}>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="quiz-pic-upload"
                                onChange={handleQuizPictureChange}
                            />
                            <label htmlFor="quiz-pic-upload">
                                <img
                                    src={quizData.quizPic}
                                    alt={quizData.title}
                                    style={{ maxWidth: '500px', maxHeight: '150px', margin: 'auto', border: '3px solid white' }}
                                />
                            </label>
                        </Box>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name="randomizeQuestions"
                                    checked={quizData.randomizeQuestions}
                                    onChange={(e) => handleChange(e, 'randomizeQuestions')}
                                />
                            }
                            label="Randomize Questions"
                        />
                        <div style={buttonStyle}>
                            <Button type='submit' variant="contained" color="primary">
                                Save
                            </Button>
                            <Button onClick={onClose} variant="outlined" color="secondary">
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default QuizEditModal;
