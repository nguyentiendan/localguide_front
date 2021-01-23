/*eslint-disable*/
import React from "react";
import styled, { css } from 'styled-components';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

// @material-ui/icons
import { Apps, ExitToApp, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js"
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js"
import useAuth from '../../utils/useAuth';
import { isBrowser } from '../../utils/browser';


const Delimiter = styled.hr`
  height: 1px;
  margin: 5px 0;
`;

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();
  const { user, logout } = useAuth();
  
  const authInfo = user ? (
    <>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Menu"
          hoverColor="rose"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            user.role === 3 && ( 
              <a 
                href="/admin"
                target="_blank"
                className={classes.dropdownLink}
              >
                Admin Setting
              </a>  
            ),       
            user.role === 2 && (    
              <a 
                href="/my-tours"
                target="_blank"
                className={classes.dropdownLink}
              >
                Guide Admin
              </a>
            ),
            user.role === 1 && (
              <a 
                href="/user-profile"
                target="_blank"
                className={classes.dropdownLink}
              >
                Profile
              </a>
            ),
            <a
              href="/"
              target="_blank"
              className={classes.dropdownLink}
            >
              Change Password
            </a>,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="#"
          color="transparent"
          //target="_blank"
          className={classes.navLink}
          onClick={logout}
        >
          <ExitToApp className={classes.icons} /> Logout
        </Button>
      </ListItem>
    </>
  ) : (
    <>
      <ListItem className={classes.listItem}>        
        <Button
          color="rose"
          href="/login"
        >
          Login
        </Button>
      
        <Button
          href="/signup"
          color="transparent"
          size="sm"
        >
          Sign up
        </Button>
      </ListItem>
    </>
  ); 

  return (
      <List className={classes.list}>
        {isBrowser() && authInfo}
      </List>
    

  );
}
