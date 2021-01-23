/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { Tag } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  display: flex;
  padding-top: 0px;
  margin-left: 0px;
  text-align:left;
  & > b {
    min-width: 80px;
  }
  
  @media (min-width: 768px) {    
    margin-top: 0px;
    padding-top: 0px;
  }
  @media (min-width: 992px) {
    margin-top: 0px;
    padding-top: 0px;
    
  }
`;

export default function InterestsOrExtras({ data, title }) {
  return (
    <ContainerWrapper>
      <b>{title}:</b>
      <div>
        {data &&
          _.map(data.split(';'), (tag, index) => (
            <Tag color="#f12f60" style={{ marginBottom: 20 }} key={index}>
              {tag}
            </Tag>
          ))}
      </div>
    </ContainerWrapper>
  );
}

InterestsOrExtras.propTypes = {
  data: PropTypes.string,
  title: PropTypes.string,
};

InterestsOrExtras.defaultProps = {
  data: '',
  title: '',
};
