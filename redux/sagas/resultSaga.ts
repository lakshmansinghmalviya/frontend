import { QuizAppBaseUrl } from '@/pages/_app';
import { PageResponse, Result, UnifiedResponse, UserResultData } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createResultFailure, createResultRequest, createResultSuccess,
    fetchResultsFailure, fetchResultsRequest, fetchResultsSuccess,
    fetchUserResultDataFailure, fetchUserResultDataRequest, fetchUserResultDataSuccess
} from '@/redux/slices/resultSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { apiCall } from '../hooks';

const getBaseResultUrl = () => `${QuizAppBaseUrl}/results`;
const getUserResultDataUrl = () => `${QuizAppBaseUrl}/results/userProfileData`;

function* handleCreateResult(action: ReturnType<typeof createResultRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, getBaseResultUrl(), 'POST', getAuthenticatedHeader(), action.payload);
        yield put(createResultSuccess(response.msg));
    } catch (error) {
        yield put(createResultFailure((error as Error).message));
    }
}

function* handleFetchResults(action: ReturnType<typeof fetchResultsRequest>) {
    let path = `${getBaseResultUrl()}/filters?${action.payload}`;
    try {
        const response: UnifiedResponse<PageResponse<Result>> = yield call(apiCall, path, 'GET', getAuthenticatedHeader());
        
        yield put(fetchResultsSuccess(response.data));
    }
    catch (error) {
        yield put(fetchResultsFailure((error as Error).message));
    }
}

function* handleFetchUserResultData(action: ReturnType<typeof fetchUserResultDataRequest>) {
    try {
        const response: UnifiedResponse<UserResultData> = yield call(apiCall, getUserResultDataUrl(), 'GET', getAuthenticatedHeader());
        
        yield put(fetchUserResultDataSuccess(response.data));
    } catch (error) {
        yield put(fetchUserResultDataFailure((error as Error).message));
    }
}

export function* watchResultSaga() {
    yield takeLatest(createResultRequest.type, handleCreateResult);
    yield takeLatest(fetchResultsRequest.type, handleFetchResults);
    yield takeLatest(fetchUserResultDataRequest.type, handleFetchUserResultData);
}
