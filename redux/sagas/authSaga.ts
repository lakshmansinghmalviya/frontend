import { QuizAppBaseUrl } from '@/pages/_app';
import {
    authSuccess,
    loginFailure, loginRequest, signupFailure, signupRequest
} from '@/redux/slices/authSlice';
import { getPublicHeader } from '@/services/CommonServices';
import { AuthResponse, UnifiedResponse } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../hooks';

const getAuthUrl = (path: string) => `${QuizAppBaseUrl}/api/auth/${path}`;

function* handleLogin(action: ReturnType<typeof loginRequest>) {
    console.log("Login request is coming like ==" + getAuthUrl('login'));
    try {
        const response: UnifiedResponse<AuthResponse> = yield call(apiCall, getAuthUrl('login'), 'POST', getPublicHeader(), action.payload);
        yield put(authSuccess(response.data));
    } catch (error) {
        yield put(loginFailure((error as Error).message));
    }
}

function* handleSignup(action: ReturnType<typeof signupRequest>) {
    try {
        const response: UnifiedResponse<AuthResponse> = yield call(apiCall, getAuthUrl('register'), 'POST', getPublicHeader(), action.payload);

        yield put(authSuccess(response.data));
    } catch (error) {
        yield put(signupFailure((error as Error).message));
    }
}

export function* watchAuthSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
    yield takeLatest(signupRequest.type, handleSignup);
}
