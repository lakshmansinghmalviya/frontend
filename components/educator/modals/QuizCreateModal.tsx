import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCategoriesRequest } from '@/redux/slices/categorySlice';
import { createQuizRequest, resetQuizState } from '@/redux/slices/quizSlice';
import { RootState } from '@/redux/store';
import { buttonStyle, buttonStyleFlexStart, modalStyle } from '@/styles/CommonStyle.module';
import style from '@/styles/educator/CatQuizQuestionRow.module.css';
import { Category, Quiz, Severity } from '@/types/types';
import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


interface QuizCreateModalProps {
    openQuizModal: boolean;
    handleClose: () => void;
}

const QuizCreateModal: React.FC<QuizCreateModalProps> = ({ openQuizModal, handleClose }) => {
    const dispatch = useAppDispatch();
    const { quizMessage, quizError, quiz } = useAppSelector((state: RootState) => state.quiz);
    const { categories } = useAppSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchCategoriesRequest(''));
    }, [dispatch]);

    useEffect(() => {
        if (quizMessage) {
            toast.success(quizMessage, { position: 'top-center', autoClose: 500 });
            setQuizData({ ...quiz, categoryId: -1 });
            dispatch(resetQuizState());
        }
        if (quizError) {
            toast.error(quizError, { position: 'top-center' });
            dispatch(resetQuizState());
        }
    }, [quizMessage, quizError]);

    const [quizData, setQuizData] = useState<Quiz>({
        ...quiz,
        categoryId: -1,
        severity: Severity.BEGINNER,
    });

    const [errors, setErrors] = useState({
        title: '',
        timeLimit: '',
        description: '',
        categoryId: '',
    });

    const validateForm = (): boolean => {
        let valid = true;
        const updatedErrors = {
            title: '',
            timeLimit: '',
            description: '',
            categoryId: '',
        };

        if (!quizData.categoryId || quizData.categoryId === -1) {
            updatedErrors.categoryId = 'Please select a category.';
            valid = false;
        }

        if (!quizData.title.trim()) {
            updatedErrors.title = 'Title is required.';
            valid = false;
        } else if (quizData.title.length < 3 || quizData.title.length > 50) {
            updatedErrors.title = 'Title should be between 3 and 50 characters.';
            valid = false;
        }

        if (quizData.timeLimit <= 0 || quizData.timeLimit > 300) {
            updatedErrors.timeLimit = 'Time Limit must be between 1 and 300 minutes.';
            valid = false;
        }

        if (!quizData.description.trim()) {
            updatedErrors.description = 'Description is required.';
            valid = false;
        } else if (quizData.description.length < 10 || quizData.description.length > 150) {
            updatedErrors.description = 'Description should be between 10 and 150 characters.';
            valid = false;
        }

        setErrors(updatedErrors);
        return valid;
    };

    const handleChange = (e: SelectChangeEvent<number | Severity> | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Quiz) => {
        const value = field === 'randomizeQuestions' ? (e.target as HTMLInputElement).checked : e.target.value;
        setQuizData(prevQuiz => ({
            ...prevQuiz,
            [field]: value,
        }));
        validateForm();
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(createQuizRequest(quizData));
        }
    };

    const handleQuizPictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            convertImageToBase64String(file);
        } else {
            toast.error('Invalid file type. Please upload an image.', { position: 'top-center' });
        }
    };

    const convertImageToBase64String = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = (reader.result as string).replace('jpeg', 'png');
            setQuizData(prevData => ({
                ...prevData,
                quizPic: result,
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <Modal open={openQuizModal} onClose={handleClose}>
            <Box sx={modalStyle}>
                <form onSubmit={handleSave} autoComplete="off">
                    <Typography variant="h6" component="h4" gutterBottom>
                        Create Quiz
                    </Typography>
                    <Box sx={buttonStyleFlexStart}>
                        <FormControl fullWidth margin="normal" variant="outlined" size="small" className={style.formControl}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="categoryId"
                                label="Category"
                                error={Boolean(errors.categoryId)}
                                onChange={(e) => handleChange(e, 'categoryId')}
                                value={quizData.categoryId}
                            >
                                {categories.content.map((category: Category) => (
                                    <MenuItem key={category.id} value={category.id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.categoryId && <Typography color="error" fontSize={12}>{errors.categoryId}</Typography>}
                        </FormControl>

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
                    </Box>

                    <TextField
                        label="Title"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={quizData.title}
                        onChange={(e) => handleChange(e, 'title')}
                        error={Boolean(errors.title)}
                        helperText={errors.title}
                    />

                    <TextField
                        label="Time Limit (minutes)"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type="number"
                        value={quizData.timeLimit}
                        onChange={(e) => handleChange(e, 'timeLimit')}
                        error={Boolean(errors.timeLimit)}
                        helperText={errors.timeLimit}
                    />

                    <TextField
                        label="Description"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        value={quizData.description}
                        onChange={(e) => handleChange(e, 'description')}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />

                    <Box display="flex" justifyContent="center" mt={1} mb={2}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="quiz-pic-upload"
                            onChange={handleQuizPictureChange}
                        />
                        <label htmlFor="quiz-pic-upload">
                            <img
                                src={quizData.quizPic || '/addPic.png'}
                                alt="Quiz"
                                style={{ maxWidth: '500px', maxHeight: '150px', border: '1px solid #ccc' }}
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

                    <Box sx={buttonStyle}>
                        <Button type="submit" variant="contained" color="primary">
                            Create
                        </Button>
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            Close
                        </Button>
                    </Box>
                </form>

            </Box>
        </Modal>
    );
};

export default QuizCreateModal;
