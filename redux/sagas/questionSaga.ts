import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createQuestionFailure, createQuestionRequest, createQuestionSuccess,
    deleteQuestionFailure, deleteQuestionRequest, deleteQuestionSuccess,
    fetchQuestionsFailure, fetchQuestionsRequest, fetchQuestionsSuccess,
    updateQuestionFailure, updateQuestionRequest, updateQuestionSuccess,
} from '@/redux/slices/questionSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Question, PageResponse, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { QuizAppBaseUrl } from '@/pages/_app';

const getBaseUrl = () => `${QuizAppBaseUrl}/questions`;

function* handleCreateQuestion(action: ReturnType<typeof createQuestionRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, getBaseUrl(), 'POST', getAuthenticatedHeader(), action.payload);
        yield put(createQuestionSuccess(response.msg));
    } catch (error) {
        yield put(createQuestionFailure((error as Error).message));
    }
}

function* handleDeleteQuestion(action: ReturnType<typeof deleteQuestionRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, `${getBaseUrl()}/${action.payload}`, 'DELETE', getAuthenticatedHeader());
        yield put(deleteQuestionSuccess(response.msg));
    } catch (error) {
        yield put(deleteQuestionFailure((error as Error).message));
    }
}

function* handleFetchQuestions(action: ReturnType<typeof fetchQuestionsRequest>) {
    try {
        let path = `${getBaseUrl()}/filters?${action.payload}`;
        const response: UnifiedResponse<PageResponse<Question>> = yield call(apiCall, path, 'GET', getAuthenticatedHeader());
        yield put(fetchQuestionsSuccess(response.data));
    } catch (error) {
        yield put(fetchQuestionsFailure((error as Error).message));
    }
}

function* handleUpdateQuestion(action: ReturnType<typeof updateQuestionRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, `${getBaseUrl()}/${action.payload.id}`, 'PUT', getAuthenticatedHeader(), action.payload);
        yield put(updateQuestionSuccess(response.msg));
    } catch (error) {
        yield put(updateQuestionFailure((error as Error).message));
    }
}

export function* watchQuestionSaga() {
    yield takeLatest(createQuestionRequest.type, handleCreateQuestion);
    yield takeLatest(deleteQuestionRequest.type, handleDeleteQuestion);
    yield takeLatest(fetchQuestionsRequest.type, handleFetchQuestions);
    yield takeLatest(updateQuestionRequest.type, handleUpdateQuestion);
}
