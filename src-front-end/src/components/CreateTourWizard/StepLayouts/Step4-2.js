import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { Button, Col, Modal, Row, Spin, Input, Upload, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import * as API from '../../../apis';
import { getBase64, getCndResourceUrl } from '../../../utils/commons';
import { uploadPhoto } from '../../../apis';

const Wrapper = styled.div`
  height: 100%;

  .photo-upload {
    .ant-upload-select,
    .ant-upload-list-picture-card-container,
    .ant-upload-list-item-list-type-picture-card {
      float: none;
      width: 100%;
      height: 200px;
    }
  }
`;

const SubTitle = styled.h4`
  font-weight: normal;
`;

const ImgEditorWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Img = styled.img`
  margin-bottom: 0.5rem;
  height: 200px;
  object-fit: cover;
`;

const ImgEditor = ({ src, caption, name, updateCaption, deletePhoto }) => {
  const handleUpdateCaption = useCallback(
    e => {
      updateCaption(e.target.value, name);
    },
    [name, caption, updateCaption]
  );
  const handleDeletePhoto = useCallback(() => {
    deletePhoto(name);
  }, [name, deletePhoto]);

  if (!src) {
    return <></>;
  }

  return (
    <ImgEditorWrapper>
      <Img alt="preview" style={{ width: '100%' }} src={src} />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input placeholder="Caption" onBlur={handleUpdateCaption} />
        {deletePhoto && (
          <Button onClick={handleDeletePhoto} block danger>
            Delete Photo
          </Button>
        )}
      </Space>
    </ImgEditorWrapper>
  );
};

ImgEditor.propTypes = {
  src: PropTypes.string,
  caption: PropTypes.string,
  name: PropTypes.string,
  updateCaption: PropTypes.func,
  deletePhoto: PropTypes.func,
};

ImgEditor.defaultProps = {
  src: '',
  caption: '',
  name: '',
  updateCaption: () => {},
  deletePhoto: null,
};

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [photos, setPhotos] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState('');

  const tourId = useMemo(() => {
    return tourCreationInfo && tourCreationInfo.id;
  }, [tourCreationInfo]);

  const uid = useMemo(() => {
    return user && user.uid;
  }, [user]);

  const handleCancel = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const updateCaption = useCallback(
    async (caption, name) => {
      setLoading(true);
      try {
        await API.updateCaption({ caption, name, tourId, uid });
      } catch (e) {
        // ignored
      }
      setLoading(false);
    },
    [tourId, uid]
  );

  const deletePhoto = useCallback(
    async name => {
      setLoading(true);
      try {
        await API.deletePhoto({ name, tourId, uid });
      } catch (e) {
        // ignored
      }
      setLoading(false);
      onUpdate();
    },
    [tourId, uid]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await API.getTourPhotos({ tourId, uid });
        const { data: coverPhotoUrl } = await API.getTourCoverPhoto({ tourId, uid });
        setPhotos(data);
        setCoverPhoto(coverPhotoUrl);
      } catch (e) {
        // ignored
      }
      setLoading(false);
    })();
  }, [tourId, uid, tourCreationInfo]);

  const handleUploadPhoto = useCallback(
    async file => {
      if (!tourCreationInfo.id) {
        return;
      }

      try {
        setLoading(true);
        await uploadPhoto({ tourId: tourCreationInfo.id, file });
      } catch (e) {
        // ignored
      }

      setLoading(false);
      onUpdate();
    },
    [tourCreationInfo, onUpdate]
  );

  const handlePreview = useCallback(imgSrc => {
    setPreviewVisible(true);
    setPreviewImage(imgSrc);
  }, []);

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <SubTitle>
          Photos help guests imagine about your place. You can start with one and add more after you
          publish.
        </SubTitle>
        <br />
        <Row>
          <Col span={24}>
            <ImgEditor src={coverPhoto} caption="" />
          </Col>
        </Row>
        <br />
        <Row gutter={16}>
          {_.map(photos, photo => (
            <Col key={photo.name} span={6}>
              <ImgEditor
                src={getCndResourceUrl(photo.name)}
                name={photo.name}
                caption={photo.caption}
                updateCaption={updateCaption}
                deletePhoto={deletePhoto}
              />
            </Col>
          ))}
          <Col span={6}>
            <Upload
              className="photo-upload"
              listType="picture-card"
              fileList={[]}
              previewFile={getBase64}
              onPreview={handlePreview}
              action={handleUploadPhoto}
            >
              <PlusOutlined />
              <div className="ant-upload-text">Upload photo</div>
            </Upload>
          </Col>
        </Row>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Wrapper>
    </Spin>
  );
};

StepLayout.propTypes = {
  tourCreationInfo: PropTypes.shape({
    id: PropTypes.number,
  }),
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
