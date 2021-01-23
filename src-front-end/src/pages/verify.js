import React, { useState } from 'react';
import styled from 'styled-components';

import * as API from '../apis';
import breakpoints from '../assets/styles/breakpoints';
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

const VerifyButton = styled(Button)`
  padding-left: 6.25rem;
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
  padding-bottom: 15px;
  color: red;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.div`
  color: #5e5c60;
`;

function VerifyPage() {
  const [email, setEmail] = useState('');
  const [activeCode, setActiveCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState({
    email: '',
    activeCode: '',
  });

  // validate signup form
  const isValid = () => {
    let isOK = true;
    setErrorMessage('');

    if (!activeCode) {
      isOK = false;
      setError({ activeCode: 'Active code is required' });
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

  const handleOnSubmit = async () => {
    if (loading) {
      return;
    }

    if (isValid()) {
      try {
        setLoading(true);
        setError('');
        const { message, status } = await API.verify(email, activeCode);
        setLoading(false);

        if (status === true) {
          setEmail('');
          setActiveCode('');
          setErrorMessage('');

          // TODO : show popup after signup
          alert(message);
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
      <SEO title="Verify account" />
      <Card>
        <Header>Verify account</Header>
        <Body>
          <Text>Please input email and active code to verify your account</Text>
          <ErrorMessage>{errorMessage}</ErrorMessage>
          <Field>
            <Input
              label="Email"
              placeholder="Your email address"
              value={email}
              hasError={!!error.email}
              message={error.email}
              onChange={event => setEmail(event.target.value)}
              onBlur={event => setEmail(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleOnSubmit();
                }
              }}
            />
          </Field>
          <Field>
            <Input
              label="Active code"
              placeholder="Your active code"
              value={activeCode}
              maxlength="10"
              hasError={!!error.activeCode}
              message={error.activeCode}
              onChange={event => setActiveCode(event.target.value)}
              onBlur={event => setActiveCode(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleOnSubmit();
                }
              }}
            />
          </Field>
          <Actions>
            <VerifyButton
              size="default"
              loading={loading}
              disabled={loading}
              onClick={handleOnSubmit}
            >
              Verify your account
            </VerifyButton>
          </Actions>
        </Body>
      </Card>
    </Layout>
  );
}

export default VerifyPage;
