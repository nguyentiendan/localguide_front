import React, { useState } from 'react';

import * as API from '../../apis';
import { ENTER } from '../../constants/keys';
import Input from '../Input';
import Button from '../Button';
import Message from '../Message';
import Field from './Field';
import Actions from './Actions';

function ChangePassword() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const invalid = !password || !newPasswordConfirm || passwordNotMatch;

  const handleChangePassword = async () => {
    if (invalid || submitting) {
      return;
    }

    try {
      setSubmitting(true);
      setErrorMessage('');
      setSuccessMessage('');
      await API.changePassword(password, newPassword);
      setSubmitting(false);
      setSuccessMessage('Password has been changed successfully!');
      setPassword('');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error has occurred!');
      }
      console.error(error);
    }
  };

  return (
    <>
      <Field>
        <Input
          type="password"
          label="Your current password"
          placeholder="**********"
          value={password}
          hasError={!!errorMessage}
          onChange={event => setPassword(event.target.value)}
          onKeyDown={event => {
            if (event.keyCode === ENTER) {
              handleChangePassword();
            }
          }}
        />
      </Field>
      <Field>
        <Input
          type="password"
          label="New password"
          placeholder="**********"
          value={newPassword}
          hasError={passwordNotMatch}
          message={passwordNotMatch ? 'Password is not matched' : ''}
          onChange={event => {
            const { value } = event.target;
            setNewPassword(value);
            if (newPasswordConfirm && value !== newPasswordConfirm) {
              setPasswordNotMatch(true);
            } else {
              setPasswordNotMatch(false);
            }
          }}
          onKeyDown={event => {
            if (event.keyCode === ENTER) {
              handleChangePassword();
            }
          }}
        />
      </Field>
      <Field>
        <Input
          type="password"
          label="Confirm new password"
          placeholder="**********"
          value={newPasswordConfirm}
          hasError={passwordNotMatch}
          message={passwordNotMatch ? 'Password is not matched' : ''}
          onChange={event => {
            const { value } = event.target;
            setNewPasswordConfirm(value);
            if (newPassword && value !== newPassword) {
              setPasswordNotMatch(true);
            } else {
              setPasswordNotMatch(false);
            }
          }}
          onKeyDown={event => {
            if (event.keyCode === ENTER) {
              handleChangePassword();
            }
          }}
        />
      </Field>
      <Actions>
        <Button
          loading={submitting}
          disabled={invalid || submitting}
          onClick={handleChangePassword}
        >
          Lưu
        </Button>
      </Actions>
      {errorMessage && <Message error>{errorMessage}</Message>}
      {successMessage && <Message>{successMessage}</Message>}
    </>
  );
}

export default ChangePassword;
