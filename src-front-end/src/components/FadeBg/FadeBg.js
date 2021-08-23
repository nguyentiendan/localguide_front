import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, makeStyles, Paper } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
    backgroundSize: 'cover',
    // height: '380',
    // width: '100%',
    // background: 'black',
    // color: 'white',
    // textAlign: 'center',
    // lineHeight: '300px',
    // fontSize: '5rem',
  },
  // table: {
  //   minWidth: 650,
  // },
}));

function FadeBg(props) {
  const images = [
    {require('../../assets/img/bg2.jpg')},
    {require('../../assets/img/bg3.jpg')},
    {require('../../assets/img/bg4.jpg')},
    {require('../../assets/img/bg7.jpg')},
  ];

  const { children } = props;
  const classes = useStyles();
  return (
    <>
      <Carousel animation="slide" navButtonsAlwaysVisible="true">
        {images.map((img,) => (
          <Box 
            component="div" 
            className={classes.root}
            style={{
              backgroundImage: `url(${img.src})`
            }}
          >
            {children}
          </Box>
        ))}
        {/* <div className={classes.root}>
          <img src={require('../../assets/img/bg3.jpg')} alt="" />
          {children}
        </div>
        <div className={classes.root}>
          <img src={require('../../assets/img/bg4.jpg')} alt="" />
          {children}
        </div>
        <div className={classes.root}>
          <img src={require('../../assets/img/bg7.jpg')} alt="" />
          {children}
        </div> */}
      </Carousel>
    </>
  );
}

export default FadeBg;
