import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import * as API from '../apis';
import breakpoints from '../assets/styles/breakpoints';
import { ENTER } from '../constants/keys';
import SEO from '../components/SEO';
import Input from '../components/Input';
import Checkbox from '../components/Checkbox';
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

const TermLink = styled(Link)`
  color: #7e7e7e;

  @media (max-width: ${breakpoints.sm}) {
    display: inline-block;
    transform: translateY(-100%);
  }
`;

const AgreeError = styled.div`
  padding-top: 5px;
  color: red;
  font-weight: normal;
  text-align: left;
`;

function SignUpPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const classes = useStyles();

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
    <Layout noLogin>
      <SEO title="Create Account" />
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
                    <h1>Create Account</h1>
                  </CardHeader>                    
                  <CardBody>
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
                      <Button color="rose" loading={loading} disabled={loading} onClick={handleOnSubmit}>Create</Button>
                      <Button href="/login" color="transparent">Have an account ?</Button>
                    </Actions>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <TermLink to="/">Localguide Pal Term and Service</TermLink>  
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
    </Layout >
  );
}

export default SignUpPage;
