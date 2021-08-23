import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core';

/*
class FadeBg extends Component {
  width100 = {
    width: '100%',
  };
*/
/*
// CSアニメーション用
  bg01 = {
    width: '100%',
    backgroundImage: "url(require('../../assets/img/bg2.jpg'))",
    backgroundSize: 'cover',
  };
  bg02 = {
    width: '100%',
    backgroundImage: "url(require('../../assets/img/bg3.jpg'))",
    backgroundSize: 'cover',
  };
  bg03 = {
    width: '100%',
    backgroundImage: "url(require('../../assets/img/bg4.jpg'))",
    backgroundSize: 'cover',
  };
  bg04 = {
    width: '100%',
    backgroundImage: "url(require('../../assets/img/bg7.jpg'))",
    backgroundSize: 'cover',
  };
*/

const useStyles = makeStyles(() => ({
  root: {
    height: '90vh',
    // maxHeight: "1000px",
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
  return (
    <>
      <Carousel className={classes.carousel} animation="slide">
        <div
          className={classes.root}
          style={{ backgroundImage: `url(${require('../../assets/img/bg2.jpg')})` }}
        >
          {children}
        </div>
        <div
          className={classes.root}
          style={{ backgroundImage: `url(${require('../../assets/img/bg3.jpg')})` }}
        >
          {children}
        </div>
        <div
          className={classes.root}
          style={{ backgroundImage: `url(${require('../../assets/img/bg4.jpg')})` }}
        >
          {children}
        </div>
        <div
          className={classes.root}
          style={{ backgroundImage: `url(${require('../../assets/img/bg7.jpg')})` }}
        >
          {children}
        </div>
      </Carousel>
    </>
  );
}

export default FadeBg;
