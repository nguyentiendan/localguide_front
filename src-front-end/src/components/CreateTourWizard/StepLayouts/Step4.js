import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Row, Col } from 'antd';

import colors from '../../../styles/colors';
import { uploadCoverPhoto, uploadPhoto } from '../../../apis';

const Wrapper = styled.div`
  height: 100%;

  .cover-photo-upload {
    .ant-upload-select,
    .ant-upload-list-picture-card-container,
    .ant-upload-list-item-list-type-picture-card {
      float: none;
      width: 100%;
      height: 300px;
    }
  }
`;

const Title = styled.h2`
  color: ${colors.grey[70]};
`;

const SubTitle = styled.h4`
  font-weight: normal;
`;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const coverPhotoList = useMemo(
    () => (tourCreationInfo.coverPhoto ? [tourCreationInfo.coverPhoto] : []),
    [tourCreationInfo]
  );
  const photos = useMemo(() => tourCreationInfo.photos || [], [tourCreationInfo]);

  const handleCancel = useCallback(() => {
    setPreviewVisible(false);
  }, []);

  const handlePreview = useCallback(async file => {
    if (!file.url && !file.preview) {
      // eslint-disable-next-line no-param-reassign
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  }, []);

  const handleCoverPhotoChange = useCallback(
    ({ fileList }) => {
      onUpdate({
        ...tourCreationInfo,
        coverPhoto: fileList && fileList.length > 0 ? fileList[0] : undefined,
      });
    },
    [onUpdate, coverPhotoList, tourCreationInfo]
  );

  const handlePhotoChange = useCallback(
    ({ fileList }) => {
      onUpdate({
        ...tourCreationInfo,
        photos: [...fileList],
      });
    },
    [onUpdate, photos, tourCreationInfo]
  );

  const handleUploadCoverPhoto = useCallback(
    file => {
      if (!tourCreationInfo.id) {
        return new Promise(() => {});
      }

      return uploadCoverPhoto({ tourId: tourCreationInfo.id, file });
    },
    [tourCreationInfo]
  );

  const handleUploadPhoto = useCallback(
    file => {
      if (!tourCreationInfo.id) {
        return new Promise(() => {});
      }

      return uploadPhoto({ tourId: tourCreationInfo.id, file });
    },
    [tourCreationInfo]
  );

  const uploadButton = text => (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{text}</div>
    </div>
  );

  return (
    <Wrapper>
      <Title>{`Great progress, ${user.Fullname}`}</Title>
      <SubTitle>You can upload photo to finish create tour, or you can upload after.</SubTitle>
      <SubTitle>
        Photos help guests imagine about your place. You can start with one and add more after you
        publish.
      </SubTitle>
      <br />

      <Row gutter={16}>
        <Col span={12}>
          <Upload
            className="cover-photo-upload"
            listType="picture-card"
            fileList={coverPhotoList}
            previewFile={getBase64}
            onPreview={handlePreview}
            onChange={handleCoverPhotoChange}
            action={handleUploadCoverPhoto}
          >
            {coverPhotoList.length >= 1 ? null : uploadButton('Upload cover photo')}
          </Upload>
        </Col>
        <Col span={12}>
          <Upload
            listType="picture-card"
            fileList={photos}
            onPreview={handlePreview}
            onChange={handlePhotoChange}
            action={handleUploadPhoto}
          >
            {photos.length >= 5 ? null : uploadButton('Upload photo')}
          </Upload>
        </Col>
      </Row>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </Wrapper>
  );
};

StepLayout.propTypes = {
  user: PropTypes.shape({
    Fullname: PropTypes.string,
  }),
  tourCreationInfo: PropTypes.shape({
    id: PropTypes.number,
    coverPhoto: PropTypes.shape({}),
    photos: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  user: { Fullname: '' },
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
