import styles from '@/styles/student/AttempQuiz.module.css';
import { Question } from '@/types/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import QuestionOptionsForFeedback from './cards/QuestionOptionsForFeedback';

const QuizFeedback: React.FC = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [presentQuestions, setPresentQuestions] = useState<Question[]>([]);
    const [attemptedQuestions, setAttemptedQuestions] = useState<Question[]>([]);
    const router = useRouter();

    useEffect(() => {
        const presentQuestions: Question[] = localStorage.getItem('presentQuestions')
            ? JSON.parse(localStorage.getItem('presentQuestions') as string)
            : [];
        const attemptedQuestions: Question[] = localStorage.getItem('attemptedQuestions')
            ? JSON.parse(localStorage.getItem('attemptedQuestions') as string)
            : [];
        setPresentQuestions(presentQuestions);
        setAttemptedQuestions(attemptedQuestions);
    }, []);

    const handlePrevClick = (): void => {
        setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    };

    const handleNextClick = (): void => {
        setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, attemptedQuestions.length - 1));
    };

    const handleBack = () => router.back();

    return (
        <>
            {
                <>{attemptedQuestions.length > 0 ? (
                    <div className={styles.quizContainer}>
                        <div className={styles.quizHeaderContainer}>
                            <div className={styles.quizFooterContainer}>
                                <div className={styles.footerItem}>
                                    <button className={styles.previous} onClick={handleBack}>
                                        Go Back
                                    </button>
                                </div>
                                <div className={styles.footerItem}>
                                    <button className={styles.previous} onClick={handlePrevClick}
                                        disabled={currentQuestionIndex == 0}
                                    >
                                        Previous
                                    </button>
                                </div>
                                <div className={styles.footerItem}>
                                    <button className={styles.next} onClick={handleNextClick}
                                        disabled={currentQuestionIndex == attemptedQuestions.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.questionSection}>
                            <QuestionOptionsForFeedback
                                presentQuestion={presentQuestions[currentQuestionIndex]}
                                attemptedQuestion={attemptedQuestions[currentQuestionIndex]}
                                index={currentQuestionIndex + 1}
                            />
                        </div>
                    </div>
                ) : ''
                }
                </>
            }
        </>
    );
};

export default QuizFeedback;
