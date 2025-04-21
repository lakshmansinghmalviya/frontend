import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserRequest } from '@/redux/slices/usersSlice';
import { RootState } from '@/redux/store';
import styles from '@/styles/Navbar.module.css';
import { AuthResponse, User } from '@/types/types';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';


interface NavbarProps {
  latestQuizzesRef: React.RefObject<HTMLDivElement>;
  mentorsRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
}

const Navbar: React.FC<NavbarProps> = ({ latestQuizzesRef, mentorsRef, aboutRef, contactRef }) => {
  const router = useRouter();
  const { auth} = useAppSelector((state: RootState) => state.auth);
  const [userData, setUserData] = useState<AuthResponse>({ ...auth });

  const dispatch = useAppDispatch();
  useEffect(() => {
    // debugger
    dispatch(fetchUserRequest())
  }, [])

  useEffect(() => {
    // debugger
    setUserData({
      ...auth
    })
  }, [auth])

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
    if (userData.role == 'Student') {
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
      {/* <div
        className={styles.menuText}
        onClick={() => scrollToSection(latestQuizzesRef)}
      >
        Latest Quizzes
      </div> */}

      {/* <div
        className={styles.menuText}
        onClick={() => scrollToSection(mentorsRef)}
      >
        Mentors
      </div> */}
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
          userData.refToken.trim().length == 0 &&
          <>
            <button className={styles.loginButton} onClick={navigateToLogin}>Login</button>
            <button className={styles.signupButton} onClick={navigateToSignup}>Sign Up</button>
          </>
        }
        {userData.refToken.trim().length != 0 &&
          <button className={styles.signupButton} onClick={navigateToDashboard}>Dashboard</button>
        }
      </div>
    </nav>
  );
};

export default Navbar;
