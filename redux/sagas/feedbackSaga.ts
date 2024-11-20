import { QuizAppBaseUrl } from '@/pages/_app';
import { Feedback, UnifiedResponse } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createFeedbackFailure, createFeedbackRequest, createFeedbackSuccess } from '../slices/feedbackSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { apiCall } from '../hooks';

const getFeedbackUrl = () => `${QuizAppBaseUrl}/feedbacks`;

function* handleCreateFeedback(action: ReturnType<typeof createFeedbackRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, getFeedbackUrl(), 'POST', getAuthenticatedHeader(), action.payload);
        yield put(createFeedbackSuccess(response.msg));
    } catch (error) {
        yield put(createFeedbackFailure((error as Error).message));
    }
}

export function* watchFeedbackSaga() {
    yield takeLatest(createFeedbackRequest.type, handleCreateFeedback);
}
