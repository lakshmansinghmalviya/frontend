import { useAppDispatch } from '@/redux/hooks';
import { resetAuthStateOnLogout } from '@/redux/slices/authSlice';
import { resetAllProps } from '@/redux/slices/propSlice';
import { logoutUserRequest, resetUserStateOnLogout } from '@/redux/slices/usersSlice';
import { logout } from '@/services/CommonServices';
import styles from '@/styles/educator/Sidebar.module.css';
import { Logout } from '@mui/icons-material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ConfirmModal from './modals/ConfirmModal';

const StudentSidebar: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  
  const navigateTo = (path: string) => {
    dispatch(resetAllProps())
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(resetAuthStateOnLogout());
    dispatch(resetUserStateOnLogout());
    dispatch(logoutUserRequest());
    logout();
    router.push('/');
  };

  const confirm = () => {
    handleLogout();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title}>Student Dashboard</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <p
            className={`${styles.link} ${router.pathname === '/student/dashboard' ? styles.active : ''}`}
            onClick={() => navigateTo('/student/dashboard')}
          >
            Profile
          </p>
        </li>
        <li className={styles.listItem}>
          <p
            className={`${styles.link} ${router.pathname === '/student/educators' ? styles.active : ''}`}
            onClick={() => navigateTo('/student/educators')}
          >
            Attempt By Creator
          </p>
        </li>
        <li className={styles.listItem}>
          <p
            className={`${styles.link} ${router.pathname === '/student/categories' ? styles.active : ''}`}
            onClick={() => navigateTo('/student/categories')}
          >
            Attempt By Category
          </p>
        </li>
        <li className={styles.listItem}>
          <span
            className={`${styles.link} ${router.pathname === '/student/quizzes' ? styles.active : ''}`}
            onClick={() => navigateTo('/student/quizzes')}
          >
            Attempt Quiz
          </span>
        </li>
        <li className={styles.listItem}>
          <span
            className={`${styles.link} ${router.pathname === '/student/quizzes/bookmarks' ? styles.active : ''}`}
            onClick={() => {
              navigateTo('/student/quizzes/bookmarks')
            }}
          >
            Bookmarks
          </span>
        </li>
        <li className={styles.listItem}>
          <span
            className={`${styles.link} ${router.pathname === '/student/quizzes/results' ? styles.active : ''}`}
            onClick={() => navigateTo('/student/quizzes/results')}
          >
            Results
          </span>
        </li>
        <li className={styles.listItem}>
          <span
            className={styles.link}
            onClick={handleOpen}
            title='Logout'
          >
            Logout
            <Logout
              sx={{ fontSize: '16px', color: '#ff4b2b', marginLeft: '2px' }}
            />
          </span>
        </li>
      </ul>
      {
        open &&
        <ConfirmModal
          onClose={handleClose}
          confirm={confirm}
          text='Are you sure you want to logout ?'
          buttonName='Logout'
        />
      }
    </div>
  );
};

export default StudentSidebar;
