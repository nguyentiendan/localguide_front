import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import Button from '../../components/CustomButtons/Button';
import { bigScreenCss, smallScreenCss } from '../../assets/styles/responsive-css';


function PriceBox(props) {

    const BookButton = styled(Button)`
        flex: 0.65;
        width: 100%;
        justify-content: center;

        ${smallScreenCss(`
            margin-top: 15px;
        `)}
    `;

    const Styles = styled.div`
        position: fixed;
        bottom: 0;
        right: 0;
        width: 40%;
        text-align: right;
        margin-left: auto;

        ${smallScreenCss(`
            width: 100%;
        `)}
    `;
console.log(props);
    return (
        <div style={Styles}>
            <div style={{ textAlign: 'left', marginLeft: 'auto' }}>
                <p>Tour name：{props.name}</p>
                <p>price：{props.price}</p>
                <BookButton color="rose" loading={props.loading} disabled={props.loading}>
                    Book now
                </BookButton>
            </div>
        </div>
    )

}

export default PriceBox;