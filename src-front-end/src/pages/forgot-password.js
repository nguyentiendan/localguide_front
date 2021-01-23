import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import * as API from '../apis';
import breakpoints from '../assets/styles/breakpoints';
import { ENTER } from '../constants/keys';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Input from '../components/Input';
import Button from '../components/CustomButtons/Button.js';
import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Card from '../components/Card/Card.js';
import CardBody from '../components/Card/CardBody.js';
import CardHeader from '../components/Card/CardHeader.js';
import CardFooter from '../components/Card/CardFooter.js';
import Footer from '../components/Footer/Footer.js';
import styles from '../assets/jss/material-kit-react/views/loginPage.js';
import image from '../assets/img/bg7.jpg';

const useStyles = makeStyles(styles);

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

const Text = styled.div`
  color: #5e5c60;
`;

function ForgotPassPage() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');
  setTimeout(function() {
    setCardAnimation('');
  }, 700);

  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // validate signup form
  const isValid = () => {
    let isOK = true;
    setErrorMessage('');

    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (email && !pattern.test(email)) {
      isOK = false;
      setErrorMessage('Please enter valid email');
    }

    if (!email) {
      isOK = false;
      setErrorMessage('Email is required');
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
        setErrorMessage('');
        const { message, status } = await API.forgotPassword(email);
        setLoading(false);
        if (status === true) {
          setEmail('');
          setErrorMessage('');
          // TODO : show popup after send pass
          alert(message);
        } else {
          setLoading(false);
          setErrorMessage(message);
        }
      } catch (error) {
        setLoading(false);
        setErrorMessage('An error has occurred.');
      }
    }
  };

  return (
    <Layout noLogin>
      <SEO title="Forgot Password" />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={5}>
              <Card className={classes[cardAnimaton]}>
                <CardHeader color="warning" className={classes.cardHeader}>
                  <h1>Forgot Password</h1>
                </CardHeader>
                <CardBody>
                  <Text>
                    You forgot your password? Here you can easily retrieve a new password.
                  </Text>
                  <Field>
                    <Input
                      label="Email"
                      placeholder="Your email address"
                      value={email}
                      hasError={!!errorMessage}
                      message={errorMessage}
                      onChange={event => setEmail(event.target.value)}
                      onKeyDown={event => {
                        if (event.keyCode === ENTER) {
                          handleOnSubmit();
                        }
                      }}
                    />
                  </Field>
                  <Actions>
                    <Button
                      color="rose"
                      loading={loading}
                      disabled={loading}
                      onClick={handleOnSubmit}
                    >
                      Send new password
                    </Button>
                    <Button href="/login" color="transparent">
                      Login
                    </Button>
                  </Actions>
                </CardBody>
              </Card>
              <CardFooter className={classes.cardFooter} />
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </Layout>
  );
}

export default ForgotPassPage;
