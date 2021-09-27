import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';

import colors from '../../assets/styles/colors';

const Wrapper = styled.div`
  position: relative;
  /* min-width: 2rem; */
  margin: 0 auto;
  border: none;
  background: ${colors.white};
  border-radius: 6px;
`;

const Field = styled.div`
  .label {
    color: ${colors.black};
  }

  * :focus {
    outline: 0;
  }
`;

const Label = styled.p`
  line-height: 20px;
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  color: #2e2e2e;
  padding: 3px 0;
  text-align: left;
  margin-bottom: 0;
`;

function GuideSearchPanel({ data, className }) {
  const handleChange = newValue => {
    console.log(newValue);
  };

  const interestOptions = [
    { value: 'game', label: 'game' },
    { value: 'anime', label: 'anime' },
    { value: 'movie', label: 'movie' },
    { value: 'temple', label: 'temple' },
    { value: 'music', label: 'music' },
  ];

  const colorStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      width: '250px',
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: '#F0E6E9',
    }),
    clearIndicator: styles => ({
      ...styles,
      padding: '2px',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  return (
    <Wrapper className={className}>
      <Label>Filter by Guide</Label>
      <Field>
        <Label>Interest</Label>
        <CreatableSelect
          placeholder="Input your interest"
          isMulti
          closeMenuOnSelect={false}
          onChange={handleChange}
          options={interestOptions}
          styles={colorStyles}
        />
      </Field>
      <Field>
        <Label>Extras</Label>
        <CreatableSelect
          placeholder="Input your extras"
          isMulti
          closeMenuOnSelect={false}
          onChange={handleChange}
          options={interestOptions}
          styles={colorStyles}
        />
      </Field>
      <Field style={{ marginBottom: '15px' }}>
        <Label>Language</Label>
        <CreatableSelect
          placeholder="Select language"
          isMulti
          closeMenuOnSelect={false}
          onChange={handleChange}
          options={interestOptions}
          styles={colorStyles}
        />
      </Field>
    </Wrapper>
  );
}

GuideSearchPanel.propTypes = {
  className: PropTypes.string,
};

GuideSearchPanel.defaultProps = {
  className: '',
};

export default GuideSearchPanel;
