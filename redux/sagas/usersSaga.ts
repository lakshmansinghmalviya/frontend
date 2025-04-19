import { call, put, takeLatest } from 'redux-saga/effects';
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
    updateUserFailure, updateUserRequest, updateUserSuccess,
} from '@/redux/slices/usersSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { AdminProfileData, EducatorProfileData, PageResponse, UnifiedResponse, User } from '@/types/types';
import { apiCall } from '../hooks';
import { usersEndpoints } from '@/common/endpoints/UserEndpoint';

function* handleFetchUser() {
    try {
        const response: UnifiedResponse<User> = yield call(apiCall, usersEndpoints.currentUser, 'GET', getAuthenticatedHeader());
        yield put(fetchUserSuccess(response.data));
    } catch (error) {
        yield put(fetchUserFailure((error as Error).message));
    }
}

function* handleFetchUsers(action: ReturnType<typeof fetchUsersRequest>) {
    let path = usersEndpoints.filters(action.payload);
    if (action.payload.startsWith("public")) {
        path = `${usersEndpoints.filters("public")}?${action.payload.substring(6)}`;
    }
    try {
        const response: UnifiedResponse<PageResponse<User>> = yield call(apiCall, path, 'GET', getAuthenticatedHeader());
        yield put(fetchUsersSuccess(response.data));
    } catch (error) {
        yield put(fetchUsersFailure((error as Error).message));
    }
}

function* handleLogoutUser() {
    try {
        yield call(apiCall, usersEndpoints.logout, 'PUT', getAuthenticatedHeader());
        yield put(logoutUserSuccess());
    } catch (error) {
        yield put(logoutUserFailure((error as Error).message));
    }
}

function* handleUpdateUser(action: ReturnType<typeof updateUserRequest>) {
    try {
        const response: UnifiedResponse<User> = yield call(
            apiCall,
            usersEndpoints.getById(action.payload.id),
            'PUT',
            getAuthenticatedHeader(),
            action.payload
        );
        yield put(updateUserSuccess(response.data));
    } catch (error) {
        yield put(updateUserFailure((error as Error).message));
    }
}

function* handleDeleteUser(action: ReturnType<typeof deleteUserRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            usersEndpoints.getById(action.payload),
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
        const response: UnifiedResponse<EducatorProfileData> = yield call(
            apiCall,
            usersEndpoints.educatorProfileData,
            'GET',
            getAuthenticatedHeader()
        );
        yield put(fetchEducatorProfileDataSuccess(response.data));
    } catch (error) {
        yield put(fetchEducatorProfileDataFailure((error as Error).message));
    }
}

function* handleFetchAdminProfileData() {
    try {
        const response: UnifiedResponse<AdminProfileData> = yield call(
            apiCall,
            usersEndpoints.adminProfileData,
            'GET',
            getAuthenticatedHeader()
        );
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
