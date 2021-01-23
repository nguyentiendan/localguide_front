import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Tag, Input, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import colors from '../../../assets/styles/colors';
import * as API from '../../../apis';

const Wrapper = styled.div`
  height: 100%;
  padding-right: 1.25rem;
`;

const Title = styled.h2`
  color: ${colors.grey[70]};
`;

const SubTitle = styled.h3`
  font-weight: normal;
`;

const StepLayout = ({ tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [newTagInputVisible, setNewTagInputVisible] = useState(false);
  const [newTagValue, setNewTagValue] = useState('');
  const [defaultTags, setDefaultTags] = useState([]);
  const newTagInputRef = useRef();
  const tagOptions = useMemo(() => _.union(defaultTags, tourCreationInfo.tags || []), [
    tourCreationInfo,
    defaultTags,
  ]);
  const tourName = useMemo(() => tourCreationInfo.tourName, [tourCreationInfo]);
  const tourShortDescription = useMemo(() => tourCreationInfo.tourShortDescription, [
    tourCreationInfo,
  ]);
  const selectedTags = useMemo(() => tourCreationInfo.tags || [], [tourCreationInfo]);

  const updateTourName = useCallback(
    newTourName => {
      if (newTourName.length > 255) {
        return;
      }
      onUpdate({
        ...tourCreationInfo,
        tourName: newTourName,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const updateTourShortDescription = useCallback(
    newTourShortDescription => {
      if (newTourShortDescription.length > 255) {
        return;
      }
      onUpdate({
        ...tourCreationInfo,
        tourShortDescription: newTourShortDescription,
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const updateSelectedTags = useCallback(
    tagOption => {
      onUpdate({
        ...tourCreationInfo,
        tags: _.xor(selectedTags, [tagOption]),
      });
    },
    [onUpdate, tourCreationInfo]
  );

  const addTagOptions = useCallback(
    tagOption => {
      onUpdate({
        ...tourCreationInfo,
        tags: _.union(selectedTags, [tagOption]),
      });
    },
    [onUpdate, tourCreationInfo]
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

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await API.getAllTags();
        setDefaultTags(_.map(data, d => d.tag));
      } catch (e) {
        // ignore
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Title>Let’s get create your great tour!</Title>
        <SubTitle>Your tour name?</SubTitle>
        <Input
          placeholder="Tour name"
          value={tourName}
          onChange={e => updateTourName(e.target.value)}
          size="large"
          style={{ maxWidth: 400 }}
        />
        <br />
        <br />
        <Input
          placeholder="Short description about tour"
          value={tourShortDescription}
          onChange={e => updateTourShortDescription(e.target.value)}
          size="large"
          style={{ maxWidth: 400 }}
        />
        <br />
        <br />
        <br />
        <SubTitle>Appealing points of the tour</SubTitle>
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
    </Spin>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    tourName: PropTypes.string,
    tourShortDescription: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
