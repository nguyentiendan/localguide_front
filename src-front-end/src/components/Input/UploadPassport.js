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
  padding : 8px;
  color: black;
  display: inline-block;
  cursor: pointer;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  transition: border-color 0.3s;
  &:hover {
    color: #f12f60;    
    }
    &:after {      
    }
  }
`;

const UploadPassport = ({ uid, passport }) => {
  const [avatarBlob, setAvatarBlob] = useState();
  const [loading, setLoading] = useState(false);
  
  const handleUploadIdCard = useCallback (
    async file => {                    
      try {
        setLoading(true);  
        if (passport != '') {
          const nameImage = passport.split('/')[5]        
          await API.deleteIdPhoto({ name: nameImage, uid }); 
        }        
        const { status }  = await API.uploadIdCard({ uid, file });
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
          <Image width={200} src={avatarBlob || passport}/>          
        </Image.PreviewGroup>        
        <br/>
        <LabelWrap>           
          <CloudUploadOutlined style={{color:'#f12f60', fontSize:20}}/><br/> 
          Upload new passport          
          <FileInput
            id="avatar"
            type="file"
            name="avatar"
            accept="image/*"
            className="custom-file-input"          
            onChange={e => {
              handleUploadIdCard(e.target.files[0]);
              setAvatarBlob(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </LabelWrap>
      </Spin>      
    </Wrapper>
  );
};

export default UploadPassport;

UploadPassport.propTypes = {
  uid: PropTypes.string.isRequired,
  passport: PropTypes.string,
};

UploadPassport.defaultProps = {
  passport: '',
};
