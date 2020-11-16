import React, { useCallback, useState } from 'react';
import { UserOutlined, EditOutlined } from '@ant-design/icons';
import { Spin, Avatar } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as API from '../../apis';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 575px) {
    justify-content: flex-end;
  }
`;

const UploadCustom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  cursor: pointer;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;
  transition: opacity 0.5s ease-out;
  .anticon {
    font-size: 24px;
    color: #fff;
    display: none;
    z-index: 1;
    position: absolute;
    bottom: 5px;
  }
  input {
    display: none !important;
  }
  &:hover {
    opacity: 0.5;
    .anticon {
      display: block;
    }
    &:after {
      display: block;
    }
  }
  &:after {
    content: '';
    width: 80px;
    height: 30px;
    background: #171717;
    position: absolute;
    bottom: 0;
    display: none;
  }
`;

const UploadAvatar = ({ uid, src }) => {
  const [avatarBlob, setAvatarBlob] = useState();
  const [loading, setLoading] = useState(false);
  const handleUploadCoverPhoto = useCallback(
    async file => {
      try {
        setLoading(true);
        await API.uploadAvatar({ uid, file });
        setLoading(false);
      } catch (e) {
        // ignored
      }
    },
    [uid]
  );
  return (
    <Wrapper>
      <label htmlFor="avatar">
        <Spin spinning={loading}>
          <UploadCustom>
            <EditOutlined />
            <Avatar size={128} icon={<UserOutlined />} src={avatarBlob || src} />
            <input
              id="avatar"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={e => {
                handleUploadCoverPhoto(e.target.files[0]);
                setAvatarBlob(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </UploadCustom>
        </Spin>
      </label>
    </Wrapper>
  );
};

export default UploadAvatar;

UploadAvatar.propTypes = {
  uid: PropTypes.string.isRequired,
  src: PropTypes.string,
};

UploadAvatar.defaultProps = {
  src: '',
};
