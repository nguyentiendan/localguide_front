import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Form, Col, Row, Popconfirm, Spin, Image, Upload } from 'antd';
import { DeleteOutlined, InboxOutlined, ReloadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';

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

const FormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  && {
    .ant-form-item {
      width: 100%;
    }
  }
`;

const ImgWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const formItemLayout = {
  labelCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
    },
    sm: {
      // pc
      span: 12, // input box size
    },
  },
};

const formItemUpload = {
  wrapperCol: {
    xs: {
      // mobile
      span: 24,
      offset: 3,
    },
    sm: {
      // pc
      span: 24,
      offset: 1,
    },
  },
};

const { Dragger } = Upload;

function GuidePhoto({ uid }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(getUserProfile());
  const [image, setImage] = useState([]);
  const removeImage = useRef(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      const res = await API.getPhotosGuide({ uid });
      setPhotos(res.data);
      setLoading(false);
    };
    fetchPhotos();
  }, [setPhotos, API.getPhotosGuide, setLoading]);

  // re-sync photos
  const updatePhoto = useCallback(async () => {
    const resPhotos = await API.getPhotosGuide({ uid });
    setPhotos(resPhotos.data);
    setImage([]);
  });
  // upload photo for Guide Profile
  const handleUploadPhoto = useCallback(async file => {
    setLoading(true);
    try {
      let fileList = [...file.fileList];
      for (let i = 0; i < fileList.length; i++) {
        if (fileList[i].status === 'done') {
          fileList = fileList.slice(-5);
          removeImage.current.fileList = fileList;
          fileList = fileList.map(file => {
            return file.originFileObj;
          });
          const uploadedRes = await API.uploadMultiPhotoGuide({
            uid,
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

  // delete photo
  const handleDeletePhoto = useCallback(async name => {
    setLoading(true);
    try {
      const nameImage = name.split('/')[5];
      await API.deletePhotoGuide({ name: nameImage, uid });
      // remove from photos
      for (let i = 0; i < photos.length; i++) {
        if (nameImage === photos[i].photo.split('/')[5]) {
          const removedPhotos = [...photos];
          _.remove(removedPhotos, p => p.photo === name);
          setPhotos(removedPhotos);
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
        <FormWrapper form={form} {...formItemLayout} name="photo" scrollToFirstError>
          <div style={{ paddingTop: 50, paddingBottom: 20 }}>
            <h2>Upload Photos</h2>
          </div>
          <span>
            <p>You can upload photos that you took while on tour......</p>
            <p>You can upload photos that you took while on tour......</p>
            <p>Please only upload pictures related to the tour........</p>
          </span>
          <Form.Item key="upload" {...formItemUpload}>
            <Col span={24}>
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
          </Form.Item>

          <Dragger
            style={{ width: 350 }}
            listType="picture-card"
            multiple
            ref={removeImage}
            onChange={handleUploadPhoto}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Dragger>
          <div>
            <br />
            Sometimes you will upload duplicate images, please click{' '}
            <ReloadOutlined style={{ color: '#f12f60' }} onClick={updatePhoto} /> to re-sync images.
          </div>
          <br />
        </FormWrapper>
      </Wrapper>
    </Spin>
  );
}

GuidePhoto.propTypes = {};

export default GuidePhoto;
