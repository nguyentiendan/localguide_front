import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import JoditEditor from 'jodit-react';

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    toolbar: true,
  };

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
      <JoditEditor
        ref={editor}
        value={content || tourCreationInfo?.tourDescription}
        config={config}
        tabIndex={-1}
        onChange={newContent => {
          updateTourDescription(newContent);
          setContent(newContent);
        }}
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
