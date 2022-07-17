import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../../components/signup-form/signup-form.component';
import SigninForm from '../../components/signin-form/signin-form.component';
import { UserContext } from '../../services/persistence/contexts';
import AuthenticationContainer from './authentication.styles';

export default function Authentication() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // If there is a logged user, navigate back to the starting page
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (currentUser) {
      return navigate('/');
    }
  }, [currentUser]);

  return (
    <AuthenticationContainer>
      <SigninForm />
      <SignupForm />
    </AuthenticationContainer>
  );
}
