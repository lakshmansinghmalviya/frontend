import { useAppDispatch } from '@/redux/hooks';
import { updateUserRequest } from '@/redux/slices/usersSlice';
import { buttonStyle } from '@/styles/CommonStyle.module';
import styles from '@/styles/EditUserModal.module.css';
import { User } from '@/types/types';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { ChangeEvent, useState } from 'react';



interface EditProfileModalProps {
    user: User;
    handleClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ user, handleClose }) => {
    const [userData, setUserData] = useState<User>({ ...user, password: '' });
    const dispatch = useAppDispatch();
    const [errors, setErrors] = useState({
        name: '',
        password: '',
        bio: '',
        education: '',
    });

    const handleSaveEdit = async (updatedUser: User) => {
        dispatch(updateUserRequest(updatedUser))
        if (handleClose)
            handleClose();
    };

    const validateForm = (): boolean => {
        let valid = true;
        let nameError = '';
        let passwordError = '';
        let bioError = '';
        let educationError = '';

        if (!userData.name.trim()) {
            nameError = 'Name is required.';
            valid = false;
        } else if (userData.name.length < 3 || userData.name.length > 100) {
            nameError = 'Name should have between 3 and 100 characters.';
            valid = false;
        } else if (!/^[A-Za-z][A-Za-z0-9 ]*$/.test(userData.name)) {
            nameError = 'Name should start with a letter and contain only letters, numbers, and spaces.';
            valid = false;
        }

        if (userData.password && (userData.password.length < 8 || userData.password.length > 100)) {
            passwordError = 'Password should have between 8 and 100 characters.';
            valid = false;
        } else if (userData.password && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(userData.password)) {
            passwordError = 'Password must include at least one number, one uppercase letter, and one lowercase letter.';
            valid = false;
        }
        if (userData.bio && (userData.bio.length > 150)) {
            bioError = 'Bio should have maximum 150 characters.';
            valid = false;
        }
        if (userData.education && (userData.education.length > 150)) {
            educationError = 'Education should have maximum 150 characters.';
            valid = false;
        }

        setErrors({ name: nameError, password: passwordError, bio: bioError, education: educationError });
        return valid;
    };

    const handleSave = () => {
        if (validateForm())
            handleSaveEdit(userData);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            convertImageToBase64String(file);
        }
    };

    const convertImageToBase64String = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = (reader.result as string).replace('jpeg', 'png');
            setUserData((prevData) => ({
                ...prevData,
                profilePic: result,
            }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Modal open={true}>
                <Box className={styles.modalBox}>
                    <Typography variant="h6" component="h2" className={styles.title}>
                        Edit Profile
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="center" mt={1}>
                        <input
                            type="file"
                            accept="image/*"
                            id="profile-pic-upload"
                            onChange={handleProfilePictureChange}
                            className={styles.avatarLabel}
                        />
                        <label htmlFor="profile-pic-upload">
                            <Avatar
                                src={userData?.profilePic}
                                alt={userData?.name}
                                className={styles.avatar}
                            />
                        </label>
                    </Box>
                    <TextField
                        label="Email"
                        name="email"
                        fullWidth
                        value={userData.email}
                        margin="dense"
                        sx={{ fontSize: '14px' }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        label="Name"
                        name="name"
                        fullWidth
                        value={userData.name}
                        onChange={handleChange}
                        margin="dense"
                        className={styles.textField}
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                    <TextField
                        label="New Password"
                        name="password"
                        type="password"
                        fullWidth
                        value={userData.password}
                        onChange={handleChange}
                        margin="dense"
                        className={styles.textField}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                    />
                    <TextField
                        label="Bio"
                        name="bio"
                        fullWidth
                        multiline
                        maxRows={3}
                        value={userData.bio}
                        onChange={handleChange}
                        margin="dense"
                        className={styles.textField}
                        error={Boolean(errors.bio)}
                        helperText={errors.bio}
                    />
                    <TextField
                        label="Education"
                        name="education"
                        fullWidth
                        multiline
                        maxRows={3}
                        value={userData.education}
                        onChange={handleChange}
                        margin="dense"
                        className={styles.textField}
                        error={Boolean(errors.education)}
                        helperText={errors.education}
                    />
                    <Box sx={buttonStyle}>
                        <Button onClick={handleSave} variant="contained" color="primary">
                            Save
                        </Button>
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
};

export default EditProfileModal;
