import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SunEditor from 'suneditor-react';

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const editorRef = useRef();
  const [content, setContent] = useState('');

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
      <div>
        <SunEditor
          ref={editorRef}
          setContents={content || tourCreationInfo?.tourDescription}
          lang="en"
          width="100%"
          height="300"
          placeholder="Please type content here..."
          showToolbar
          enableToolbar
          onChange={newContent => {
            updateTourDescription(newContent);
            setContent(newContent);
          }}
          setOptions={{
            buttonList: [
              [
                'undo',
                'redo',
                'font',
                'fontSize',
                'formatBlock',
                'blockquote',
                'bold',
                'underline',
                'italic',
                'strike',
                'subscript',
                'superscript',
                'fontColor',
                'hiliteColor',
                'textStyle',
                'removeFormat',
                'outdent',
                'indent',
                'align',
                'horizontalRule',
                'list',
                'lineHeight',
                'link',
                'image',
                'video',
                'showBlocks',
                'codeView',
                'preview',
                'fullScreen',
              ],
            ],
          }}
        />
      </div>
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
