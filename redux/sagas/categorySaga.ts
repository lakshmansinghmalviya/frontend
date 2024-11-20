import { call, put, takeLatest } from 'redux-saga/effects';
import {
    createCategoryFailure, createCategoryRequest, createCategorySuccess,
    deleteCategoryFailure, deleteCategoryRequest, deleteCategorySuccess,
    fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess,
    updateCategoryFailure, updateCategoryRequest, updateCategorySuccess,
} from '@/redux/slices/categorySlice';
import { getAuthenticatedHeader } from '@/services/CommonServices';
import { Category, PageResponse, UnifiedResponse } from '@/types/types';
import { apiCall } from '../hooks';
import { QuizAppBaseUrl } from '@/pages/_app';

const getBaseUrl = () => `${QuizAppBaseUrl}/categories`;

function* handleCreateCategory(action: ReturnType<typeof createCategoryRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, getBaseUrl(), 'POST', getAuthenticatedHeader(), action.payload);
        yield put(createCategorySuccess(response.msg));
    } catch (error) {
        yield put(createCategoryFailure((error as Error).message));
    }
}

function* handleDeleteCategory(action: ReturnType<typeof deleteCategoryRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, `${getBaseUrl()}/${action.payload}`, 'DELETE', getAuthenticatedHeader());
        yield put(deleteCategorySuccess(response.msg));
    } catch (error) {
        yield put(deleteCategoryFailure((error as Error).message));
    }
}

function* handleFetchCategories(action: ReturnType<typeof fetchCategoriesRequest>) {
    let path = `${getBaseUrl()}/filters?${action.payload}`;
    try {
        const response: UnifiedResponse<PageResponse<Category>> = yield call(apiCall, path, 'GET', getAuthenticatedHeader());
        yield put(fetchCategoriesSuccess(response.data));
    } catch (error) {
        yield put(fetchCategoriesFailure((error as Error).message));
    }
}

function* handleUpdateCategory(action: ReturnType<typeof updateCategoryRequest>) {
    try {
        const response: UnifiedResponse<string> = yield call(apiCall, `${getBaseUrl()}/${action.payload.id}`, 'PUT', getAuthenticatedHeader(), action.payload);
        yield put(updateCategorySuccess(response.msg));
    } catch (error) {
        yield put(updateCategoryFailure((error as Error).message));
    }
}

export function* watchCategorySaga() {
    yield takeLatest(createCategoryRequest.type, handleCreateCategory);
    yield takeLatest(deleteCategoryRequest.type, handleDeleteCategory);
    yield takeLatest(fetchCategoriesRequest.type, handleFetchCategories);
    yield takeLatest(updateCategoryRequest.type, handleUpdateCategory);
}
