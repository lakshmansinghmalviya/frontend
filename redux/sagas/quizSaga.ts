import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createQuizFailure,
    createQuizRequest,
    createQuizSuccess,
    deleteQuizFailure,
    deleteQuizRequest,
    deleteQuizSuccess,
    fetchQuizzesFailure,
    fetchQuizzesRequest,
    fetchQuizzesSuccess,
    updateQuizFailure,
    updateQuizRequest,
    updateQuizSuccess,
} from '@/redux/slices/quizSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Quiz, PageResponse, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { quizEndpoints } from '@/common/endpoints/QuizEnpoint';

function* handleCreateQuiz(action: ReturnType<typeof createQuizRequest>) {
    try {
        const response: UnifiedResponse<Quiz> = yield call(
            apiCall,
            quizEndpoints.base,
            'POST',
            getAuthenticatedHeader(),
            action.payload
        );
        yield put(createQuizSuccess(response.msg));
    } catch (error) {
        yield put(createQuizFailure((error as Error).message));
    }
}

function* handleFetchQuizzes(action: ReturnType<typeof fetchQuizzesRequest>) {
    try {
        const path = quizEndpoints.filters(action.payload);
        const response: UnifiedResponse<PageResponse<Quiz>> = yield call(
            apiCall,
            path,
            'GET',
            getAuthenticatedHeader()
        );
        yield put(fetchQuizzesSuccess(response.data));
    } catch (error) {
        yield put(fetchQuizzesFailure((error as Error).message));
    }
}

function* handleDeleteQuiz(action: ReturnType<typeof deleteQuizRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            quizEndpoints.deleteById(action.payload),
            'DELETE',
            getAuthenticatedHeader()
        );
        yield put(deleteQuizSuccess(response.msg));
    } catch (error) {
        yield put(deleteQuizFailure((error as Error).message));
    }
}

function* handleUpdateQuiz(action: ReturnType<typeof updateQuizRequest>) {
    try {
        const { id, ...updatedQuiz } = action.payload;
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            quizEndpoints.updateById(id),
            'PUT',
            getAuthenticatedHeader(),
            updatedQuiz
        );
        yield put(updateQuizSuccess(response.msg));
    } catch (error) {
        yield put(updateQuizFailure((error as Error).message));
    }
}

export function* watchQuizSaga() {
    yield takeLatest(createQuizRequest.type, handleCreateQuiz);
    yield takeLatest(fetchQuizzesRequest.type, handleFetchQuizzes);
    yield takeLatest(deleteQuizRequest.type, handleDeleteQuiz);
    yield takeLatest(updateQuizRequest.type, handleUpdateQuiz);
}
