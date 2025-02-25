import { Option, PageResponse, Quiz, Severity, User } from "@/types/types";

export const checkAtleastOneFieldIsFilledWithData = (options: Option[]): boolean => {
    for (let i = 0; i < options.length; i++) {
        if (options[i].optionPic == '/addPic.png' && options[i].text.trim().length == 0)
            return false;
        if (options[i].optionPic != '/addPic.png' && options[i].text.trim().length == 0)
            return true;
    }
    return true;
}

export const twoOptionBlankArray = Array(2).fill({ id: -1, text: '', isCorrect: false, isSelected: false, optionPic: '/addPic.png' })

export function capitalizeWords(input: string): string {
    return input
        .split(' ')
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(' ');
}

export const getAuthenticatedHeader = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}

export const getPublicHeader = () => {
    return {
        'Content-Type': 'application/json',
    }
}

export const isBase64 = (str: string | undefined): string => {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    if (base64Regex.test(str ?? ''))
        return str ?? '/error.png';
    return '/error.png';
};

export const checkIsBase64Boolean = (str: string | undefined): boolean => {
    const base64Regex = /^data:image\/[a-zA-Z]+;base64,/;
    if (base64Regex.test(str ?? ''))
        return true;
    return false;
};


export const getInitials = (name: string): string => {
    if (!name) return '';
    const nameParts = name.split(' ');
    const initials = nameParts[0] ? nameParts[0][0] : '';
    const lastInitial = nameParts[1] ? nameParts[1][0] : '';
    return `${initials}${lastInitial}`.toUpperCase();
};

export const getPageObject = <T>(): PageResponse<T> => {
    return {
        content: [],
        pageNumber: 0,
        pageSize: 5,
        totalElements: 0,
        totalPages: 0,
    };
};

export const logout = () => {
    localStorage.clear();
}

export const checkApproval = (user: User) => {
    if (user.role == 'Student')
        return '';
    if (user.role == 'Educator' && user.isApproved) {
        return 'Approved';
    }
    return 'Pending'
}

export const giveSeverityWithColor = (quiz?: Quiz) => {
    let color = '';

    switch (quiz?.severity) {
        case Severity.HARD:
            color = 'red';
            break;
        case Severity.MEDIUM:
            color = 'orange';
            break;
        case Severity.BEGINNER:
            color = 'green';
            break;
        default:
            color = 'inherit';
    }
    return {
        severity: quiz?.severity,
        color: color
    }
};

export const giveTime = (time: number): string => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    if (hours > 0) {
        return `${hours} h,${minutes > 0 ? minutes : ''} m`;
    } else {
        return `${minutes} m`;
    }
};

export const giveDate = (createdAt: string): string => {
    const date = new Date(createdAt);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
}

export const quizSortingOptions = [
    { id: 'title:asc', name: 'Title ASC' },
    { id: 'title:desc', name: 'Title DESC' },
    { id: 'description:asc', name: 'Description ASC' },
    { id: 'description:desc', name: 'Description DESC' },
    { id: 'timeLimit:asc', name: 'TimeLimit  ASC' },
    { id: 'timeLimit:desc', name: 'TimeLimit  DESC' },
]

export const bookmarkSortingOptions = [
    { id: 'quiz.title:asc', name: 'Title ASC' },
    { id: 'quiz.title:desc', name: 'Title DESC' },
    { id: 'quiz.description:asc', name: 'Description ASC' },
    { id: 'quiz.description:desc', name: 'Description DESC' },
    { id: 'quiz.timeLimit:asc', name: 'TimeLimit  ASC' },
    { id: 'quiz.timeLimit:desc', name: 'TimeLimit  DESC' },
]

export const resultSortingOptions = [
    { id: 'quiz.title:asc', name: 'Title ASC' },
    { id: 'quiz.title:desc', name: 'Title DESC' },
    { id: 'score:asc', name: 'Score ASC' },
    { id: 'score:desc', name: 'Score DESC' },
    { id: 'totalScore:asc', name: 'TotalScore ASC' },
    { id: 'totalScore:desc', name: 'TotalScore DESC' },
    { id: 'totalQuestion:asc', name: 'Total Question ASC' },
    { id: 'totalQuestion:desc', name: 'Total Question DESC' },
    { id: 'quiz.timeLimit:asc', name: 'TimeLimit  ASC' },
    { id: 'quiz.timeLimit:desc', name: 'TimeLimit  DESC' },
    { id: 'timesTaken:asc', name: 'Attempted Times ASC' },
    { id: 'timesTaken:desc', name: 'Attempted Times DESC' },
    { id: 'correctAnswers:asc', name: 'CorrectAnswers ASC' },
    { id: 'correctAnswers:desc', name: 'CorrectAnswers DESC' },
    { id: 'timeSpent:asc', name: 'Time Spend ASC' },
    { id: 'timeSpent:desc', name: 'Time Spend DESC' },
]

export const categorySortingOptions = [
    { id: 'name:asc', name: 'Name ASC' },
    { id: 'name:desc', name: 'Name DESC' },
    { id: 'description:asc', name: 'Description ASC' },
    { id: 'description:desc', name: 'Description DESC' },
]

export const educatorSortingOptions = [
    { id: 'name:asc', name: 'Name ASC' },
    { id: 'name:desc', name: 'Name DESC' },
    { id: 'education:asc', name: 'Education ASC' },
    { id: 'education:desc', name: 'Education DESC' },
    { id: 'bio:asc', name: 'Bio ASC' },
    { id: 'bio:desc', name: 'Bio DESC' },
]

export const questionSortingOptions = [
    { id: 'text:asc', name: 'Question ASC' },
    { id: 'text:desc', name: 'Question DESC' },
    { id: 'maxScore:asc', name: 'Marks ASC' },
    { id: 'maxScore:desc', name: 'Marks DESC' },
]