import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';

import * as API from '../apis';
import { useLocalStorage } from '../utils/storage';
import { AUTH_TOKEN_KEY } from '../utils/auth';
import breakpoints from '../styles/breakpoints';
import { ENTER } from '../constants/keys';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
import Button from '../components/Button';

const MainContent = styled.div`
  min-height: 100vh;
  background: rgb(245, 247, 250);
`;

const Card = styled.div`
  max-width: 570px;
  margin: 0 auto;
  padding: 5rem 1rem;

  @media (max-width: ${breakpoints.sm}) {
    padding: 1.5rem 1rem;
  }
`;

const Header = styled.header`
  padding: 2.5rem;
  font-size: 1.375rem;
  font-weight: 500;
  text-align: center;
  color: #343434;
  background-color: #ffffff;
  border-bottom: solid 1px #eceff0;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 1.5rem;
  }
`;

const Body = styled.section`
  padding: 1.5rem 4.375rem 4.375rem;
  text-align: left;
  background-color: #ffffff;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 1.5rem 2rem 2rem;
  }
`;

const Field = styled.div`
  margin-bottom: 1.5rem;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0 1.5rem 0;

  @media (max-width: ${breakpoints.sm}) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

const LoginButton = styled(Button)`
  padding-left: 4.25rem;
  padding-right: 4.25rem;
  margin-right: 1.5rem;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    margin: 0 0 1rem 0;
    justify-content: center;
  }
`;

const SignupLink = styled(Link)`
  font-weight: 500;

  @media (max-width: ${breakpoints.sm}) {
    align-self: flex-end;
  }
`;

const ForgotPasswordLink = styled(Link)`
  color: #7e7e7e;

  @media (max-width: ${breakpoints.sm}) {
    display: inline-block;
    transform: translateY(-100%);
  }
`;

const ErrorMessage = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

function LoginPage() {
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState({
    email: '',
    password: '',
  });

  if (authToken) {
    navigate('/');
  }

  // validate signup form
  const isValid = () => {
    let isOK = true;
    setErrorMessage('');

    if (!password) {
      isOK = false;
      setError({ password: 'Password is required' });
    }

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email && !pattern.test(email)) {
      isOK = false;
      setError({ email: 'Please enter valid email' });
    }

    if (!email) {
      isOK = false;
      setError({ email: 'Email is required' });
    }

    return isOK;
  };

  const handleLogin = async () => {
    if (loading) {
      return;
    }
    if (isValid()) {
      try {
        setLoading(true);
        setErrorMessage('');
        setError('');
        const {
          data: { Token, UID, Role },
          message,
          status,
        } = await API.login(email, password);

        if (status === true) {
          const { data: profile } = await API.getUserProfile({ token: Token, uid: UID });
          setLoading(false);
          setErrorMessage('');
          setAuthToken(jwt.sign({ ...profile, role: Role, token: Token }, 'tour-guide-pal'));
        } else {
          setLoading(false);
          setErrorMessage(message);
        }
      } catch (err) {
        setLoading(false);
        setErrorMessage('An error has occurred.');
      }
    }
  };

  return (
    <Layout mainContent={MainContent}>
      <SEO title="Sign In" />
      <Card>
        <Header>Login</Header>
        <Body>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Field>
            <Input
              label="Email"
              placeholder="Your email address"
              value={email}
              hasError={!!error.email}
              message={error.email}
              onChange={event => setEmail(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleLogin();
                }
              }}
            />
          </Field>
          <Field>
            <Input
              type="password"
              label="Password"
              placeholder="**********"
              value={password}
              hasError={!!error.password}
              message={error.password}
              onChange={event => setPassword(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleLogin();
                }
              }}
            />
          </Field>
          <Field>
            <Checkbox label="Remember me" />
          </Field>
          <Actions>
            <LoginButton size="large" loading={loading} disabled={loading} onClick={handleLogin}>
              Sign In
            </LoginButton>
            <SignupLink to="/signup/">Sign Up</SignupLink>
          </Actions>
          <ForgotPasswordLink to="/forgot-password/">Forgot your password?</ForgotPasswordLink>
        </Body>
      </Card>
    </Layout>
  );
}

export default LoginPage;
