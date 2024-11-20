import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import propsReducer from './slices/propSlice';
import categoryReducer from './slices/categorySlice';
import quizReducer from './slices/quizSlice';
import userReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import questionReducer from './slices/questionSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import resultReducer from './slices/resultSlice';
import feedbackReducer from './slices/feedbackSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    props: propsReducer,
    category: categoryReducer,
    user: userReducer,
    quiz: quizReducer,
    question: questionReducer,
    bookmark: bookmarkReducer,
    result: resultReducer,
    feedback: feedbackReducer,
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
