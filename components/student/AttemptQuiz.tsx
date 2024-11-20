import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchQuestionsRequest } from '@/redux/slices/questionSlice';
import { createResultRequest } from '@/redux/slices/resultSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/student/AttempQuiz.module.css';
import { Question, Result } from '@/types/types';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { addIsSelectedFieldInOptions, fillIsSelectedAsTrueForClickedOption, giveQuizResult, shuffleArray, shuffleOptions } from '@/services/result';
import Loader from '../common/Loader';
import QuestionOptions from './cards/QuestionOptions';
import TimeCard from './cards/TimeCard';
import ConfirmModal from './modals/ConfirmModal';
import ResultModal from './modals/ResultModal';


const AttempQuiz: React.FC = () => {
  const { questions, questionLoading } = useAppSelector((state: RootState) => state.question);
  const { quizLoading, quiz } = useAppSelector((state: RootState) => state.quiz);
  const { result } = useAppSelector((state: RootState) => state.result);
  const [questionsData, setQuestionsData] = useState<Question[]>([]);
  const [resultModalOpen, setResultModalOpen] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const timeLeft = useRef<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [questionsForAttempt, setQuestionsForAttempt] = useState<Question[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [resultData, setResultData] = useState<Result>({
    ...result,
    quizId: quiz.id,
    id: 0,
  });

  useEffect(() => {
    router.prefetch('/student/quizzes')
    dispatch(fetchQuestionsRequest("quizId=" + quiz.id));
  }, [])

  useEffect(() => {
    let modifiedQuestions = addIsSelectedFieldInOptions(questions.content);
    modifiedQuestions = quiz.randomizeQuestions ? shuffleArray(modifiedQuestions) : modifiedQuestions;
    modifiedQuestions = shuffleOptions(modifiedQuestions);
    setQuestionsData(modifiedQuestions);
    setQuestionsForAttempt(modifiedQuestions);
    timeLeft.current = (Number(quiz.timeLimit) * 60)
  }, [questions])

  const handleAnswerSelect = async (questionId: number, optionId: number) => {
    const updatedQuestions = fillIsSelectedAsTrueForClickedOption(questionsForAttempt, questionId, optionId);
    setQuestionsForAttempt([...updatedQuestions]);
  };

  const handlePrevClick = (): void => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = (): void => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.content.length - 1));
  };

  const takeTimeLeftFromCard = (time: number) => {
    if (time == 0)
      handleSubmitQuiz();
    timeLeft.current = time;
  }

  const handleSubmitQuiz = async () => {
    const calculatedResult = await giveQuizResult(questionsData, questionsForAttempt,
      quiz.timeLimit, timeLeft.current, resultData);
    setResultData(calculatedResult);
    localStorage.setItem('presentQuestions', JSON.stringify(questionsData))
    localStorage.setItem('attemptedQuestions', JSON.stringify(questionsForAttempt))
    dispatch(createResultRequest(calculatedResult));
    handleResultModalOpen();
    timeLeft.current = 0;
  };

  const handleResultModalOpen = () => {
    setResultModalOpen(true);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleClear = (index: number) => {
    questionsForAttempt[index] = { ...questionsData[index] };
  }

  return (
    <>
      {
        quizLoading == true || questionLoading == true ? <Loader /> :
          <>
            {resultModalOpen &&
              <ResultModal
                result={resultData}
              />
            }
            {
              <>
                {questionsForAttempt.length > 0 ? (
                  <div className={styles.quizContainer}>
                    <div className={styles.quizHeaderContainer}>
                      <div className={styles.quizFooterContainer}>
                        <div className={styles.footerItem}>
                          <button className={styles.previous} onClick={handlePrevClick}
                            disabled={currentQuestionIndex == 0}
                          >
                            Previous
                          </button>
                        </div>
                        <div className={styles.footerItem}>
                          <button className={styles.next} onClick={handleNextClick}
                            disabled={currentQuestionIndex == questionsForAttempt.length - 1}
                          >
                            Next
                          </button>
                        </div>
                        <div className={styles.footerItem}>
                          <button className={styles.clearAll} onClick={() => { handleClear(currentQuestionIndex) }}>
                            Clear
                          </button>
                        </div>
                        <div className={styles.footerItem} >
                          <button className={styles.submit} onClick={() => {
                            handleOpenConfirm();
                          }}>
                            Submit
                          </button>
                        </div>
                        <div className={styles.footerItem} >
                          {
                            timeLeft.current != 0 ?
                              < TimeCard
                                time={timeLeft.current}
                                takeTimeLeftFromCard={takeTimeLeftFromCard}
                              /> : ''
                          }
                        </div>
                      </div>
                    </div>

                    <div className={styles.questionSection}>
                      <QuestionOptions
                        question={questionsForAttempt[currentQuestionIndex]}
                        onAnswerSelect={handleAnswerSelect}
                        index={currentQuestionIndex + 1}
                      />
                    </div>
                    {
                      openConfirm &&
                      <ConfirmModal
                        onClose={handleCloseConfirm}
                        confirm={handleSubmitQuiz}
                        text='Are you sure you want to submit the quiz?'
                        buttonName='Submit'
                      />
                    }
                  </div>
                ) :
                  <h1>No question is present or reloaded </h1>
                }
              </>
            }
          </>
      }
    </>
  );
};

export default AttempQuiz;
