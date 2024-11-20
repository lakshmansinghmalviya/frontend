import { QuizAppBaseUrl } from '@/pages/_app';
import {
    deleteUserFailure,
    deleteUserRequest,
    deleteUserSuccess,
    fetchAdminProfileDataFailure,
    fetchAdminProfileDataRequest,
    fetchAdminProfileDataSuccess,
    fetchEducatorProfileDataFailure, fetchEducatorProfileDataRequest, fetchEducatorProfileDataSuccess,
    fetchUserFailure, fetchUserRequest, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, fetchUserSuccess,
    logoutUserFailure, logoutUserRequest, logoutUserSuccess,
    updateUserFailure, updateUserRequest, updateUserSuccess
} from '@/redux/slices/usersSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { AdminProfileData, EducatorProfileData, PageResponse, UnifiedResponse, User } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../hooks';

const getBaseUrl = () => `${QuizAppBaseUrl}/users`;
const getUserUrl = () => `${QuizAppBaseUrl}/users/currentUser`;
const getLogoutUrl = () => `${QuizAppBaseUrl}/users/logout`;
const getEducatorProfileUrl = () => `${QuizAppBaseUrl}/users/educatorProfileData`;
const getAdminProfileUrl = () => `${QuizAppBaseUrl}/users/adminProfileData`;

function* handleFetchUser() {
    try {
        const response: UnifiedResponse<User> = yield call(apiCall, getUserUrl(), 'GET', getAuthenticatedHeader());
        yield put(fetchUserSuccess(response.data));
    } catch (error) {
        yield put(fetchUserFailure((error as Error).message));
    }
}

function* handleFetchUsers(action: ReturnType<typeof fetchUsersRequest>) {
    let path = `${QuizAppBaseUrl}/users/filters?${action.payload}`
    if (action.payload.startsWith("public"))
        path = `${QuizAppBaseUrl}/users/filters/public?${action.payload.substring(6)}`
    try {
        console.log("path....", path);
        const response: UnifiedResponse<PageResponse<User>> = yield call(apiCall, path, 'GET',
            getAuthenticatedHeader());
        console.log("Data we got from the Api...", response.data);
        yield put(fetchUsersSuccess(response.data));
    } catch (error) {
        yield put(fetchUsersFailure((error as Error).message));
    }
}

function* handleLogoutUser() {
    try {
        yield call(apiCall, getLogoutUrl(), 'PUT', getAuthenticatedHeader());
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserFailure((error as Error).message));
    }
}

function* handleUpdateUser(action: ReturnType<typeof updateUserRequest>) {
    try {
        const response: UnifiedResponse<User> = yield call(apiCall, `${getBaseUrl()}/${action.payload.id}`, 'PUT', getAuthenticatedHeader(), action.payload);
        yield put(updateUserSuccess(response.data));
    } catch (error) {
        yield put(updateUserFailure((error as Error).message));
    }
}

function* handleDeleteUser(action: ReturnType<typeof deleteUserRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            `${getBaseUrl()}/${action.payload}`,
            'DELETE',
            getAuthenticatedHeader()
        );
        yield put(deleteUserSuccess(response.msg));
    } catch (error) {
        yield put(deleteUserFailure((error as Error).message));
    }
}


function* handleFetchEducatorProfileData() {
    try {
        const response: UnifiedResponse<EducatorProfileData> = yield call(apiCall, getEducatorProfileUrl(), 'GET', getAuthenticatedHeader());
        yield put(fetchEducatorProfileDataSuccess(response.data));
    } catch (error) {
        yield put(fetchEducatorProfileDataFailure((error as Error).message));
    }
}

function* handleFetchAdminProfileData() {
    try {
        const response: UnifiedResponse<AdminProfileData> = yield call(apiCall, getAdminProfileUrl(), 'GET', getAuthenticatedHeader());
        yield put(fetchAdminProfileDataSuccess(response.data));
    } catch (error) {
        yield put(fetchAdminProfileDataFailure((error as Error).message));
    }
}

export function* watchUsersSaga() {
    yield takeLatest(fetchUserRequest.type, handleFetchUser);
    yield takeLatest(fetchUsersRequest.type, handleFetchUsers);
    yield takeLatest(logoutUserRequest.type, handleLogoutUser);
    yield takeLatest(deleteUserRequest.type, handleDeleteUser);
    yield takeLatest(updateUserRequest.type, handleUpdateUser);
    yield takeLatest(fetchEducatorProfileDataRequest.type, handleFetchEducatorProfileData);
    yield takeLatest(fetchAdminProfileDataRequest.type, handleFetchAdminProfileData);
}
