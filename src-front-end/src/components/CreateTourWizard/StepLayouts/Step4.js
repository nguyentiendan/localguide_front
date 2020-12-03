import React, { useCallback, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Modal, Col, Input, Row, Space, Spin, Upload } from 'antd';

import colors from '../../../styles/colors';
import * as API from '../../../apis';
import { uploadCoverPhoto, uploadMultiPhoto } from '../../../apis';
import { getCndResourceUrl } from '../../../utils/commons';

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
    .ant-upload-select-picture-card {
      width: 350px;
      height: 250px;
    }
  }
  .cover-photo-upload .ant-upload-select {
    width: 200px;
    height: 200px;
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
  type,
  setZoomImage,
  zoomImage,
  index,
  myRef,
}) => {
  const handleUpdateCaption = useCallback(
    e => {
      updateCaption(e.target.value, name);
    },
    [name, caption, updateCaption]
  );
  const handleDeletePhoto = () => {
    if (type !== 'Cover') {
      // eslint-disable-next-line react/prop-types
      myRef.current.fileList.splice(index, 1);
    }
    deletePhoto(name);
  };
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
        <Input placeholder="Caption" onBlur={handleUpdateCaption} defaultValue={caption} />
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
  zoomImage: PropTypes.shape({}),
  setZoomImage: PropTypes.func,
  index: PropTypes.number,
  myRef: PropTypes.shape({}),
};

ImgEditor.defaultProps = {
  src: '',
  caption: '',
  name: '',
  updateCaption: () => {},
  deletePhoto: () => {},
  type: '',
  setZoomImage: () => {},
  zoomImage: {},
  myRef: {},
  index: 0,
};

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [zoomImage, setZoomImage] = useState({
    previewVisible: false,
    url: '',
  });
  const [image, setImage] = useState([]);
  const removeImage = useRef(null);

  const tourId = useMemo(() => {
    return tourCreationInfo && tourCreationInfo.id;
  }, [tourCreationInfo]);

  const uid = useMemo(() => {
    return user && user.uid;
  }, [user]);

  const { coverPhoto, photos = [] } = tourCreationInfo;

  const handleCoverPhotoChange = uploadedCoverPhoto => {
    onUpdate({
      ...tourCreationInfo,
      coverPhoto: { ...uploadedCoverPhoto },
    });
  };

  // const handlePhotosChange = uploadedPhotos => {
  //   onUpdate({
  //     ...tourCreationInfo,
  //     photos: uploadedPhotos,
  //   });
  // };

  const handleUploadCoverPhoto = async file => {
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
  };

  const handleUploadPhoto = async info => {
    if (!tourCreationInfo.id) {
      return;
    }

    try {
      setLoading(true);
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);
      removeImage.current.fileList = fileList;
      fileList = fileList.map(file => {
        return file.originFileObj;
      });
      const uploadedRes = await uploadMultiPhoto({
        tourId: tourCreationInfo.id,
        file: fileList,
      });
      setImage(uploadedRes.data);
      setLoading(false);
    } catch (e) {
      // ignored
    }
  };

  const updateCaption = useCallback(
    async (caption, name) => {
      setLoading(true);
      try {
        const nameImage = name.split('/')[3];
        await API.updateCaption({ caption, name: nameImage, tourId, uid });
      } catch (e) {
        // ignored
      }
      setLoading(false);
    },
    [tourId, uid]
  );
  const updateCaptionAntd = useCallback(
    async (caption, name) => {
      setLoading(true);
      try {
        const nameImage = name.split('/')[7];
        await API.updateCaption({ caption, name: nameImage, tourId, uid });
      } catch (e) {
        // ignored
      }
      setLoading(false);
    },
    [tourId, uid]
  );
  const deletePhoto = async name => {
    setLoading(true);
    try {
      const nameImage = name.split('/')[3];
      await API.deletePhoto({ name: nameImage, tourId, uid });
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
  };
  const deletePhotoAntd = async name => {
    setLoading(true);
    try {
      const nameImage = name.split('/')[7];
      await API.deletePhoto({ name: nameImage, tourId, uid });
      const removedPhotos = [...image];
      _.remove(removedPhotos, photo => photo.name === name);
      setImage(removedPhotos);
    } catch (e) {
      // ignored
    }
    setLoading(false);
  };

  const deleteCoverPhoto = async name => {
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
  };

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
                name={coverPhoto.name}
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
              {coverPhoto?.name ? null : uploadButton('Upload cover photo')}
            </Upload>
          </Col>
          <Col span={18}>
            <Row gutter={16}>
              {_.map(photos, (photo, index) => (
                <Col key={photo.name} span={6}>
                  <ImgEditor
                    src={
                      photo.name.split('/')[0] === 'static'
                        ? getCndResourceUrl(photo.name)
                        : photo.name
                    }
                    name={photo.name}
                    caption={photo.caption}
                    updateCaption={updateCaption}
                    deletePhoto={deletePhoto}
                    zoomImage={zoomImage}
                    setZoomImage={setZoomImage}
                    myRef={removeImage}
                    index={index}
                  />
                </Col>
              ))}
              {_.map(image, (photo, index) => {
                return (
                  <Col key={photo.name} span={6}>
                    <ImgEditor
                      src={
                        photo.name.split('/')[0] === 'static'
                          ? getCndResourceUrl(photo.name)
                          : photo.name
                      }
                      name={photo.name}
                      caption={photo.caption}
                      updateCaption={updateCaptionAntd}
                      deletePhoto={deletePhotoAntd}
                      zoomImage={zoomImage}
                      setZoomImage={setZoomImage}
                      myRef={removeImage}
                      index={index}
                    />
                  </Col>
                );
              })}
            </Row>
            <Upload listType="picture-card" onChange={handleUploadPhoto} multiple ref={removeImage}>
              {uploadButton('Upload photo')}
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
