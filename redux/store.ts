import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage'; // LocalStorage for persistence
import { persistStore, persistReducer } from 'redux-persist';

import rootSaga from './rootSaga';
import propsReducer from './slices/propSlice';
import categoryReducer from './slices/categorySlice';
import quizReducer from './slices/quizSlice';
import userReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';
import questionReducer from './slices/questionSlice';
import bookmarkReducer from './slices/bookmarkSlice';
import resultReducer from './slices/resultSlice';
import feedbackReducer from './slices/feedbackSlice';

const sagaMiddleware = createSagaMiddleware();

//  Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  props: propsReducer,
  category: categoryReducer,
  user: userReducer,
  quiz: quizReducer,
  question: questionReducer,
  bookmark: bookmarkReducer,
  result: resultReducer,
  feedback: feedbackReducer,
});

//  Apply Redux Persist to persist the entire store
const persistConfig = {
  key: 'root',
  storage, // Uses localStorage
  blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

//  Create Persistor
export const persistor = persistStore(store);

//  Run Saga Middleware
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;