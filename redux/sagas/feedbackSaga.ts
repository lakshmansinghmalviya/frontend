import { call, put, takeLatest } from 'redux-saga/effects';
import { createFeedbackFailure, createFeedbackRequest, createFeedbackSuccess } from '@/redux/slices/feedbackSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Feedback, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { feedbackEndpoints } from '@/common/endpoints/FeedbackEndpoint';

function* handleCreateFeedback(action: ReturnType<typeof createFeedbackRequest>) {
  try {
    const response: UnifiedResponse<string> = yield call(
      apiCall,
      feedbackEndpoints.base,
      'POST',
      getAuthenticatedHeader(),
      action.payload
    );
    yield put(createFeedbackSuccess(response.msg));
  } catch (error) {
    yield put(createFeedbackFailure((error as Error).message));
  }
}

export function* watchFeedbackSaga() {
  yield takeLatest(createFeedbackRequest.type, handleCreateFeedback);
}
