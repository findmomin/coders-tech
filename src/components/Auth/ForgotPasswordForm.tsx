import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { validateEmail } from '../../helpers';
import { auth } from '../../lib/firebase/firebase';
import { authFormsStyles } from '../../styles/globalStyles';
import BottomLink from './BottomLink';
import FormTitle from './FormTitle';
import Input from './Input';
import InputGrid from './InputGrid';
import Links from './Links';
import SubmitButton from './SubmitButton';

const Root = styled.form`
  ${authFormsStyles}
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 1.5rem;
  text-align: left;
  margin-bottom: 1.3rem;
  color: #5e6c84;
`;

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const router = useRouter();

  return (
    <Root
      onSubmit={handleSubmit(async ({ email }) => {
        try {
          setIsLoading(true);

          await sendPasswordResetEmail(auth, email);

          setIsLoading(false);

          // Clear form
          reset();

          // Redirect to login page
          router.push('/login');

          // Display success notification
        } catch (err) {
          // Display error notification
        }
      })}
    >
      <FormTitle>Can't log in?</FormTitle>

      <Text>We'll send a recovery link to:</Text>

      <InputGrid>
        {/* Email */}
        <Input
          error={errors.email}
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required',
            },
            validate: validateEmail,
          })}
          {...{
            type: 'text',
            placeholder: 'Enter email',
          }}
        />

        {/* Submit button */}
        <SubmitButton isDisabled={isLoading}>Send recovery link</SubmitButton>
      </InputGrid>

      <Links>
        <BottomLink href="/login">Return to log in</BottomLink>
      </Links>
    </Root>
  );
};

export default ForgotPasswordForm;
