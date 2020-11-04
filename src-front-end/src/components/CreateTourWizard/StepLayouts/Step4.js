import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Col, Input, Row, Space, Spin, Upload } from 'antd';

import colors from '../../../styles/colors';
import * as API from '../../../apis';
import { uploadCoverPhoto, uploadMultiPhoto } from '../../../apis';

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
  && {
    .ant-upload-list-picture-card-container {
      display: none;
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

const ActionImageWraper = styled.div`
  position: relative;
  & > div {
    position: absolute;
    border-radius: 4px;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: none;
    text-align: center;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
  }
  &&:hover div {
    display: flex;
  }
  .styled-icon-zoom-image {
    margin-right: 10px;
  }
  .styled-icon {
    cursor: pointer;
    color: #ffffff;
    font-size: 16px;
  }
`;

const ImgEditor = ({
  src,
  caption,
  name,
  updateCaption,
  deletePhoto,
  // type,
  setZoomImage,
  zoomImage,
}) => {
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
  // let photoType = '';
  // if (type) {
  //   photoType = `${type} `;
  // }
  return (
    <ImgEditorWrapper>
      <ActionImageWraper>
        <Img alt="preview" style={{ width: '100%' }} src={src} />
        <div>
          <EyeOutlined
            className="styled-icon-zoom-image styled-icon"
            onClick={() =>
              setZoomImage({
                ...zoomImage,
                previewVisible: true,
                url: src,
              })
            }
          />
          <DeleteOutlined className="styled-icon" onClick={handleDeletePhoto} />
        </div>
      </ActionImageWraper>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input placeholder="Caption" onBlur={handleUpdateCaption} />
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
  // type: PropTypes.string,
  zoomImage: PropTypes.shape({}),
  setZoomImage: PropTypes.func,
};

ImgEditor.defaultProps = {
  src: '',
  caption: '',
  name: '',
  updateCaption: () => {},
  deletePhoto: null,
  // type: undefined,
  setZoomImage: () => {},
  zoomImage: {},
};

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [zoomImage, setZoomImage] = useState({
    previewVisible: false,
    url: '',
  });

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
    async info => {
      if (!tourCreationInfo.id) {
        return;
      }

      try {
        const image = [];
        info.fileList.forEach(file => {
          image.push(file.originFileObj);
        });
        setLoading(true);

        const uploadedRes = await uploadMultiPhoto({ tourId: tourCreationInfo.id, file: image });
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

        <Row gutter={32} style={{ flexDirection: 'column' }}>
          <Col span={5}>
            {coverPhoto && (
              <ImgEditor
                src={coverPhoto.name}
                caption={coverPhoto.caption}
                updateCaption={updateCaption}
                deletePhoto={deleteCoverPhoto}
                type="Cover"
                zoomImage={zoomImage}
                setZoomImage={setZoomImage}
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
                    zoomImage={zoomImage}
                    setZoomImage={setZoomImage}
                  />
                </Col>
              ))}
            </Row>
            <Upload listType="picture-card" onChange={handleUploadPhoto} multiple>
              {photos.length >= 5 ? null : uploadButton('Upload photo')}
            </Upload>
          </Col>
          <Modal
            visible={zoomImage.previewVisible}
            footer={null}
            onCancel={() => setZoomImage({ ...zoomImage, previewVisible: false })}
          >
            <img alt="example" style={{ width: '100%' }} src={zoomImage.url} />
          </Modal>
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
