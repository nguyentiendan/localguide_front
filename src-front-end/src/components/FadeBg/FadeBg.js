import React from 'react';
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

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


const useStyles = makeStyles(theme => ({
  root: {
    height: '380',
    width: '100%',
    background: 'black',
    color: 'white',
    textAlign: 'center',
    lineHeight: '300px',
    fontSize: '5rem'
  },
  table: {
    minWidth: 650
  }
}));

function FadeBg() {
  const classes = useStyles();
  return (
    <>
      <Carousel animation="slide">
        <div className={classes.root}><img src={require('../../assets/img/bg7.jpg')} /></div>
        <div className={classes.root}><img src={require('../../assets/img/bg3.jpg')} /></div>
        <div className={classes.root}><img src={require('../../assets/img/bg4.jpg')} /></div>
        <div className={classes.root}><img src={require('../../assets/img/bg7.jpg')} /></div>
      </Carousel>
    </>
  );
}



export default FadeBg;
