import React, { useEffect, useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../services/authentication/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  Error, SignInButton, SignUpContainer, Success,
} from './signup-form.styles';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

let warnMessage = '';
let successMessage = '';

function validateFields({
  displayName, email, password, confirmPassword,
}) {
  const validateName = displayName.length >= 5;
  if (!validateName) {
    warnMessage = 'Error: The display name must have at least 5 characters';
    return true;
  }

  const validateEmail = email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);

  if (!validateEmail) {
    warnMessage = 'Error: Invalid Email';
    return true;
  }

  const validatePassword = password.length >= 6;
  if (!validatePassword) {
    warnMessage = 'Error: The password must have at least 6 characters';
    return true;
  }
  const validateConfirm = password === confirmPassword;
  if (!validateConfirm) {
    warnMessage = 'Error: The passwords must match';
    return true;
  }
  warnMessage = 'All fields are clear';
  return false;
}

export default function SignupForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    displayName, email, password, confirmPassword,
  } = formFields;

  useEffect(() => {
    warnMessage = '';
    successMessage = '';
  }, []);
  // const { setCurrentUser } = useContext(UserContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword && !!email) {
      try {
        const response = await createAuthUserWithEmailAndPassword(email, password);
        if (response) {
          await createUserDocumentFromAuth(response.user, { displayName, password });
          successMessage = 'User succesfully created';
        }
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          successMessage = 'Error: Cannot create user. Email already in use';
        } else { warnMessage = `Error: ${error}`; }
      } finally {
        setFormFields(defaultFormFields);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2> Don&#39;t have an account ? </h2>
      <span> Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          name="displayName"
          handleChange={handleChange}
          value={displayName}
        />
        <FormInput
          label="Email"
          type="text"
          name="email"
          handleChange={handleChange}
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          handleChange={handleChange}
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          handleChange={handleChange}
          value={confirmPassword}
        />
        {warnMessage.match(/Error/) ? (
          <Error>{warnMessage}</Error>
        ) : (
          <Success>{warnMessage}</Success>
        )}
        {successMessage.match(/Error/) ? (
          <Error>{successMessage}</Error>
        ) : (
          <Success>{successMessage}</Success>
        )}
        <SignInButton>
          <Button
            type="submit"
            buttonType={
              validateFields(formFields)
                ? BUTTON_TYPE_CLASSES.disabledBase
                : BUTTON_TYPE_CLASSES.default
            }
            disabled={validateFields(formFields)}
          >
            Sign Up
          </Button>
        </SignInButton>
      </form>
    </SignUpContainer>
  );
}
