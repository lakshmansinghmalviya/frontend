import { getPageObject } from '@/services/CommonServices';
import { PageResponse, Quiz, Severity } from '@/types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuizState {
    quiz: Quiz;
    quizLoading: boolean;
    quizError: string | null;
    quizMessage: string | null;
    quizzes: PageResponse<Quiz>;
}

const initialState: QuizState = {
    quiz: {
        id: 0,
        title: '',
        description: '',
        quizPic: '/addPic.png',
        categoryId: 0,
        randomizeQuestions: true,
        timeLimit: 0,
        attemptedTimes: 0,
        createdAt: '',
        severity: Severity.BEGINNER,
    },
    quizLoading: false,
    quizError: null,
    quizMessage: null,
    quizzes: getPageObject(),
};

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        resetQuizState(state) {
            state.quizMessage = null;
            state.quizError = null;
        },
        updateQuiz(state, action: PayloadAction<Quiz>) {
            state.quiz = { ...action.payload };
        },
        createQuizRequest(state, action: PayloadAction<Quiz>) {
            state.quizLoading = true;
            state.quizError = null;
            state.quizMessage = null;
        },
        createQuizSuccess(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = null;
            state.quizMessage = action.payload;
        },
        createQuizFailure(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = action.payload;
        },
        fetchQuizzesRequest(state, action: PayloadAction<string>) {
            state.quizLoading = true;
            state.quizError = null;
        },
        fetchQuizzesSuccess(state, action: PayloadAction<PageResponse<Quiz>>) {
            state.quizLoading = false;
            state.quizError = null;
            state.quizzes = action.payload;

        },
        fetchQuizzesFailure(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = action.payload;
        },
        deleteQuizRequest(state, action: PayloadAction<number>) {
            state.quizLoading = true;
            state.quizError = null;
            state.quizMessage = null;
        },
        deleteQuizSuccess(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = null;
            state.quizMessage = action.payload;
        },
        deleteQuizFailure(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = action.payload;
        },
        updateQuizRequest(state, action: PayloadAction<Quiz>) {
            state.quizLoading = true;
            state.quizError = null;
            state.quizMessage = null;
        },
        updateQuizSuccess(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = null;
            state.quizMessage = action.payload;
        },
        updateQuizFailure(state, action: PayloadAction<string>) {
            state.quizLoading = false;
            state.quizError = action.payload;
        }
    }
});

export const {
    createQuizRequest,
    createQuizSuccess,
    createQuizFailure,
    fetchQuizzesRequest,
    fetchQuizzesSuccess,
    fetchQuizzesFailure,
    deleteQuizRequest,
    deleteQuizSuccess,
    deleteQuizFailure,
    updateQuizRequest,
    updateQuizSuccess,
    updateQuizFailure,
    resetQuizState,
    updateQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;
