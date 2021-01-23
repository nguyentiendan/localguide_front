import React, { useState } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import jwt from 'jsonwebtoken';

import * as API from '../apis';
import { useLocalStorage } from '../utils/storage';
import { AUTH_TOKEN_KEY } from '../utils/auth';
import breakpoints from '../assets/styles/breakpoints';
import { ENTER } from '../constants/keys';
import SEO from '../components/SEO';
import Input from '../components/Input';
import Layout from '../components/CustomLayout';
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import Footer from "../components/Footer/Footer.js";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";
const useStyles = makeStyles(styles);
import image from "../assets/img/bg7.jpg";

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
  /*const [cardAnimaton, setCardAnimation] = useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);*/
  const [cardAnimaton, setCardAnimation] = useState('');
  const classes = useStyles();

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
    <Layout noLogin>
      <SEO title="Login" />      
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="warning" className={classes.cardHeader}>
                  <h1>Login</h1>
                </CardHeader>  
                <CardBody>
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
                  
                  <Actions>
                    <Button color="rose" loading={loading} disabled={loading} onClick={handleLogin}>Login</Button>
                    <Button href="/signup" color="transparent">Create Account</Button>                    
                  </Actions>
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <ForgotPasswordLink to="/forgot-password/">Forgot your password?</ForgotPasswordLink>  
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>        
    </Layout>
  );
}

export default LoginPage;
