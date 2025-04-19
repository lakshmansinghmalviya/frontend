import { call, put, takeLatest } from 'redux-saga/effects';
import {
  createBookmarkRequest,
  createBookmarkSuccess,
  createBookmarkFailure,
  fetchBookmarksRequest,
  fetchBookmarksSuccess,
  fetchBookmarksFailure,
  deleteBookmarkRequest,
  deleteBookmarkSuccess,
  deleteBookmarkFailure,
} from '@/redux/slices/bookmarkSlice';

import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Bookmark, PageResponse, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { bookmarkEndpoints } from '@/common/endpoints/BookmarkEndpoint';

function* handleCreateBookmark(action: ReturnType<typeof createBookmarkRequest>) {
  try {
    const response: UnifiedResponse<string> = yield call(
      apiCall,
      bookmarkEndpoints.base,
      'POST',
      getAuthenticatedHeader(),
      action.payload
    );
    yield put(createBookmarkSuccess(response.msg));
  } catch (error) {
    yield put(createBookmarkFailure((error as Error).message));
  }
}

function* handleFetchBookmarks(action: ReturnType<typeof fetchBookmarksRequest>) {
  try {
    const path = bookmarkEndpoints.filters(action.payload);
    const response: UnifiedResponse<PageResponse<Bookmark>> = yield call(
      apiCall,
      path,
      'GET',
      getAuthenticatedHeader()
    );
    yield put(fetchBookmarksSuccess(response.data));
  } catch (error) {
    yield put(fetchBookmarksFailure((error as Error).message));
  }
}

function* handleDeleteBookmark(action: ReturnType<typeof deleteBookmarkRequest>) {
  try {
    const response: UnifiedResponse<string> = yield call(
      apiCall,
      bookmarkEndpoints.deleteById(action.payload),
      'DELETE',
      getAuthenticatedHeader()
    );
    yield put(deleteBookmarkSuccess(response.msg));
  } catch (error) {
    yield put(deleteBookmarkFailure((error as Error).message));
  }
}

export function* watchBookmarkSaga() {
  yield takeLatest(createBookmarkRequest.type, handleCreateBookmark);
  yield takeLatest(fetchBookmarksRequest.type, handleFetchBookmarks);
  yield takeLatest(deleteBookmarkRequest.type, handleDeleteBookmark);
}
