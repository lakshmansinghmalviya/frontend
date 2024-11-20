import { QuizAppBaseUrl } from '@/pages/_app';
import { Bookmark, PageResponse, UnifiedResponse } from '@/types/types';
import { call, put, takeLatest } from 'redux-saga/effects';
import { createBookmarkRequest, createBookmarkSuccess, createBookmarkFailure, fetchBookmarksRequest, fetchBookmarksSuccess, fetchBookmarksFailure, deleteBookmarkRequest, deleteBookmarkSuccess, deleteBookmarkFailure } from '@/redux/slices/bookmarkSlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { apiCall } from '../hooks';

const getBookmarkUrl = () => `${QuizAppBaseUrl}/bookmarks`;

function* handleCreateBookmark(action: ReturnType<typeof createBookmarkRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, getBookmarkUrl(), 'POST', getAuthenticatedHeader(), action.payload);
        yield put(createBookmarkSuccess(response.msg));
    } catch (error) {
        yield put(createBookmarkFailure((error as Error).message));
    }
}
function* handleFetchBookmarks(action: ReturnType<typeof fetchBookmarksRequest>) {
    let path = `${getBookmarkUrl()}/filters?${action.payload}`;
    try {
        const response: UnifiedResponse<PageResponse<Bookmark>> = yield call(apiCall, path, 'GET', getAuthenticatedHeader());
        
        yield put(fetchBookmarksSuccess(response.data));
    } catch (error) {
        yield put(fetchBookmarksFailure((error as Error).message));
    }
}

function* handleDeleteBookmark(action: ReturnType<typeof deleteBookmarkRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, `${getBookmarkUrl()}/${action.payload}`, 'DELETE', getAuthenticatedHeader());
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
