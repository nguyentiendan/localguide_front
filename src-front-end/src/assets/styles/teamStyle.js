import { cardTitle, title } from '../jss/material-kit-react.js';
import imagesStyle from './imagesStyles.js';

const teamStyle = {
  section: {
    padding: '30px 0',
    textAlign: 'center',
    maxWidth: '100%',
  },
  section_odd: {
    padding: '30px 0',
    textAlign: 'center',
  },
  title: {
    // ...title,
    marginBottom: '1rem',
    color: '#3C4858',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    // fontFamily:"'system-ui','-apple-system','BlinkMacSystemFont','.SFNSText-Regular',sans-serif",
    // fontFamily:'"Roboto Slab", "Times New Roman", serif',
    fontFamily: 'Balto Web,Helvetiva,Arial,sans-serif',
    fontWeight: 'bold',
    fontSize: '2.11572rem',
    lineHeight: 1.1,
    textRendering: 'optimizeLegibility',
    textAlign: 'left',
  },
  ...imagesStyle,
  itemGrid: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cardTitle,
  smallTitle: {
    color: '#6c757d',
  },
  description: {
    color: '#999',
  },
  justifyCenter: {
    justifyContent: 'center !important',
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
  margin5: {
    margin: '5px',
  },
};

export default teamStyle;
