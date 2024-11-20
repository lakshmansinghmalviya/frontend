import React from 'react';
import styles from '@/styles/GetStarted.module.css';
import { useRouter } from 'next/router';

const GetStarted = () => {
  const router = useRouter();

  const navigateToSignup = () => {
    router.push('/signup');
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.overlay}>
        <h1 className={styles.heading}>Quiz Time</h1>
        <p className={styles.description}>Unleash your inner trivia master and conquer the quizzes!</p>
        <button className={styles.button}
          onClick={navigateToSignup}
        >Join Now</button>
      </div>
    </div>
  );
};

export default GetStarted;
