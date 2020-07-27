import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MdStar, MdStarHalf } from 'react-icons/md';

import colors from '../../styles/colors';

const Wrapper = styled.div`
  display: inline-block;
`;

const FullStar = styled(MdStar)`
  color: ${colors.magenta[50]};
`;

const HalfStar = styled(MdStarHalf)`
  color: ${colors.magenta[50]};
`;

const RatingStars = ({ className, rate }) => {
  const stars = [];
  for (let i = 0; i < rate; i++) {
    if (rate - i <= 0.5) {
      stars.push(<HalfStar key={i} />);
    } else {
      stars.push(<FullStar key={i} />);
    }
  }
  return <Wrapper className={className}>{stars}</Wrapper>;
};

RatingStars.propTypes = {
  className: PropTypes.string,
  rate: PropTypes.number.isRequired,
};

RatingStars.defaultProps = {
  className: '',
};

export default RatingStars;
