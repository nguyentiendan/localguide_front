import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'antd';

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const tourDescription = useMemo(() => tourCreationInfo.tourDescription, [tourCreationInfo]);

  const updateTourDescription = useCallback(
    newTourDescription => {
      onUpdate({
        ...tourCreationInfo,
        tourDescription: newTourDescription,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  return (
    <Wrapper>
      <SubTitle>Description about tour</SubTitle>
      <Input.TextArea
        autoSize={{ minRows: 8 }}
        placeholder="Description"
        value={tourDescription}
        onChange={e => updateTourDescription(e.target.value)}
        size="large"
        // style={{ maxWidth: 400 }}
      />
    </Wrapper>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    tourDescription: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
