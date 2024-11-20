import { Question, Option, Result } from "@/types/types";

export const sortQuestionById = (a: Question, b: Question): number => a.id - b.id;
export const sortOptionById = (a: Option, b: Option): number => a.id - b.id;
export const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

export const addIsSelectedFieldInOptions = (questions: Question[]): Question[] => {
    return questions.map(question => ({
        ...question,
        options: question.options.map((option: Option) => ({
            ...option,
            isSelected: false,
        })),
    }));
}

export const shuffleOptions = (questions: Question[]): Question[] => {
    return questions.map((question: Question) => {
        return {
            ...question,
            options: question.randomizeOptions ? shuffleArray(question.options) : question.options,
        };
    });
}

export const fillIsSelectedAsTrueForClickedOption = (questions: Question[], questionId: number, optionId: number): Question[] => {
    return questions.map(question => {
        if (question.id === questionId) {
            return {
                ...question,
                options: question.options.map(option => {
                    return {
                        ...option,
                        isSelected: option.id === optionId
                    };
                })
            }
        }
        return question;
    });
}

export const giveQuizResult = async (presentQuestions: Question[], attemptedQuestions: Question[], totalTime: number, currentTime: number, comingResult: Result): Promise<Result> => {

    presentQuestions = presentQuestions.sort(sortQuestionById);
    presentQuestions = shortOptionsOfArray(presentQuestions);
    attemptedQuestions = attemptedQuestions.sort(sortQuestionById);
    attemptedQuestions = shortOptionsOfArray(attemptedQuestions);

    let correct = 0, maxScore = 0, totalScore = 0, feedbackText = '', feedbackColor = 'green', isCompleted = true;

    for (let i = 0; i < presentQuestions.length; i++) {
        if (!isAttended(presentQuestions[i], attemptedQuestions[i]))
            isCompleted = false;
        if (checkIsCorrect(presentQuestions[i], attemptedQuestions[i])) {
            correct++;
            maxScore += presentQuestions[i].maxScore;
        }
        totalScore += presentQuestions[i].maxScore;
    }

    const percentage = Math.round((correct / presentQuestions.length) * 100);
    if (percentage <= 25) {
        feedbackColor = 'red',
            feedbackText = 'You scored ' + percentage + '% which is not good you should try again';
    }
    else if (percentage <= 50) {
        feedbackText = 'You scored ' + percentage + '% which is good but not expected';
        feedbackColor = 'yellow';
    }
    else if (percentage <= 75) {
        feedbackColor = 'green';
        feedbackText = 'You scored ' + percentage + ' % which is expected great !';
    }
    else
        feedbackText = 'Congratulations you got ' + percentage + ' % excellent';

    return {
        ...comingResult,
        score: maxScore,
        totalScore: totalScore,
        totalQuestion: presentQuestions.length,
        timeSpent: Math.abs((totalTime * 60) - currentTime),
        correctAnswers: correct,
        incorrectAnswers: Math.abs(presentQuestions.length - correct),
        feedbackText: feedbackText,
        feedbackColor: feedbackColor,
        isCompleted: isCompleted,
    }
}

export const shortOptionsOfArray = (questions: Question[]): Question[] => {
    return questions.map((question: Question) => {
        let sortedOption = [...question.options];
        sortedOption = sortedOption.sort(sortOptionById);
        return {
            ...question,
            options: sortedOption,
        }
    })
}

export const checkIsCorrect = (present: Question, attempted: Question): boolean => {
    for (let i = 0; i < present.options.length; i++) {
        if (attempted.options[i].isSelected) {
            if (present.options[i].isCorrect) {
                attempted.options[i].isCorrect = true;
                return true;
            }
        }
    }
    return false;
}

export const isAttended = (present: Question, attempted: Question): boolean => {
    for (let i = 0; i < present.options.length; i++) {
        if (attempted.options[i].isSelected)
            return true;
    }
    return false;
}
