import { QuizAppBaseUrl } from '@/pages/_app';
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
    updateQuizSuccess
} from '@/redux/slices/quizSlice';
import { getAuthenticatedHeader, getPublicHeader } from '@/services/CommonServices';
import { PageResponse, Quiz, UnifiedResponse } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../hooks';

const getBaseUrl = () => `${QuizAppBaseUrl}/quizzes`;

function* handleCreateQuiz(action: ReturnType<typeof createQuizRequest>) {
    try {
        const response: UnifiedResponse<Quiz> = yield call(
            apiCall,
            getBaseUrl(),
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
        let path = `${getBaseUrl()}/filters?${action.payload}`;
        const response: UnifiedResponse<PageResponse<Quiz>> = yield call(
            apiCall,
            path,
            'GET',
            getAuthenticatedHeader(),
        );


        yield put(fetchQuizzesSuccess(response.data));
    }
    catch (error) {
        yield put(fetchQuizzesFailure((error as Error).message));
    }
}

function* handleDeleteQuiz(action: ReturnType<typeof deleteQuizRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(
            apiCall,
            `${QuizAppBaseUrl}/quizzes/${action.payload}`,
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
            `${QuizAppBaseUrl}/quizzes/${id}`,
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
