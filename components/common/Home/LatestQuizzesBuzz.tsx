import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { resetAuth } from '@/redux/slices/authSlice';
import { updateQuizId } from '@/redux/slices/propSlice';
import { fetchQuizzesRequest } from '@/redux/slices/quizSlice';
import { fetchUserRequest, resetUserMessage } from '@/redux/slices/usersSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/LatestQuizzesBuzz.module.css';
import style2 from '@/styles/MeetEducators.module.css';
import { Quiz } from '@/types/types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LatestQuizzesBuzz = () => {
  const quizzes = useAppSelector((state: RootState) => state.quiz.quizzes.content);
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchQuizzesRequest(''));
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(fetchUserRequest());
    }
  }, []);

  const checkLoggedInAndForward = (id: number) => {
    if (user.password.trim().length === 0) {
      toast.error('Please login to attempt the quizzes', { position: 'top-center' });
      dispatch(resetUserMessage());
    } else if (user.password.trim().length !== 0 && user.role === 'Student') {
      dispatch(updateQuizId(id));
      router.push('/student/quizzes/start');
      dispatch(resetAuth());
    } else if (user.password.trim().length !== 0 && user.role === 'Educator') {
      toast.info('You are an educator. Please create a new account for student purposes to attempt the quiz', { position: 'top-center' });
    }
  };

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const visibleCards = 4;

  const handleNext = (): void => {
    if (currentIndex < quizzes.length - visibleCards) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className={`${styles.quizContainer} hiddenOnSmall`}>
      <div className={styles.quizHeading}>
        <h1>Latest Quiz Buzz</h1>
      </div>
      <div className={styles.quizsCardContainer} style={{ marginTop: '20px' }}>
        {quizzes.length > 0 ? (
          <div className={style2.carouselContainer}>
            <button onClick={handlePrev} className={style2.navButton} disabled={currentIndex === 0}>‹</button>
            <div className={style2.carouselTrack}>
              <div
                className={style2.carouselCards}
                style={{ transform: `translateX(-${currentIndex * (100 / Math.min(quizzes.length, visibleCards))}%)`, overflow: 'hidden' }}
              >
                {quizzes.map((quiz: Quiz) => (
                  <div key={quiz.id} className={styles.quizCard}>
                    <div className={styles.quizCardImg}>
                      <img src={quiz.quizPic || '/loginBack.jpeg'} alt={quiz.title} />
                    </div>
                    <div className={styles.infoCard}>
                      <h5>{quiz.title}</h5>
                      <p className={styles.date}>{new Date(quiz.createdAt).toLocaleDateString()}</p>
                      <p
                        style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '2',
                          WebkitBoxOrient: 'vertical',
                        }}
                      >{quiz.description}</p>
                      <div className={styles.startButtonContainer}>
                        <button className={styles.startButton}
                          onClick={() => { checkLoggedInAndForward(quiz.id) }}
                        >Start the Quiz</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={handleNext} className={style2.navButton} disabled={currentIndex >= quizzes.length - visibleCards}>›</button>
          </div>
        ) : (
          <p>No quizzes available</p>
        )}
      </div>

    </div>
  );
}

export default LatestQuizzesBuzz;
