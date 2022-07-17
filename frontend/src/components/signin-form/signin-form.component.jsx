import React, { useState } from 'react';
import {
  signInAuthUserWithEmailAndPassword, signInWithGooglePopup,
} from '../../services/authentication/firebase.utils';
import { ButtonsContainer, SignInContainer } from './signin-form.styles';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

const defaultFormFields = {
  email: '',
  password: '',
};

export default function SigninForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    email, password,
  } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setFormFields(defaultFormFields);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account ? </h2>
      <span> Sign In with Email and Password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            signInWithGoogle
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
