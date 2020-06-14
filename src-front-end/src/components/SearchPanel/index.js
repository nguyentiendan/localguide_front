import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from '../Input';
import Button from '../Button';
import colors from '../../styles/colors';

const Wrapper = styled.div`
  position: relative;
  min-width: 2rem;
  margin: 0 auto;
  border: none;
  background: ${colors.magenta[50]};
  border-radius: 6px;
  max-width: 600px;
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

const Tab = styled.div`
  color: ${colors.white};
  font-size: 1;
  font-weight: bold;
  flex: 1;
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.magenta[50]};
  background: ${colors.magenta[50]};
  border-radius: 6px 6px 0 0;
  margin-left: -5px;
  z-index: 3;
  cursor: pointer;

  ${({ active }) =>
    !active &&
    `
    z-index: 1;
    border-radius: 0px 6px 0 0;
    background: ${colors.white};
    color: ${colors.magenta[50]};
  `}
`;
const TabWrapper = styled.div`
  display: flex;

  ${Tab}:first-child {
    border-radius: 6px 6px 0 0;
    z-index: 2;
    margin-left: 0;
  }
`;

const TabContent = styled.div`
  padding: 0rem 1rem 1.25rem;
`;

function SearchPanel({ className }) {
  const [currentTab, setCurrentTab] = useState(0);
  return (
    <Wrapper className={className}>
      <TabWrapper>
        <Tab active={currentTab === 0} onClick={() => setCurrentTab(0)}>
          Basic
        </Tab>
        <Tab active={currentTab === 1} onClick={() => setCurrentTab(1)}>
          Advance
        </Tab>
      </TabWrapper>
      {currentTab === 0 && (
        <TabContent>
          <Field>
            <Input
              label="Duration"
              placeholder=""
              value=""
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </Field>
          <Field>
            <Input label="Price" placeholder="" value="" onChange={() => {}} onKeyDown={() => {}} />
          </Field>
        </TabContent>
      )}
      {currentTab === 1 && (
        <TabContent>
          <Field>
            <Input
              label="Check-in"
              placeholder=""
              value=""
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </Field>
          <Field>
            <Input
              label="Check-out"
              placeholder=""
              value=""
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </Field>
          <Field>
            <Input
              label="Language"
              placeholder=""
              value=""
              onChange={() => {}}
              onKeyDown={() => {}}
            />
          </Field>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Field style={{ flex: 1 }}>
              <Input
                label="Gender"
                placeholder=""
                value=""
                onChange={() => {}}
                onKeyDown={() => {}}
              />
            </Field>
            &nbsp; &nbsp;
            <Field style={{ flex: 1 }}>
              <Input label="Age" placeholder="" value="" onChange={() => {}} onKeyDown={() => {}} />
            </Field>
          </div>
        </TabContent>
      )}
      <TabContent>
        <SearchButton>Search</SearchButton>
      </TabContent>
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
