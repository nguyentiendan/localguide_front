import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import * as API from '../apis';
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

const SignUpButton = styled(Button)`
  padding-left: 4.25rem;
  padding-right: 4.25rem;
  margin-right: 1.5rem;

  @media (max-width: ${breakpoints.sm}) {
    width: 100%;
    margin: 0 0 1rem 0;
    justify-content: center;
  }
`;

const LoginLink = styled(Link)`
  font-weight: 500;

  @media (max-width: ${breakpoints.sm}) {
    align-self: flex-end;
  }
`;

const AgreeError = styled.div`
  padding-top: 5px;
  color: red;
  font-weight: normal;
  text-align: left;
`;

function SignUpPage() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerm, setAgreeTerm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerm: '',
  });

  // validate signup form
  const isValid = () => {
    let isOK = true;

    if (!agreeTerm) {
      isOK = false;
      setError({ agreeTerm: 'Please check agree localguidepal term' });
    }
    if (confirmPassword !== password) {
      isOK = false;
      setError({ confirmPassword: 'Passwords does not match' });
    }
    if (!confirmPassword) {
      isOK = false;
      setError({ confirmPassword: 'Confirm password is required' });
    }
    if (password && password.length < 8) {
      isOK = false;
      setError({ password: 'Password must be at least 8 characters' });
    }
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
    if (!fullname) {
      isOK = false;
      setError({ fullname: 'Fullname is required' });
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
        const { message, status } = await API.register(fullname, email, password);
        setLoading(false);

        if (status === true) {
          setFullname('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setError('');

          // TODO : show popup after signup
          alert(message);
        } else {
          setLoading(false);
          setError({ email: message });
        }
      } catch (err) {
        setLoading(false);
        console.log('An error has occurred.');
      }
    }
  };

  return (
    <Layout mainContent={MainContent}>
      <SEO title="Sign Up" />
      <Card>
        <Header>Sign Up</Header>
        <Body>
          <Field>
            <Input
              label="Fullname"
              placeholder="Your full name"
              value={fullname}
              hasError={!!error.fullname}
              message={error.fullname}
              onChange={event => setFullname(event.target.value)}
              onBlur={event => setFullname(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleOnSubmit();
                }
              }}
            />
          </Field>
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
              type="password"
              label="Password"
              placeholder="**********"
              value={password}
              hasError={!!error.password}
              message={error.password}
              onChange={event => setPassword(event.target.value)}
              onBlur={event => setPassword(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleOnSubmit();
                }
              }}
            />
          </Field>
          <Field>
            <Input
              type="password"
              label="Confirm password"
              placeholder="**********"
              value={confirmPassword}
              hasError={!!error.confirmPassword}
              message={error.confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              onBlur={event => setConfirmPassword(event.target.value)}
              onKeyDown={event => {
                if (event.keyCode === ENTER) {
                  handleOnSubmit();
                }
              }}
            />
          </Field>
          <Field>
            <Checkbox
              label="I agree to the terms"
              onChange={event => setAgreeTerm(event.target.checked)}
              checked={agreeTerm}
            />
            <AgreeError>{error.agreeTerm}</AgreeError>
          </Field>
          <Actions>
            <SignUpButton
              size="large"
              loading={loading}
              disabled={loading}
              onClick={handleOnSubmit}
            >
              Sign Up
            </SignUpButton>
            <LoginLink to="/login/">Login</LoginLink>
          </Actions>
        </Body>
      </Card>
    </Layout>
  );
}

export default SignUpPage;
