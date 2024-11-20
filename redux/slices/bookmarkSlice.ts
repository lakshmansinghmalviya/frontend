import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bookmark, PageResponse } from '@/types/types';
import { getPageObject } from '@/services/CommonServices';

interface BookmarkState {
    bookmark: Bookmark;
    bookmarkLoading: boolean;
    bookmarkError: string | null;
    bookmarkMessage: string | null;
    bookmarks: PageResponse<Bookmark>;
}

const initialState: BookmarkState = {
    bookmark: {
        id: 0,
        quizId: 0,
        isBookmarked: false,
    },
    bookmarkLoading: false,
    bookmarkError: null,
    bookmarkMessage: null,
    bookmarks: getPageObject(),
};

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState,
    reducers: {
        resetBookmarkMessage(state) {
            state.bookmarkMessage = null;
            state.bookmarkError = null;
        },
        createBookmarkRequest(state, action: PayloadAction<Bookmark>) {
            state.bookmarkLoading = true;
            state.bookmarkError = null;
        },
        createBookmarkSuccess(state, action: PayloadAction<string>) {
            state.bookmarkLoading = false;
            state.bookmarkError = null;
            state.bookmarkMessage = action.payload;
        },
        createBookmarkFailure(state, action: PayloadAction<string>) {
            state.bookmarkLoading = false;
            state.bookmarkError = action.payload;
        },
        resetBookmarkState(state) {
            state = initialState;
        },
        fetchBookmarksRequest(state, action: PayloadAction<string>) {
            state.bookmarkLoading = true;
            state.bookmarkError = null;
        },
        fetchBookmarksSuccess(state, action: PayloadAction<PageResponse<Bookmark>>) {
            state.bookmarkLoading = false;
            state.bookmarkError = null;
            state.bookmarks = action.payload;
        },
        fetchBookmarksFailure(state, action: PayloadAction<string>) {
            state.bookmarkLoading = false;
            state.bookmarkError = action.payload;
        },
        deleteBookmarkRequest(state, action: PayloadAction<number>) {
            state.bookmarkLoading = true;
            state.bookmarkError = null;
        },
        deleteBookmarkSuccess(state, action: PayloadAction<string>) {
            state.bookmarkLoading = false;
            state.bookmarkError = null;
            state.bookmarkMessage = action.payload;
        },
        deleteBookmarkFailure(state, action: PayloadAction<string>) {
            state.bookmarkLoading = false;
            state.bookmarkError = action.payload;
        },
    },
});

export const {
    createBookmarkRequest,
    createBookmarkSuccess,
    createBookmarkFailure,
    resetBookmarkState,
    fetchBookmarksRequest,
    fetchBookmarksSuccess,
    fetchBookmarksFailure,
    deleteBookmarkRequest,
    deleteBookmarkSuccess,
    deleteBookmarkFailure,
    resetBookmarkMessage,
} = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
