import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createResultFailure, createResultRequest, createResultSuccess,
    fetchResultsFailure, fetchResultsRequest, fetchResultsSuccess,
    fetchUserResultDataFailure, fetchUserResultDataRequest, fetchUserResultDataSuccess,
} from '@/redux/slices/resultSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Result, PageResponse, UnifiedResponse, UserResultData } from '@/types/types';
import { apiCall } from '../hooks'; 
import { resultEndpoints } from '@/common/endpoints/ResultEnpoint';

function* handleCreateResult(action: ReturnType<typeof createResultRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            resultEndpoints.base,
            'POST',
            getAuthenticatedHeader(),
            action.payload
        );
        yield put(createResultSuccess(response.msg));
    } catch (error) {
        yield put(createResultFailure((error as Error).message));
    }
}

function* handleFetchResults(action: ReturnType<typeof fetchResultsRequest>) {
    try {
        const path = resultEndpoints.filters(action.payload);
        console.log("Header is coming like this in the saga "+getAuthenticatedHeader());
        const response: UnifiedResponse<PageResponse<Result>> = yield call(
            apiCall,
            path,
            'GET',
            getAuthenticatedHeader()
        );
        yield put(fetchResultsSuccess(response.data));
    } catch (error) {
        yield put(fetchResultsFailure((error as Error).message));
    }
}

function* handleFetchUserResultData(action: ReturnType<typeof fetchUserResultDataRequest>) {
    try {
        const response: UnifiedResponse<UserResultData> = yield call(
            apiCall,
            resultEndpoints.userProfileData,
            'GET',
            getAuthenticatedHeader()
        );
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
