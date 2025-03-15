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
  width: '100%',
  height: '100%', 
  backgroundColor: 'rgb(40, 252, 93)',
};