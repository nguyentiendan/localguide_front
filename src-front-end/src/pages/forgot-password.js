import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import * as API from '../apis';
import breakpoints from '../styles/breakpoints';
import { ENTER } from '../constants/keys';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Input from '../components/Input';
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

const ForgotPassButton = styled(Button)`
  padding-left: 5.25rem;
  padding-right: 4.25rem;
  width: 100%;
  text-align: center;
  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    margin: 0 0 1rem 0;
    justify-content: center;
  }
`;

const ErrorMessage = styled.div`
  padding-top: 15px;
  color: red;
  text-align: center;
`;

const Text = styled.div`
  color: #5e5c60;
`;

const LoginLink = styled(Link)`
  color: #7e7e7e;

  @media (max-width: ${breakpoints.sm}) {
    display: inline-block;
    transform: translateY(-100%);
  }
`;

function ForgotPassPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const sendPassAgain = async () => {
    if (loading) {
      return;
    }
    if (email === '') {
      return;
    }
    try {
      setLoading(true);
      setErrorMessage('');
      const data = await API.forgotPassword(email);
      setLoading(false);
      if (data.status === true) {
        /* show popup */
      } else {
        setErrorMessage(data.message);
      }
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
      <SEO title="Forgot Password" />
      <Card>
        <Header>Forgot Password</Header>
        <Body>
          <Text>You forgot your password? Here you can easily retrieve a new password.</Text>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Field>
            <Input
              label="Email"
              placeholder="Your email address"
              value={email}
              hasError={!!errorMessage}
              onChange={event => setEmail(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  sendPassAgain();
                }
              }}
            />
          </Field>
          <Actions>
            <ForgotPassButton
              size="default"
              loading={loading}
              disabled={loading}
              onClick={sendPassAgain}
            >
              Request new password
            </ForgotPassButton>
          </Actions>
          <LoginLink to="/login/">Login </LoginLink>
        </Body>
      </Card>
    </Layout>
  );
}

export default ForgotPassPage;
