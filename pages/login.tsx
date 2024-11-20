import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div style={loginPageContainer}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

export const loginPageContainer = {
  backgroundImage: 'url(/loginBack.jpeg)',
  backgroundSize: 'cover',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgb(40, 252, 93)',
};