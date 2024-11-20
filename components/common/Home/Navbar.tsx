import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserRequest } from '@/redux/slices/usersSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/Navbar.module.css';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


interface NavbarProps {
  latestQuizzesRef: React.RefObject<HTMLDivElement>;
  mentorsRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = ({ latestQuizzesRef, mentorsRef, aboutRef, contactRef }) => {
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  let token = '';
  useEffect(() => {
    token = localStorage.getItem('token') as string;
    dispatch(fetchUserRequest())
  }, [])

  const navigateToLogin = () => {
    router.push('/login')
  }

  const navigateToSignup = () => {
    router.push('/signup')
  }

  const navigateToHome = () => {
    router.push('/');
  }

  const navigateToDashboard = () => {
    if (user.role == 'Student') {
      router.push('/student/dashboard');
    } else {
      router.push('/educator/dashboard');
    }
  }

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={navigateToHome}>
        <img src="/quizzy.png" alt="Logo" />
      </div>
      <div
        className={styles.menuText}
        onClick={() => scrollToSection(latestQuizzesRef)}
      >
        Latest Quizzes
      </div>

      <div
        className={styles.menuText}
        onClick={() => scrollToSection(mentorsRef)}
      >
        Mentors
      </div>
      <div
        className={styles.menuText}
        onClick={() => scrollToSection(aboutRef)}
      >
        About
      </div>
      <div
        className={styles.menuText}
        onClick={() => scrollToSection(contactRef)}
      >
        Contact
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
          user.password.trim().length == 0 &&
          <>
            <button className={styles.loginButton} onClick={navigateToLogin}>Login</button>
            <button className={styles.signupButton} onClick={navigateToSignup}>Sign Up</button>
          </>
        }
        {user.password.trim().length != 0 &&
          <button className={styles.signupButton} onClick={navigateToDashboard}>Dashboard</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
