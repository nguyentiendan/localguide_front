import React, { useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { Form, Col, Row, Button,Popconfirm, Spin, Image, Upload, message,} from 'antd';
import { EyeOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
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
    font-weight:bolder;
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
    xs: {  //mobile
      span: 24,
    },
    sm: {  //pc
      span: 6, // label size
    },
  },
  wrapperCol: {
    xs: {  //mobile
      span: 24,
    },
    sm: {  //pc
      span: 12, // input box size
    },
  },
};

const formItemUpload = {
  wrapperCol: {
    xs: { //mobile
      span: 24,
      offset: 3,
    },
    sm: { //pc
      span: 24,
      offset: 1,
    },
  },
};

const { Dragger } = Upload;

function GuidePhoto({uid}) { 
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(getUserProfile());
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

  //upload photo for Guide Profile
  const handleUploadPhoto = async info => {
    setLoading(true);    
    try {
      let fileList = [...info.fileList];
      if(fileList[0].status === 'done') {
        fileList = fileList.slice(-5);
        removeImage.current.fileList = fileList;
        fileList = fileList.map(file => {
          return file.originFileObj;
        });
        const uploadedRes = await API.uploadMultiPhotoGuide({
          uid,        
          file: fileList,
        });
        for (let i = 0; i < uploadedRes.data.length; i++) {
          photos.push(uploadedRes.data[i])
        }
      }  
    } catch (e) {
      // ignored
    }
    setLoading(false);
  };

  const handleDeletePhoto = async name => {
    setLoading(true);
    try {
      const nameImage = name.split('/')[5];        
      await API.deletePhotoGuide({ name:nameImage, uid });
      const removedPhotos = [...photos];      
      _.remove(removedPhotos, p => p.photo === name);
      setPhotos(removedPhotos)      
    } catch (e) {
      // ignored
    }
    setLoading(false);
  };
  
  return (
    <Spin spinning={loading}>
      <Wrapper>
        <FormWrapper form={form}  {...formItemLayout} name="photo" scrollToFirstError>
        <div style={{paddingTop:50, paddingBottom:20}}>
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
                        <Image width={200} src={p.photo}/>
                        <ActionButton>
                          <Popconfirm
                            title="Are you sure to delete this photo?"
                            onConfirm={() => handleDeletePhoto(p.photo)}
                            okText="Yes"
                            cancelText="No"
                          >
                            <DeleteOutlined className="styled-icon"/>
                          </Popconfirm>
                        </ActionButton>
                      </ImgWrap>
                    );
                  })}
                </Image.PreviewGroup> 
              </Row>
            </Col>
          </Form.Item>

          <Dragger style={{width:350}} listType="picture-card" multiple ref={removeImage} onChange={handleUploadPhoto}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Dragger>
          <br/>
        </FormWrapper>
      </Wrapper>
    </Spin>
    
  );
}

GuidePhoto.propTypes = {};

export default GuidePhoto;
