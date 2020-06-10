import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

const Wrapper = styled.fieldset`
  position: relative;
  min-width: 2rem;
  height: 40px;
  margin: 0;
  padding: 0;
  border: none;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  font-size: 1rem;
  padding: 0 1rem;
  color: #7e7e7e;
  background-color: #eceff0;
  box-shadow: inset 0px 0px 0px 0px white;
  border: none;
  border-radius: 20px;

  &:focus {
    outline: 0;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);

  cursor: pointer;
`;

function SearchBox({ className, ...inputProps }) {
  return (
    <Wrapper className={className}>
      <SearchInput {...inputProps} />
      <SearchIcon onClick={inputProps.onClick} />
    </Wrapper>
  );
}

SearchBox.propTypes = {
  className: PropTypes.string,
};

SearchBox.defaultProps = {
  className: '',
};

export default SearchBox;
