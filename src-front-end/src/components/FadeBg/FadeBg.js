import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles, Paper } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    maxHeight: '765px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
  },
  carousel: {
    width: '100%',
  },
}));

function FadeBg(props) {
  const { children } = props;
  const classes = useStyles();
  const images = [
    require('../../assets/img/bg2.jpg'),
    require('../../assets/img/bg3.jpg'),
    require('../../assets/img/bg4.jpg'),
    require('../../assets/img/bg7.jpg'),
  ];
  return (
    <>
      <Carousel className={classes.carousel} animation="slide">
        {images.map(img => (
          <Paper>
            <div className={classes.root} style={{ backgroundImage: `url(${img})` }}>
              {children}
            </div>
          </Paper>
        ))}
      </Carousel>
    </>
  );
}

export default FadeBg;
