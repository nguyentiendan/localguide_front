import React from 'react';
import styled from 'styled-components';
import { Slide } from '@material-ui/core';

import Button from '../CustomButtons/Button';
import { smallScreenCss } from '../../assets/styles/responsive-css';

function PriceBox(props) {
  const { show, name, price, loading } = props;

  const BookButton = styled(Button)`
    flex: 0.65;
    width: 100%;
    justify-content: center;

    ${smallScreenCss(`
			margin-top: 15px;
		`)}
  `;

  const Box = styled.div`
    position: fixed;
    bottom: 60px;
    right: 20px;
    width: 300px;
    font-size: 14px;
    font-family: 'Open Sans', Arial, sans-serif;
    font-weight: 400;
    text-align: right;
    margin-left: auto;
    background-color: #fff;
    padding: 5px 20px;
    border-radius: 3px;
    box-shadow: 0px 0px 4px 1px lightgray;
    z-index: 10;

    ${smallScreenCss(`
				width: 300px;
				right: 5px;
				bottom: 5px;
		`)}
  `;

  return (
    <Slide in={show} direction="left">
      <Box>
        <div style={{ textAlign: 'left', marginLeft: 'auto' }}>
          <p>Tour name：{name}</p>
          <p>price：${price}</p>
          <BookButton color="rose" loading={loading} disabled={loading}>
            Book now
          </BookButton>
        </div>
      </Box>
    </Slide>
  )
}

export default PriceBox;