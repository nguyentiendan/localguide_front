import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  position: relative;
  min-width: 2rem;
  margin: 0;
  padding: 1rem;
  border: none;
  background: ${colors.magenta[50]};
  border-radius: 6px;
`;

const Field = styled.div`
  .label {
    color: ${colors.white};
  }

  * :focus {
    outline: 0;
  }
`;

const SearchButton = styled(Button)`
  width: 100%;
  justify-content: center;
  background: ${colors.white};
  color: ${colors.magenta[50]};
  border: 1px solid ${colors.magenta[50]};
  
  :hover {
    color: ${colors.white};
    border-color: ${colors.white};
  {
`;

function SearchPanel({ className }) {
  return (
    <Wrapper className={className}>
      <Field>
        <Input label="Duration" placeholder="" value="" onChange={() => {}} onKeyDown={() => {}} />
      </Field>
      <Field>
        <Input label="Price" placeholder="" value="" onChange={() => {}} onKeyDown={() => {}} />
      </Field>
      <br />
      <SearchButton>Search</SearchButton>
    </Wrapper>
  );
}

SearchPanel.propTypes = {
  className: PropTypes.string,
};

SearchPanel.defaultProps = {
  className: '',
};

export default SearchPanel;
