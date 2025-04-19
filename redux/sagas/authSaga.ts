import { call, put, takeLatest } from 'redux-saga/effects';
import {
  authSuccess,
  loginFailure,
  loginRequest,
  signupFailure,
  signupRequest,
} from '@/redux/slices/authSlice';

import { getPublicHeader } from '@/services/CommonServices';
import { AuthResponse, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { authEndpoints } from '@/common/endpoints/AuthEndpoint';

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: UnifiedResponse<AuthResponse> = yield call(
      apiCall,
      authEndpoints.login,
      'POST',
      getPublicHeader(),
      action.payload
    );
    yield put(authSuccess(response.data));
  } catch (error) {
    yield put(loginFailure((error as Error).message));
  }
}

function* handleSignup(action: ReturnType<typeof signupRequest>) {
  try {
    const response: UnifiedResponse<AuthResponse> = yield call(
      apiCall,
      authEndpoints.register,
      'POST',
      getPublicHeader(),
      action.payload
    );
    yield put(authSuccess(response.data));
  } catch (error) {
    yield put(signupFailure((error as Error).message));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(signupRequest.type, handleSignup);
}
