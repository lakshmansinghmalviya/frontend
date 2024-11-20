import { checkIsBase64Boolean } from '@/services/CommonServices';
import styles from '@/styles/student/QuestionOptions.module.css';
import { Option, Question } from '@/types/types';
import React from 'react';

interface QuestionOptionsProps {
    question: Question;
    index: number;
    onAnswerSelect: (questionId: number, optionId: number) => void;
}

const QuestionOptions: React.FC<QuestionOptionsProps> = ({ question, onAnswerSelect, index, }) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        onAnswerSelect(question.id, Number(e.target.value));
    };

    return (
        <div className={styles.questionContainer}>
            {
                question.text &&
                <label htmlFor={`question` + question.id}
                    className={styles.optionText}
                >
                    <div className={styles.questionText}>{` Q.${index} ${question?.text}`}</div>
                </label>
            }
            {
                checkIsBase64Boolean(question.questionPic) &&
                <label htmlFor={`question` + question.id}>
                    <div className={styles.optionImage}>
                        <img
                            src={question.questionPic}
                            style={{ width: '100%', height: '250px', margin: '0px' }}
                        />
                    </div>
                </label>
            }
            <div className={styles.optionContainer}>
                {question?.options.map((option: Option) => (
                    <div className={styles.optionCardContainer} key={option.id}
                        onClick={() => onAnswerSelect(question.id, option.id)}
                    >
                        <div
                            className={` ${styles.option} ${option.isSelected ? styles.selectedOption : ''}`}
                        >
                            <div>
                                <input
                                    style={{ width: '20px', height: '20px' }}
                                    type="radio"
                                    id={`option` + option.id}
                                    name={`question-${question.id}`}
                                    value={option.id}
                                    checked={option.isSelected}
                                    onChange={handleChange}
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
        </div>
    );
};

export default QuestionOptions;
