import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Space, Spin, Upload } from 'antd';

import colors from '../../../styles/colors';
import * as API from '../../../apis';
import { uploadCoverPhoto, uploadPhoto } from '../../../apis';

const Wrapper = styled.div`
  height: 100%;

  .cover-photo-upload {
    .ant-upload-select,
    .ant-upload-list-picture-card-container,
    .ant-upload-list-item-list-type-picture-card {
      float: none;
      width: 100%;
    }
  }
`;

const Title = styled.h2`
  color: ${colors.grey[70]};
`;

const SubTitle = styled.h4`
  font-weight: normal;
`;

const ImgEditorWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Img = styled.img`
  margin-bottom: 0.5rem;
  height: 100px;
  object-fit: cover;
`;

const ImgEditor = ({ src, caption, name, updateCaption, deletePhoto, type }) => {
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

  let photoType = '';
  if (type) {
    photoType = `${type} `;
  }

  return (
    <ImgEditorWrapper>
      <Img alt="preview" style={{ width: '100%' }} src={src} />
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input placeholder="Caption" onBlur={handleUpdateCaption} />
        {deletePhoto && (
          <Button onClick={handleDeletePhoto} block danger>
            {`Delete ${photoType}Photo`}
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
  type: PropTypes.string,
};

ImgEditor.defaultProps = {
  src: '',
  caption: '',
  name: '',
  updateCaption: () => {},
  deletePhoto: null,
  type: undefined,
};

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const tourId = useMemo(() => {
    return tourCreationInfo && tourCreationInfo.id;
  }, [tourCreationInfo]);

  const uid = useMemo(() => {
    return user && user.uid;
  }, [user]);

  const { coverPhoto, photos = [] } = tourCreationInfo;

  const handleCoverPhotoChange = useCallback(
    uploadedCoverPhoto => {
      onUpdate({
        ...tourCreationInfo,
        coverPhoto: { ...uploadedCoverPhoto },
      });
    },
    [onUpdate, coverPhoto, tourCreationInfo]
  );

  const handlePhotosChange = useCallback(
    uploadedPhotos => {
      onUpdate({
        ...tourCreationInfo,
        photos: _.concat(photos, uploadedPhotos).filter(v => !!v),
      });
    },
    [onUpdate, photos, tourCreationInfo]
  );

  const handleUploadCoverPhoto = useCallback(
    async file => {
      if (!tourCreationInfo.id) {
        return;
      }

      try {
        setLoading(true);
        const uploadedRes = await uploadCoverPhoto({ tourId: tourCreationInfo.id, file });
        handleCoverPhotoChange(uploadedRes.data[0]);
      } catch (e) {
        // ignored
      }

      setLoading(false);
    },
    [tourCreationInfo, loading]
  );

  const handleUploadPhoto = useCallback(
    async file => {
      if (!tourCreationInfo.id) {
        return;
      }

      try {
        setLoading(true);
        const uploadedRes = await uploadPhoto({ tourId: tourCreationInfo.id, file });
        handlePhotosChange(uploadedRes.data);
      } catch (e) {
        // ignored
      }

      setLoading(false);
    },
    [tourCreationInfo]
  );

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
        const removedPhotos = [...photos];
        _.remove(removedPhotos, photo => photo.name === name);
        onUpdate({
          ...tourCreationInfo,
          photos: removedPhotos,
        });
      } catch (e) {
        // ignored
      }
      setLoading(false);
    },
    [tourId, uid, photos]
  );

  const deleteCoverPhoto = useCallback(
    async name => {
      setLoading(true);
      try {
        await API.deletePhoto({ name, tourId, uid });
        onUpdate({
          ...tourCreationInfo,
          coverPhoto: undefined,
        });
      } catch (e) {
        // ignored
      }
      setLoading(false);
    },
    [tourId, uid]
  );

  const uploadButton = text => (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{text}</div>
    </div>
  );

  return (
    <Spin spinning={loading}>
      <Wrapper>
        <Title>{`Great progress, ${user && user.fullname}`}</Title>
        <SubTitle>You can upload photo to finish create tour, or you can upload after.</SubTitle>
        <SubTitle>
          Photos help guests imagine about your place. You can start with one and add more after you
          publish.
        </SubTitle>
        <br />

        <Row gutter={32}>
          <Col span={6}>
            {coverPhoto && (
              <ImgEditor
                src={coverPhoto.name}
                caption={coverPhoto.caption}
                updateCaption={updateCaption}
                deletePhoto={deleteCoverPhoto}
                type="Cover"
              />
            )}

            <Upload
              className="cover-photo-upload"
              listType="picture-card"
              fileList={[]}
              action={handleUploadCoverPhoto}
            >
              {coverPhoto ? null : uploadButton('Upload cover photo')}
            </Upload>
          </Col>
          <Col span={18}>
            <Row gutter={16}>
              {_.map(photos, photo => (
                <Col key={photo.name} span={6}>
                  <ImgEditor
                    src={photo.name}
                    name={photo.name}
                    caption={photo.caption}
                    updateCaption={updateCaption}
                    deletePhoto={deletePhoto}
                  />
                </Col>
              ))}
            </Row>
            <Upload listType="picture-card" fileList={[]} action={handleUploadPhoto}>
              {photos.length >= 5 ? null : uploadButton('Upload photo')}
            </Upload>
          </Col>
        </Row>
      </Wrapper>
    </Spin>
  );
};

StepLayout.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    fullname: PropTypes.string,
  }),
  tourCreationInfo: PropTypes.shape({
    id: PropTypes.number,
    coverPhoto: PropTypes.shape({
      name: PropTypes.string,
      caption: PropTypes.string,
    }),
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        caption: PropTypes.string,
      })
    ),
  }),
  onUpdate: PropTypes.func,
};

StepLayout.defaultProps = {
  user: { fullname: '' },
  tourCreationInfo: {},
  onUpdate: () => {},
};

export default StepLayout;
