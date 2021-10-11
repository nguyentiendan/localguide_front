import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CreatableSelect from 'react-select/creatable';
import { Form } from 'antd';
import _ from 'lodash';

import colors from '../../assets/styles/colors';
import * as API from '../../apis';

const Wrapper = styled.div`
  position: relative;
  padding: 0 12px;
  border: none;
  background: ${colors.white};
  border-radius: 6px;
  margin-bottom: 15px;
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

function GuideSearchPanel(props) {
  const [interest, setInterest] = useState([]);
  const [extras, setExtras] = useState([]);
  const [language, setLanguage] = useState([]);
  const { 
    className,
    onChangeInterest,
    onChangeExtras,
    onChangeLanguage,
    selectInterest,
    selectExtras,
    selectLanguage,
    form,
  } = props;

  const colorStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
    }),
    multiValue: styles => ({
      ...styles,
      backgroundColor: '#F0E6E9',
    }),
    clearIndicator: styles => ({
      ...styles,
      padding: '5px 2px',
    }),
    dropdownIndicator: () => ({
      display: 'none',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
  };

  const fetchInterests = useCallback(async () => {
    const response = await API.getAllInterest();
    const data = [];
    _.forEach(response.data, value => {
      data.push({ value: value.interest, label: value.interest });
    })
    setInterest(data);
  });

  const fetchExtras = useCallback(async () => {
    const response = await API.getAllExtra();
    const data = [];
    _.forEach(response.data, value => {
      data.push({ value: value.extra, label: value.extra });
    })
    setExtras(data);
  });

  const fetchLanguage = useCallback(async () => {
    const response = await API.getAllLang();
    const data = [];
    _.forEach(response.data, value => {
      data.push({ value: value.language, label: value.language });
    })
    setLanguage(data);
  });

  useEffect(() => {
    fetchInterests();
    fetchExtras();
    fetchLanguage();
  }, []);

  return (
    <Wrapper className={className}>
      <Form form={form}>
        <Label>Filter by Guide</Label>
        <Form.Item noStyle>
          <Label>Interest</Label>
          <CreatableSelect
            placeholder="Input your interest"
            isMulti
            closeMenuOnSelect={false}
            onChange={onChangeInterest}
            options={interest}
            styles={colorStyles}
            value={selectInterest}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Label>Extras</Label>
          <CreatableSelect
            placeholder="Input your extras"
            isMulti
            closeMenuOnSelect={false}
            onChange={onChangeExtras}
            options={extras}
            styles={colorStyles}
            value={selectExtras}
          />
        </Form.Item>
        <Form.Item noStyle>
          <Label>Language</Label>
          <CreatableSelect
            placeholder="Select language"
            isMulti
            closeMenuOnSelect={false}
            onChange={onChangeLanguage}
            options={language}
            styles={colorStyles}
            value={selectLanguage}
          />
        </Form.Item>
      </Form>
    </Wrapper>
  );
}

GuideSearchPanel.propTypes = {
  className: PropTypes.string,
  onChangeInterest: PropTypes.func,
  onChangeExtras: PropTypes.func,
  onChangeLanguage: PropTypes.func,
  selectInterest: PropTypes.arrayOf(PropTypes.shape({})),
  selectExtras: PropTypes.arrayOf(PropTypes.shape({})),
  selectLanguage: PropTypes.arrayOf(PropTypes.shape({})),
  form: PropTypes.shape({}),
};

GuideSearchPanel.defaultProps = {
  className: '',
  onChangeInterest: () => {},
  onChangeExtras: () => {},
  onChangeLanguage: () => {},
  selectInterest: null,
  selectExtras: null,
  selectLanguage: null,
  form: null,
};

export default GuideSearchPanel;
