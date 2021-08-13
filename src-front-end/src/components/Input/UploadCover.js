import React, { useCallback, useState } from 'react';
import { CloudUploadOutlined, } from '@ant-design/icons';
import { Spin, message, Image } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as API from '../../apis';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  
  @media (min-width: 575px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const FileInput = styled.input`  
  width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;  
  position: absolute;
  z-index: -1;
`;
const LabelWrap = styled.label`  
  font-size: 1em;
  text-align : center;
  padding : 10px;
  color: black;
  display: inline-block;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  transition: border-color 0.3s;
  //border-color : #f12f60;
  &:hover {
    color: #f12f60;    
    }
    &:after {      
    }
  }
`;

const UploadCover = ({ uid, id, cover }) => {
  const [avatarBlob, setAvatarBlob] = useState();
  const [loading, setLoading] = useState(false);
  
  const handleUploadCover = useCallback (
    async file => {                    
      try {
        setLoading(true);  
        if (cover != '') {
          const nameImage = cover.split('/')[6]                  
          await API.deleteCover({ nameImage, tourId:id, uid });
        }                
        const { status } = await API.uploadCoverPhoto({ uid, tourId:id, file });    
        setLoading(false);    
        if (status === true) {   
          message.success({ 
            content: "Upload success!",
            key, duration: 2,
            className: 'custom-class',
            style: {
              marginTop: '20vh',
            },
          });                  
        }        
      } catch (e) {
      }      
  });
    
  return (
    <Wrapper>
      <Spin spinning={loading}>
        <Image.PreviewGroup key="passport">
          <Image width={200} src={avatarBlob || cover}/>          
        </Image.PreviewGroup>        
        <br/>
        <LabelWrap>           
          <CloudUploadOutlined style={{color:'#f12f60', fontSize:25}}/> <br/>
          Upload one photo to make cover image
          <FileInput
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            className="custom-file-input"          
            onChange={e => {
              handleUploadCover(e.target.files[0]);
              setAvatarBlob(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </LabelWrap>
      </Spin>      
    </Wrapper>
  );
};

export default UploadCover;

UploadCover.propTypes = {
  uid: PropTypes.string.isRequired,
  cover: PropTypes.string,
};

UploadCover.defaultProps = {
  cover: '',
};
