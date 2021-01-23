import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import {Card, Badge, Tooltip } from 'antd';
import { navigate, Link } from 'gatsby';
import { StarFilled} from '@ant-design/icons';
// core components
import GridContainer from "../Grid/GridContainer.js"
import GridItem from "../Grid/GridItem.js";

import styled from 'styled-components';

import styles from "../../assets/jss/material-kit-react/views/landingPageSections/teamStyle.js";
import backpackers from '../../../static/mocks/blogs/backpackers.png'

const useStyles = makeStyles(styles);

const CardWrapper = styled(Card)`
  .totalReview{
    display: flex;
    justify-content: space-between;    
  };
  && {
    .ant-card-actions {
      border-radius: 0px 0px 10px 10px;     
    }
  }
`;
const WrapperImageCard = styled.div`
  position: relative;
  .styled-box-price {
    position: absolute;
    left: 5px;
    background: #f12f60;
    padding: 10px 15px;
    bottom: 0px;
    color: #fff;
    font-weight:bold;
    font-size: 16px;
    box-shadow: lavender;
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.38);
    border-radius: 5px 5px 5px 5px;
  }
`

const Image = styled.img`
  height: 158px;
  width: auto;
  object-fit: cover;
  border-radius: 10px 10px 0px 0px;
  // margin-bottom: 0px;
`

const CardDesc = styled.div`
overflow: hidden;
text-align:left;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 1;
-webkit-box-orient: vertical;
`

export default function TourSection() {
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section_odd}>
      <h2 className={classes.title}>Popular Tour </h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Badge style={{ width: '100%' }}>
              <CardWrapper hoverable
                style={{ width: '100%', cursor: 'pointer', minWidth: 280, minHeight: 323, borderRadius: 10 }}
                cover={<WrapperImageCard><Image src={backpackers} onClick={() => navigate(`/edit-tour?q=${1}`)} /><span className='styled-box-price'>${1000}</span></WrapperImageCard>}
              >
                <Link to={`/edit-tour?q=${1}`}>
                  <Card.Meta style={{ textAlign: "left"}}
                    title={<b>Greate Tour in Tokyo City</b>}
                    description={
                      <div style={{ lineHeight: '30px' }}>
                        <Tooltip placement="left" title="Tooltip">
                          <CardDesc>Short description here</CardDesc>
                        </Tooltip>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>
                            Japan/Tokyo
                          </span>
                          <span>1 day</span>
                        </div>
                        <div className='totalReview'>
                          <span><StarFilled /> 5/5</span>
                        </div>
                      </div>
                    }
                  />
                </Link>
              </CardWrapper>

            </Badge> 
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <Badge style={{ width: '100%' }}>
              <CardWrapper hoverable
                style={{ width: '100%', cursor: 'pointer', minWidth: 280, minHeight: 323, borderRadius: 10 }}
                cover={<WrapperImageCard><Image src={backpackers} onClick={() => navigate(`/edit-tour?q=${1}`)} /><span className='styled-box-price'>${1000}</span></WrapperImageCard>}
              >
                <Link to={`/edit-tour?q=${1}`}>
                  <Card.Meta style={{ textAlign: "left"}}
                    title={<b>Greate Tour in Tokyo City</b>}
                    description={
                      <div style={{ lineHeight: '30px' }}>
                        <Tooltip placement="left" title="Tooltip">
                          <CardDesc>Short description here</CardDesc>
                        </Tooltip>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>
                            Japan/Tokyo
                          </span>
                          <span>1 day</span>
                        </div>
                        <div className='totalReview'>
                          <span><StarFilled /> 5/5</span>
                        </div>
                      </div>
                    }
                  />
                </Link>
              </CardWrapper>

            </Badge> 
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
          <Badge style={{ width: '100%' }}>
              <CardWrapper hoverable
                style={{ width: '100%', cursor: 'pointer', minWidth: 280, minHeight: 323, borderRadius: 10 }}
                cover={<WrapperImageCard><Image src={backpackers} onClick={() => navigate(`/edit-tour?q=${1}`)} /><span className='styled-box-price'>${1000}</span></WrapperImageCard>}
              >
                <Link to={`/edit-tour?q=${1}`}>
                  <Card.Meta style={{ textAlign: "left"}}
                    title={<b>Greate Tour in Tokyo City</b>}
                    description={
                      <div style={{ lineHeight: '30px' }}>
                        <Tooltip placement="left" title="Tooltip">
                          <CardDesc>Short description here</CardDesc>
                        </Tooltip>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>
                            Japan/Tokyo
                          </span>
                          <span>1 day</span>
                        </div>
                        <div className='totalReview'>
                          <span><StarFilled /> 5/5</span>
                        </div>
                      </div>
                    }
                  />
                </Link>
              </CardWrapper>

            </Badge> 
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
