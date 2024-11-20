import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateResultState } from '@/redux/slices/resultSlice';
import { RootState } from '@/redux/store';
import useStyles from '@/styles/student/ResultModal.module';
import { Result } from '@/types/types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';


interface ResultModalProps {
    result: Result;
}

const ResultModal: React.FC<ResultModalProps> = ({ result }) => {
    const { resultMessage, resultError } = useAppSelector((state: RootState) => state.result);
    const router = useRouter();
    const dispatch = useAppDispatch();
    router.prefetch('/student/dashboard');
    const styles = useStyles();
    useEffect(() => {
        if (resultMessage) {
            toast.success(resultMessage, { position: 'top-center', autoClose: 1000 });
        }
        if (resultError) {
            toast.error(resultError, { position: 'top-center' });
        }
        dispatch(updateResultState())
    }, [resultMessage, resultError])

    const navigateToFeedback = () => {
        router.replace('/student/quizzes/feedback')
    }

    const navigateToDashboard = () => {
        router.push('/student/dashboard')
    }

    return (
        <Dialog
            open={true}
            fullScreen
            className={styles.dialogPaper}
        >
            <DialogContent className={styles.dialogContent}>

                <Typography variant="h3" className={styles.titleText}>
                    Quiz Result
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Time spent : <strong>{Math.floor(result.timeSpent / 60)}:{result.timeSpent % 60 < 10 ? '0' : ''}{result.timeSpent % 60} min</strong>
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Correct Answers: <strong>{result.correctAnswers}</strong>
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Incorrect Answers: <strong>{result.incorrectAnswers}</strong>
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Total Questions: <strong>{result.totalQuestion}</strong>
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Your Score: <strong>{result.score}</strong>
                </Typography>

                <Typography variant="h5" className={styles.resultText}>
                    Total Score: <strong>{result.totalScore}</strong>
                </Typography>

                <Typography variant="h6" className={styles.resultText}
                >
                    <strong style={{ color: `${result.feedbackColor}` }}>{result.feedbackText}</strong>
                </Typography>

                <Typography variant="h6" className={styles.buttonContainer} >
                    <Button
                        onClick={navigateToDashboard}
                        variant="contained"
                        color="primary"
                    >
                        Goto Dashboard
                    </Button>
                    <Button
                        onClick={navigateToFeedback}
                        variant="contained"
                        color="primary"
                    >
                        Give feedback and check answers
                    </Button>
                </Typography>
               
            </DialogContent>
        </Dialog>
    );
};

export default ResultModal;
