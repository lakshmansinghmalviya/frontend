import { Feedback } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeedbackState {
    feedback: Feedback;
    feedbackLoading: boolean;
    feedbackError: string | null;
    feedbackMessage: string | null;
}

const initialState: FeedbackState = {
    feedback: {
        id: 0,
        questionId: 0,
        feedbackText: '',
    },
    feedbackLoading: false,
    feedbackError: null,
    feedbackMessage: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {

        updateFeedbackState(state) {
            state.feedbackMessage = null;
            state.feedbackError = null;
        },
        createFeedbackRequest(state, action: PayloadAction<Feedback>) {
            state.feedbackLoading = true;
            state.feedbackError = null;
        },
        createFeedbackSuccess(state, action: PayloadAction<string>) {
            state.feedbackLoading = false;
            state.feedbackError = null;
            state.feedbackMessage = action.payload;
        },
        createFeedbackFailure(state, action: PayloadAction<string>) {
            state.feedbackLoading = false;
            state.feedbackError = action.payload;
        },
    },
});

export const {
    createFeedbackRequest,
    createFeedbackSuccess,
    createFeedbackFailure,
    updateFeedbackState,
} = feedbackSlice.actions;

export default feedbackSlice.reducer;
