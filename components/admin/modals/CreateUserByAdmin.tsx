import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetAuth, signupRequest } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/auth/SignupForm.module.css';
import { buttonStyle, modalStyle } from '@/styles/CommonStyle.module';
import { Role, SignupData } from '@/types/types';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';


interface CreateUserByAdminProps {
  onClose: () => void;
}

const CreateUserByAdmin: React.FC<CreateUserByAdminProps> = ({ onClose }) => {
  const { authError, authMessage } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    role: Role.STUDENT,
    profilePic: '',
    bio: '',
    education: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    education: ''
  });

  useEffect(() => {
    if (authMessage) {
      toast.success('User created successfully', { position: 'top-center' });
      dispatch(resetAuth());
      setFormData({
        name: '',
        email: '',
        password: '',
        role: Role.STUDENT,
        profilePic: '',
        bio: '',
        education: '',
      })
    }
    if (authError) {
      toast.error(authError, { position: 'top-center' });
      dispatch(resetAuth());
    }
  }, [authError, authMessage,]);

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
      setFormData((prevData) => ({
        ...prevData,
        profilePic: result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e: SelectChangeEvent<Role>) => {
    setFormData((prevData) => ({
      ...prevData,
      role: e.target.value as Role,
    }));
  };

  const validateForm = (): boolean => {
    let valid = true;
    let nameError = '';
    let emailError = '';
    let passwordError = '';

    if (!formData.name.trim()) {
      nameError = 'Name is required.';
      valid = false;
    } else if (formData.name.length < 3 || formData.name.length > 100) {
      nameError = 'Name should have between 3 and 100 characters.';
      valid = false;
    } else if (!/^[A-Za-z][A-Za-z0-9 ]*$/.test(formData.name)) {
      nameError = 'Name should start with a letter and contain only letters, numbers, and spaces.';
      valid = false;
    }

    if (!formData.email.trim()) {
      emailError = 'Email is required.';
      valid = false;
    } else if (!/^[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(formData.email)) {
      emailError = 'Please enter a valid email address.';
      valid = false;
    }

    if (!formData.password) {
      passwordError = 'Password is required.';
      valid = false;
    } else if (formData.password.length < 8 || formData.password.length > 100) {
      passwordError = 'Password should have between 8 and 100 characters.';
      valid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(formData.password)) {
      passwordError = 'Password must include at least one number, one uppercase letter, and one lowercase letter.';
      valid = false;
    }

    setErrors({ name: nameError, email: emailError, password: passwordError, bio: '', education: '' });
    return valid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm())
      dispatch(signupRequest(formData));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <>
      <Modal open={true} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={3} sx={{ height: '100%', maxWidth: '600px' }}>
          <Box p={4} sx={modalStyle}>
            <Typography variant="h4" gutterBottom className={styles.title}>
              Create an Account
            </Typography>
            <form onSubmit={handleSubmit} className={styles.form}>
              <Box display="flex" alignItems="center" justifyContent={'center'} mt={1} mb={1}>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-pic-upload"
                  onChange={handleProfilePictureChange}
                />
                <label htmlFor="profile-pic-upload">
                  <Avatar
                    src={formData.profilePic || ""}
                    alt="Profile Picture"
                    className={styles.avatar}
                  />
                </label>
              </Box>

              <div style={
                {
                  display: 'grid',
                  gridTemplateColumns: 'auto auto',
                  columnGap: '30px'
                }}>
                <TextField
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                />

                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    error={Boolean(errors.password)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          onMouseUp={handleMouseUpPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  {errors.password && <Typography color="error" fontSize={12}>{errors.password}</Typography>}
                </FormControl>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                    label="Role"
                  >
                    <MenuItem value={Role.STUDENT}>Student</MenuItem>
                    <MenuItem value={Role.EDUCATOR}>Educator</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  label="Bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Education"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />

              </div>
              <div style={buttonStyle}>
                <Button variant="contained" color="primary" type="submit">
                  Create
                </Button>
                <Button onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </form>
          </Box>
        </Paper>
      </Modal>

    </>
  );
};

export default CreateUserByAdmin;
