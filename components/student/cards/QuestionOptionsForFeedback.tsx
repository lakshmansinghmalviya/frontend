import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import styles2 from '@/styles/student/AttempQuiz.module.css';
import styles from '@/styles/student/QuestionOptionsForFeedback.module.css';
import { Feedback, Option, Question } from '@/types/types';
import React, { useEffect, useState } from 'react';

import { createFeedbackRequest, updateFeedbackState } from '@/redux/slices/feedbackSlice';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';

interface QuestionOptionsForFeedbackProps {
    presentQuestion: Question;
    attemptedQuestion: Question;
    index: number;
}

const QuestionOptionsForFeedback: React.FC<QuestionOptionsForFeedbackProps> = ({ index, attemptedQuestion, presentQuestion }) => {
    let correctOptionId = -1, wrongOptionId = -1;
    const [feedbackText, setFeedbackText] = useState<string>('');
    const dispatch = useAppDispatch();
    const { feedback, feedbackMessage, feedbackError } = useAppSelector((state: RootState) => state.feedback);
    const [feedbackData, setFeedbackData] = useState<Feedback>({
        ...feedback,
        questionId: attemptedQuestion.id,
        id: Number(localStorage.getItem('id')),
    });

    useEffect(() => {
        if (feedbackMessage) {
            toast.success('Feedback submitted successfully for this question !', { position: 'top-center', autoClose: 500 });
            setFeedbackText('');
            dispatch(updateFeedbackState())
        }
        if (feedbackError) {
            toast.error(feedbackError + 'Error in submitting  the feedback !', { position: 'top-center' });
        }
    }, [feedbackError, feedbackMessage])

    const setCorrectAndWrongQuestionIds = (attemptedQuestion: Question) => {
        for (let i = 0; i < attemptedQuestion.options.length; i++) {
            if (attemptedQuestion.options[i].isSelected) {
                if (attemptedQuestion.options[i].isCorrect)
                    correctOptionId = attemptedQuestion.options[i].id;
                else
                    wrongOptionId = attemptedQuestion.options[i].id;
            }
            if (presentQuestion.options[i].isCorrect)
                correctOptionId = presentQuestion.options[i].id;
        }
    }

    setCorrectAndWrongQuestionIds(attemptedQuestion);

    const handleFeedbackTextChange = (text: string) => {
        setFeedbackText(text);
        setFeedbackData({
            ...feedbackData,
            feedbackText: text,
            questionId: attemptedQuestion.id
        })
    }

    const handleSubmitFeedback = () => {
        
        if (feedbackText.trim().length != 0)
            dispatch(createFeedbackRequest(feedbackData))
        else
            toast.error("Please enter some text", { position: 'top-center' });
    }

    return (
        <div className={styles.questionContainer}>
            <div className={styles.questionText}>{` Q.${index} ${attemptedQuestion?.text}`}</div>
            <div className={styles.optionContainer}>
                {attemptedQuestion?.options.map((option: Option) => (
                    <div className={styles.optionCardContainer} key={option.id}
                    >
                        <div
                            className={` ${styles.option} ${option.id == correctOptionId ? styles.correctAnswer : ''} ${option.id == wrongOptionId ? styles.wrongAnswer : ''}`}
                        >
                            <div>
                                <input
                                    style={{ width: '20px', height: '20px' }}
                                    className={`${option.id == correctOptionId ? styles.correctAnswer : ''} ${option.id == wrongOptionId ? styles.wrongAnswer : ''}`}
                                    type="radio"
                                    id={`option` + option.id}
                                    name={`question-${attemptedQuestion.id}`}
                                    value={option.id}
                                    checked={option.isSelected}
                                    onChange={() => { }}
                                />
                            </div>
                            <div>
                                {
                                    option.text.trim().length == 0 ?
                                        <label htmlFor={`option` + option.id}>
                                            <div className={styles.optionImage}>
                                                <img
                                                    src={option.optionPic}
                                                    style={{ width: '100%', height: '250px', margin: '0px' }}
                                                />
                                            </div>
                                        </label> :
                                        <label htmlFor={`option` + option.id}
                                            className={styles.optionText}
                                        >
                                            {option.text}
                                        </label>
                                }
                            </div>
                        </div>
                    </div>
                ))}
               
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <textarea placeholder="Feedback message on question ..." style={inputField}
                    value={feedbackText}
                    onChange={(e) => { handleFeedbackTextChange(e.target.value) }}
                >
                </textarea>
                <div className={styles2.footerItem} >
                    <button className={styles2.submit} onClick={() => {
                        handleSubmitFeedback();
                    }}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionOptionsForFeedback;

const inputField = {
    width: '80%',
    padding: '10px 15px',
    fontSize: '16px',
    border: '1px solid #9eff8b',
    borderRadius: '25px',
    outlineColor: '#7cb342'
}