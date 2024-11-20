import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PropState {
    categoryId: number;
    quizId: number;
    questionId: number;
    optionId: number;
    creatorId: number;
    quizBy: string | null;
    forWhat?: string;
}

const initialState: PropState = {
    categoryId: -1,
    quizId: -1,
    questionId: -1,
    optionId: -1,
    creatorId: -1,
    quizBy: null,
    forWhat: undefined,
};

const propSlice = createSlice({
    name: 'props',
    initialState,
    reducers: {
        resetAllProps(state) {
            state.quizId = -1;
            state.creatorId = -1;
            state.categoryId = -1;
            state.quizBy = null;
            state.forWhat = '';
        },
        updateForWhat(state, action: PayloadAction<string>) {
            state.forWhat = action.payload;
        },
        updateCategoryId(state, action: PayloadAction<{ categoryId: number, name: string }>) {
            state.categoryId = action.payload.categoryId;
            state.quizBy = action.payload?.name;
        },
        updateCreatorId(state, action: PayloadAction<{ creatorId: number, name: string }>) {
            state.creatorId = action.payload.creatorId;
            state.quizBy = action.payload.name;
        },
        updateByBookmarks(state, action: PayloadAction<string>) {
            state.quizBy = action.payload;
        },
        updateQuizId(state, action: PayloadAction<number>) {
            state.quizId = action.payload;
        },
    },
});

export const {
    resetAllProps,
    updateCategoryId,
    updateQuizId, updateByBookmarks,
    updateCreatorId,
    updateForWhat,
} = propSlice.actions;

export default propSlice.reducer;