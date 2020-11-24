import React, { useCallback, useState, useRef } from 'react';
import { Modal, Col, Row, Upload, Space, Input, notification } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { EyeOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { getCndResourceUrl } from '../../../utils/commons';
import * as API from '../../../apis';

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

const UploadPhotos = ({ photos, uid, setPhotos, setIsloading }) => {
  const [zoomImage, setZoomImage] = useState({
    previewVisible: false,
    url: '',
  });
  const removeImage = useRef(null);

  const updateCaption = useCallback(
    async (caption, name) => {
      const nameImage = name.split('/')[3];
      setIsloading(true);
      try {
        await API.updateCaptionGuide({ caption, name: nameImage, uid });
      } catch (e) {
        // ignored
      }
      setIsloading(false);
    },
    [uid]
  );

  const deletePhoto = async name => {
    setIsloading(true);
    try {
      const nameImage = name.split('/')[3];
      await API.deletePhotoGuide({ name: nameImage, uid });
      const removedPhotos = [...photos];
      _.remove(removedPhotos, photo => photo.name === name);
      setPhotos(removedPhotos);
    } catch (e) {
      // ignored
    }
    setIsloading(false);
    notification.success({ message: 'You have successfully deleted photo.' });
  };

  const handleUploadPhoto = async info => {
    try {
      setIsloading(true);
      let fileList = [...info.fileList];
      fileList = fileList.slice(-5);
      removeImage.current.state.fileList = fileList;
      fileList = fileList.map(file => {
        return file.originFileObj;
      });
      const res = await API.uploadMultiPhotoGuide({
        uid,
        file: fileList,
      });
      const newData = _.concat(photos, res.data);
      setPhotos(newData);
      setIsloading(false);
    } catch (e) {
      // ignored
    }
    notification.success({ message: 'You have successfully updated photos.' });
  };
  const uploadButton = text => (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">{text}</div>
    </div>
  );

  return (
    <Wrapper>
      <Col span={24}>
        <Row gutter={16}>
          {_.map(photos, (photo, index) => {
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
                  updateCaption={updateCaption}
                  deletePhoto={deletePhoto}
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
          {photos.length >= 100 ? null : uploadButton('Upload photo')}
        </Upload>
      </Col>
      <Modal
        visible={zoomImage.previewVisible}
        footer={null}
        onCancel={() => setZoomImage({ ...zoomImage, previewVisible: false })}
      >
        <img alt="example" style={{ width: '100%' }} src={zoomImage.url} />
      </Modal>
    </Wrapper>
  );
};

export default UploadPhotos;

UploadPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object),
  uid: PropTypes.string.isRequired,
  setPhotos: PropTypes.func,
  setIsloading: PropTypes.func,
};

UploadPhotos.defaultProps = {
  photos: [],
  setPhotos: () => {},
  setIsloading: () => {},
};
