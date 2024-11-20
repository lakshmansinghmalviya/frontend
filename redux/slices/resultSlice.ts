import { getPageObject } from "@/services/CommonServices";
import {PageResponse, Result, UserResultData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResultState {
    result: Result;
    resultLoading: boolean;
    resultError: string | null;
    resultMessage: string | null;
    id: number;
    userResultData: UserResultData
    results: PageResponse<Result>;
}

const initialState: ResultState = {
    result: {
        id: 0,
        quizId: 0,
        score: 0,
        timeSpent: 0,
        isCompleted: false,
        correctAnswers: 0,
        timesTaken: 1,
        totalScore: 0,
        totalQuestion: 0,
        incorrectAnswers: 0,
        feedbackText: '',
        feedbackColor: 'green',
    },
    resultLoading: false,
    resultError: null,
    resultMessage: null,
    results: getPageObject(),
    id: 0,
    userResultData: {
        totalCompletedQuizzes: 0,
        totalInCompletedQuizzes: 0,
        totalTimeSpent: 0,
        totalOfTotalScore: 0,
        totalScore: 0,
    },
};

const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        updateResultState(state) {
            state.resultMessage = null;
            state.resultError = null;
        },
        createResultRequest(state, action: PayloadAction<Result>) {
            state.resultLoading = true;
            state.resultError = null;
        },
        createResultSuccess(state, action: PayloadAction<string>) {
            state.resultLoading = false;
            state.resultError = null;
            state.resultMessage = action.payload;
        },
        createResultFailure(state, action: PayloadAction<string>) {
            state.resultLoading = false;
            state.resultError = action.payload;
        },
        fetchResultsRequest(state, action: PayloadAction<string>) {
            state.resultLoading = true;
            state.resultError = null;
        },
        fetchResultsSuccess(state, action: PayloadAction<PageResponse<Result>>) {
            state.resultLoading = false;
            state.resultError = null;
            state.results = action.payload;
        },
        fetchResultsFailure(state, action: PayloadAction<string>) {
            state.resultLoading = false;
            state.resultError = action.payload;
        },
        fetchUserResultDataRequest(state) {
            state.resultLoading = true;
            state.resultError = null;
        },
        fetchUserResultDataSuccess(state, action: PayloadAction<UserResultData>) {
            state.resultLoading = false;
            state.resultError = null;
            state.userResultData = action.payload;
        },
        fetchUserResultDataFailure(state, action: PayloadAction<string>) {
            state.resultLoading = false;
            state.resultError = action.payload;
        }
    },
});

export const {
    createResultRequest,
    createResultSuccess,
    createResultFailure,
    fetchResultsRequest,
    fetchResultsSuccess,
    fetchResultsFailure,
    updateResultState,
    fetchUserResultDataFailure,
    fetchUserResultDataSuccess,
    fetchUserResultDataRequest,
} = resultSlice.actions;

export default resultSlice.reducer;