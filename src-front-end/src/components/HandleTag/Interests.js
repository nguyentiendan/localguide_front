import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Tag, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import colors from '../../styles/colors';

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const TagInterests = ({ createInfo, setCreateInfo, defaultTags }) => {
  const [newTagInputVisible, setNewTagInputVisible] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const newTagInputRef = useRef();
  const tagOptions = useMemo(() => _.union(defaultTags, createInfo.tags || []), [
    createInfo,
    defaultTags,
  ]);
  const selectedTags = useMemo(() => createInfo.tags || [], [createInfo]);
  const onUpdate = useCallback(
    newTourCreationInfo => {
      const tour = { ...newTourCreationInfo };
      setCreateInfo({
        ...createInfo,
        ...tour,
      });
    },
    [createInfo]
  );

  const updateSelectedTags = useCallback(
    tagOption => {
      onUpdate({
        ...createInfo,
        tags: _.xor(selectedTags, [tagOption]),
      });
    },
    [onUpdate, createInfo]
  );

  const addTagOptions = useCallback(
    tagOption => {
      onUpdate({
        ...createInfo,
        tags: _.union(selectedTags, [tagOption]),
      });
    },
    [onUpdate, createInfo]
  );

  const showInput = useCallback(() => {
    setNewTagInputVisible(!newTagInputVisible);
  }, [newTagInputVisible]);

  const handleInputChange = useCallback(e => {
    setNewTagValue(e.target.value);
  }, []);

  const handleInputConfirm = useCallback(() => {
    if (newTagValue && newTagValue.trim()) {
      addTagOptions(newTagValue);
    }
    setNewTagInputVisible(false);
    setNewTagValue('');
  }, [newTagValue]);

  useLayoutEffect(() => {
    if (newTagInputRef.current) {
      newTagInputRef.current.focus();
    }
  }, [newTagInputVisible]);
  return (
    <Wrapper>
      {_.map(tagOptions, tagOption => (
        <Tag
          key={tagOption}
          color={_.includes(selectedTags, tagOption) ? colors.magenta[50] : colors.magenta[20]}
          onClick={() => updateSelectedTags(tagOption)}
          style={{ marginBottom: '0.5rem' }}
        >
          {tagOption}
        </Tag>
      ))}
      <br />
      {newTagInputVisible && (
        <Input
          ref={newTagInputRef}
          type="text"
          size="small"
          style={{ width: 78 }}
          value={newTagValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!newTagInputVisible && (
        <Tag onClick={showInput} className="site-tag-plus">
          <PlusOutlined />
          &nbsp;Type your own
        </Tag>
      )}
    </Wrapper>
  );
};

TagInterests.propTypes = {
  createInfo: PropTypes.shape({
    tourName: PropTypes.string,
    tourShortDescription: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  setCreateInfo: PropTypes.func,
  defaultTags: PropTypes.PropTypes.arrayOf(PropTypes.string),
};

TagInterests.defaultProps = {
  createInfo: {},
  setCreateInfo: () => {},
  defaultTags: [],
};

export default TagInterests;
