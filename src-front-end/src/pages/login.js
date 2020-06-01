import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';

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

function LoginPage() {
  const [authToken, setAuthToken] = useLocalStorage(AUTH_TOKEN_KEY);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (authToken) {
    navigate('/');
  }

  const handleLogin = async () => {
    if (loading) {
      return;
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const data = await API.login(email, password);
      setLoading(false);
      setAuthToken(data.token);
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error has occurred.');
      }
      console.error(error);
    }
  };

  return (
    <Layout mainContent={MainContent}>
      <SEO title="Sign In" />
      <Card>
        <Header>Login</Header>
        <Body>
          <Field>
            <Input
              label="Email"
              placeholder="Your email address"
              value={email}
              hasError={!!errorMessage}
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
              hasError={!!errorMessage}
              message={errorMessage}
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
