import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { createCategoryPopupReset, createCategoryRequest } from '@/redux/slices/categorySlice';
import { RootState } from '@/redux/store';
import { buttonStyle } from '@/styles/CommonStyle.module';
import { Category } from '@/types/types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';



interface CategoryCreateModalProps {
    onClose: () => void;
}

const CategoryCreateModal: React.FC<CategoryCreateModalProps> = ({ onClose }) => {
    const { categoryError, categoryMessage, category } = useAppSelector((state: RootState) => state.category);
    const dispatch = useAppDispatch();
    const [categoryData, setCategoryData] = useState<Category>(category);

    const [errors, setErrors] = useState({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (categoryMessage) {
            toast.success(categoryMessage, { position: 'top-center', autoClose: 600 });
            setCategoryData({ ...category });
            dispatch(createCategoryPopupReset())
        }
        if (categoryError) {
            toast.error(categoryError, { position: 'top-center' });
            dispatch(createCategoryPopupReset())
        }
    }, [categoryMessage, categoryError])

    const validateForm = (): boolean => {
        let valid = true;
        let nameError = '';
        let descriptionError = '';

        if (!categoryData.name.trim()) {
            nameError = "Name is required.";
            valid = false;
        } else if (categoryData.name.length < 3 || categoryData.name.length > 100) {
            nameError = "Name should have between 3 and 100 characters.";
            valid = false;
        } else if (!/^[A-Za-z][A-Za-z0-9 ]*$/.test(categoryData.name)) {
            nameError = "Name should start with a letter and contain only letters, numbers, and spaces.";
            valid = false;
        }

        if (!categoryData.description.trim()) {
            descriptionError = "Description is required.";
            valid = false;
        } else if (categoryData.description.length < 10 || categoryData.description.length > 500) {
            descriptionError = "Description should have between 10 and 500 characters.";
            valid = false;
        }

        setErrors({
            name: nameError,
            description: descriptionError,
        });

        return valid;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Category) => {
        setCategoryData((prevCategory) => ({
            ...prevCategory,
            [field]: e.target.value,
        }));
    };

    const handleSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(createCategoryRequest(categoryData));
        }
    };

    const handleCategoryPictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            convertImageToBase64String(file);
        }
    };

    const convertImageToBase64String = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = (reader.result as string).replace('jpeg', 'png');
            setCategoryData((prevData) => ({
                ...prevData,
                categoryPic: result,
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyle}>
                <Typography variant="h6" component="h4" gutterBottom>
                    Create Category
                </Typography>
                <form onSubmit={handleSave} autoComplete="off">
                    <TextField
                        margin="normal"
                        label="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={categoryData.name}
                        onChange={(e) => handleChange(e, 'name')}
                        sx={{ mb: 3 }}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />

                    <TextField
                        type="text"
                        label="Description"
                        name="description"
                        value={categoryData.description}
                        onChange={(e) => handleChange(e, 'description')}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={2}
                        error={Boolean(errors.description)}
                        helperText={errors.description}
                    />
                    <Box display="flex" alignItems="center" justifyContent={'center'} mt={1} mb={1}>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="category-pic-upload"
                            onChange={handleCategoryPictureChange}
                        />
                        <label htmlFor="category-pic-upload">
                            <img
                                src={categoryData?.categoryPic}
                                alt={categoryData?.name}
                                style={{ maxWidth: '500px', maxHeight: '150px', margin: 'auto', border: '3px solid white' }}
                            />
                        </label>
                    </Box>
                    <div style={buttonStyle}>
                        <Button variant="contained" color="primary" type='submit'>
                            Create
                        </Button>
                        <Button onClick={onClose} variant="outlined" color="secondary" >
                            Close
                        </Button>
                    </div>
                </form>

            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '8px',
    p: 2,
};

export default CategoryCreateModal;
