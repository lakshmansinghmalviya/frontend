import React from 'react';
import SignupForm from '@/components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div style={signupPageContainer}>
      <SignupForm />
    </div>
  );
};

export default SignupPage;

export const signupPageContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'url(/loginBack.jpeg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minWidth: '100vw',
  minHeight: '100vh',
  backgroundColor: 'rgb(40, 252, 93)',
};