import React, { useMemo, useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { DeleteOutlined, InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Upload, Image, Popconfirm } from 'antd';
import colors from '../../../assets/styles/colors';
import * as API from '../../../apis';
import UploadCover from '../../Input/UploadCover';

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

const ImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h2`
  color: ${colors.grey[70]};
`;

const SubTitle = styled.h4`
  font-weight: normal;
`;

const ActionButton = styled.div`
  position: relative;
  margin-top: 15px;
  margin-left: -20px;
  margin-right: 10px;

  .styled-icon {
    cursor: pointer;
    color: #fff;
    font-size: 16px;
    font-weight: bolder;
  }
`;

const { Dragger } = Upload;

const StepLayout = ({ user, tourCreationInfo, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const removeImage = useRef(null);

  const tourId = useMemo(() => {
    return tourCreationInfo && tourCreationInfo.id;
  }, [tourCreationInfo]);

  const uid = useMemo(() => {
    return user && user.uid;
  }, [user]);

  const { coverPhoto, photos = [] } = tourCreationInfo;

  // re-sync photos
  const updatePhoto = useCallback(async () => {
    const resPhotos = await API.getTourPhotos({ uid, id: tourCreationInfo.id });
    onUpdate({
      photos: resPhotos.data,
    });
    setImage([]);
  });

  // upload photo of Tour
  const handleUploadPhoto = useCallback(async info => {
    if (!tourCreationInfo.id) {
      return;
    }
    setLoading(true);
    try {
      let fileList = [...info.fileList];
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].status === 'done') {
          fileList = fileList.slice(-5);
          removeImage.current.fileList = fileList;
          fileList = fileList.map(file => {
            return file.originFileObj;
          });
          const uploadedRes = await API.uploadMultiPhoto({
            uid,
            tourId: tourCreationInfo.id,
            file: fileList,
          });
          setImage(uploadedRes.data);
        }
      }
    } catch (e) {
      // ignored
    }
    setLoading(false);
  });

  /* const updateCaption = useCallback(
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
  ); */

  const handleDeletePhoto = useCallback(async name => {
    setLoading(true);
    try {
      const nameImage = name.split('/')[5];
      await API.deleteTourPhoto({ nameImage, tourId, uid });
      // remove from photos
      for (let i = 0; i < photos.length; i++) {
        if (nameImage === photos[i].photo.split('/')[5]) {
          const removedPhotos = [...photos];
          _.remove(removedPhotos, p => p.photo === name);
          onUpdate({
            ...tourCreationInfo,
            photos: removedPhotos,
          });
        }
      }
      // remove from image
      for (let i = 0; i < image.length; i++) {
        if (nameImage === image[i].photo.split('/')[5]) {
          const removedPhotos = [...image];
          _.remove(removedPhotos, p => p.photo === name);
          setImage(removedPhotos);
        }
      }
    } catch (e) {
      // ignored
    }
    setLoading(false);
  });

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
          <Col span={8}>
            <h2>Cover image of tour</h2>
            <UploadCover uid={uid} id={tourCreationInfo.id} cover={coverPhoto} />
          </Col>
          <br />
          <Col span={24}>
            <h2>Tour Photos</h2>
            <Row gutter={16}>
              <Image.PreviewGroup>
                {_.map(photos, (p, index) => {
                  return (
                    <ImgWrap key={index}>
                      <Image width={200} src={p.photo} />
                      <ActionButton>
                        <Popconfirm
                          title="Are you sure to delete this photo?"
                          onConfirm={() => handleDeletePhoto(p.photo)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="styled-icon" />
                        </Popconfirm>
                      </ActionButton>
                    </ImgWrap>
                  );
                })}

                {_.map(image, (p, index) => {
                  return (
                    <ImgWrap key={index}>
                      <Image width={200} src={p.photo} />
                      <ActionButton>
                        <Popconfirm
                          title="Are you sure to delete this photo?"
                          onConfirm={() => handleDeletePhoto(p.photo)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <DeleteOutlined className="styled-icon" />
                        </Popconfirm>
                      </ActionButton>
                    </ImgWrap>
                  );
                })}
              </Image.PreviewGroup>
            </Row>
          </Col>
          <br />
          <br />
          <Col span={12}>
            <Dragger
              name="file"
              listType="picture-card"
              multiple
              ref={removeImage}
              onChange={handleUploadPhoto}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or upload <b>5 files</b> at once.
              </p>
            </Dragger>
            <div>
              <br />
              Sometimes you will upload duplicate images, please click{' '}
              <ReloadOutlined style={{ color: '#f12f60' }} onClick={updatePhoto} /> to re-sync
              images.
            </div>
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
