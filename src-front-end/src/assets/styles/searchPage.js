import imagesStyle from './imagesStyles';

const searchPageStyle = {
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    '@media (min-width: 576px)': {
      maxWidth: '570px',
    },
    '@media (min-width: 768px)': {
      maxWidth: '760px',
    },
    '@media (min-width: 992px)': {
      maxWidth: '960px',
    },
    '@media (min-width: 1200px)': {
      maxWidth: '1140px',
    },
    paddingRight: '15px',
    paddingLeft: '15px',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',
  },

  description: {
    margin: '1.071rem auto 0',
    maxWidth: '996px',
    color: '#494848',
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
  title: {
    marginRight: '10px',
  },
  sub_title: {
    color: '#FFFFFF',
    display: 'inline-block',
    position: 'relative',
    minHeight: '5px',
    marginLeft: '50px',
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

export default searchPageStyle;
