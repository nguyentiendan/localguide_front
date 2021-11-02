import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
// import Grid from '@material-ui/core/Grid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import { Spin } from 'antd';
import BigScreen from '../Responsive/BigScreen';
import SmallScreen from '../Responsive/SmallScreen';
import GridItem from '../Grid/GridItem';
import GridContainer from '../Grid/GridContainer';
import Footer from '../Footer/Footer';
import SEO from '../SEO';
import Layout from '../CustomLayout';
import styles from '../../assets/styles/tourPage';
import colors from '../../assets/styles/colors';
import { bigScreenCss, smallScreenCss } from '../../assets/styles/responsive-css';

const useStyles = makeStyles({
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '996px',
    color: '#494848',
    // textAlign: 'center !important',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh',
  },
  headBG: {
    backgroundColor: '#e0e0e0',
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0',
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
  },
});

// const useStyles = makeStyles(styles);

const ChatPanel = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Layout scrollHeight={10} textColor="black">
      <div className={classes.main} style={{ paddingTop: '70px' }}>
        <div className={classes.container}>
          <Spin spinning={loading}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.description} style={{ paddingTop: '0px' }}>
                  <Typography variant="h5" className="header-message">
                    Chat
                  </Typography>
                </div>
              </GridItem>
            </GridContainer>

            <GridContainer>
              <GridItem xs={3} className={classes.borderRight500}>
                <List>
                  <ListItem button key="RemySharp">
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="" />
                    </ListItemIcon>
                    <ListItemText primary="John Wick" />
                  </ListItem>
                </List>
                <Divider />
                <GridItem item xs={12} style={{ padding: '10px' }}>
                  <TextField
                    id="outlined-basic-email"
                    label="Search"
                    variant="outlined"
                    fullWidth
                  />
                </GridItem>
                <Divider />
                <List>
                  <ListItem button key="RemySharp">
                    <ListItemIcon>
                      <Avatar alt="Remy Sharp" src="" />
                    </ListItemIcon>
                    <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                    <ListItemText secondary="online" align="right" />
                  </ListItem>
                  <ListItem button key="Alice">
                    <ListItemIcon>
                      <Avatar alt="Alice" src="" />
                    </ListItemIcon>
                    <ListItemText primary="Alice">Alice</ListItemText>
                  </ListItem>
                  <ListItem button key="CindyBaker">
                    <ListItemIcon>
                      <Avatar alt="Cindy Baker" src="" />
                    </ListItemIcon>
                    <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                  </ListItem>
                </List>
              </GridItem>
              <GridItem xs={9}>
                <List className={classes.messageArea}>
                  <ListItem key="1">
                    <Grid container>
                      <GridItem xs={12}>
                        <ListItemText align="right" primary="Hey man, What's up ?" />
                      </GridItem>
                      <GridItem xs={12}>
                        <ListItemText align="right" secondary="09:30" />
                      </GridItem>
                    </Grid>
                  </ListItem>
                  <ListItem key="2">
                    <Grid container>
                      <GridItem xs={12}>
                        <ListItemText align="left" primary="Hey, Iam Good! What about you ?" />
                      </GridItem>
                      <GridItem xs={12}>
                        <ListItemText align="left" secondary="09:31" />
                      </GridItem>
                    </Grid>
                  </ListItem>
                  <ListItem key="3">
                    <Grid container>
                      <GridItem xs={12}>
                        <ListItemText align="right" primary="Cool. i am good, let's catch up!" />
                      </GridItem>
                      <GridItem xs={12}>
                        <ListItemText align="right" secondary="10:30" />
                      </GridItem>
                    </Grid>
                  </ListItem>
                </List>
                <Divider />
                <Grid container style={{ padding: '20px' }}>
                  <GridItem xs={11}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                  </GridItem>
                  <GridItem xs={1} align="right">
                    <Fab color="primary" aria-label="add">
                      <SendIcon />
                    </Fab>
                  </GridItem>
                </Grid>
              </GridItem>
            </GridContainer>
          </Spin>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPanel;
