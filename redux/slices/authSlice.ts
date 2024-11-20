import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, LoginData, Role, SignupData } from '@/types/types';

interface AuthState {
    auth: AuthResponse;
    authLoading: boolean;
    authError: string | null;
    authMessage: string | null;
}

const initialState: AuthState = {
    auth: {
        token: '',
        role: Role.STUDENT,
        isApproved: false
    },
    authLoading: false,
    authError: null,
    authMessage: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuthStateOnLogout: (state) => initialState,

        resetAuth: (state) => {
            state.authLoading = false;
            state.authError = null;
            state.authMessage = null;
        },
        loginRequest: (state, action: PayloadAction<LoginData>) => {
            state.authLoading = true;
            state.authError = null;
            state.authMessage = null;
        },
        loginFailure: (state, action: PayloadAction<string>) => {
            state.authLoading = false;
            state.authError = action.payload;
            state.authMessage = null;
        },
        signupRequest: (state, action: PayloadAction<SignupData>) => {
            state.authLoading = true;
            state.authError = null;
            state.authMessage = null;
        },
        signupFailure: (state, action: PayloadAction<string>) => {
            state.authLoading = false;
            state.authError = action.payload;
            state.authMessage = null;
        },
        authSuccess: (state, action: PayloadAction<AuthResponse>) => {
            state.authLoading = false;
            state.auth = action.payload;
            state.authError = null;
            state.authMessage = 'success';
        },
    },
});

export const {
    loginRequest,
    authSuccess,
    loginFailure,
    resetAuth,
    signupRequest,
    signupFailure,
    resetAuthStateOnLogout
} = authSlice.actions;

export default authSlice.reducer;
