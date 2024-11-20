import { all, call } from 'redux-saga/effects';
import { watchCategorySaga } from './sagas/categorySaga';
import { watchAuthSaga } from './sagas/authSaga';
import { watchQuizSaga } from './sagas/quizSaga';
import { watchUsersSaga } from './sagas/usersSaga';
import { watchQuestionSaga } from './sagas/questionSaga';
import { watchBookmarkSaga } from './sagas/bookmarkSaga';
import { watchResultSaga } from './sagas/resultSaga';
import { watchFeedbackSaga } from './sagas/feedbackSaga';

function* rootSaga() {
    yield all([
        call(watchQuizSaga),
        call(watchCategorySaga),
        call(watchAuthSaga),
        call(watchUsersSaga),
        call(watchQuestionSaga),
        call(watchBookmarkSaga),
        call(watchResultSaga),
        call(watchFeedbackSaga),
    ]);
}

export default rootSaga;
