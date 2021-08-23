import { container, title } from '../jss/material-kit-react';
import imagesStyle from './imagesStyles';

const profilePageStyle = {
  container,
  profile: {
    textAlign: 'center',
    '& img': {
      maxWidth: '160px',
      width: '100%',
      margin: '0 auto',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '996px',
    color: '#494848',
    // textAlign: "center !important"
  },
  name: {
    marginTop: '-100px',
    paddingLeft: '70px',
  },
  ...imagesStyle,
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    // margin: "-60px 30px 0px",
    // borderRadius: "6px",
    // boxShadow:
    //  "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  cardHeader: {
    width: 'auto',
    textAlign: 'center',
    // marginLeft: '20px',
    // marginRight: '20px',
    marginTop: '5px',
    backgroundColor: '#fafafa',
    // padding: '10px 0',
    // marginBottom: '5px',
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '45px',
    minHeight: '5px',
    textDecoration: 'none',
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999',
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center',
  },
  listIcon: {
    display: 'none',
    justifyContent: 'space-between',
    textAlign: 'center',
    gap: '60px',
    color: '#ee305f',
    flexGrow: '0.6',
  },
  flexCenter: {
    display: 'none',
    justifyContent: 'left',
    alignItems: 'left',
  },
};

export default profilePageStyle;
