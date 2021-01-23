import React, {useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import {Spin, Card, Tooltip } from 'antd';
import { navigate, Link } from 'gatsby';
import { StarFilled} from '@ant-design/icons';
// core components
import GridContainer from "../Grid/GridContainer.js"
import GridItem from "../Grid/GridItem.js";
import * as API from '../../apis'
import styled from 'styled-components';
import styles from "../../assets/styles/teamStyle.js";


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
    .ant-card-meta-title {      
      font-size: 18px;  
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
    font-size: 18px;
    box-shadow: lavender;
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.38);
    border-radius: 5px 5px 5px 5px;
  }
`

const Image = styled.img`
  width: 325px;
  height: 175px;
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

function TourSection() {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  
  useEffect(() => {
    const fetchAllTour = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTours();
        setTours(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };   
    fetchAllTour();  
    const interval = setInterval(() => fetchAllTour(), 100000)
    return () => {
      clearInterval(interval);
    }
  } , []);
console.log(tours);

return (
    <div className={classes.section_odd}>
      <h2 className={classes.title}>Popular Tour </h2>
      <Spin spinning={loading}>
        <GridContainer>
          {tours && tours.map((tour,index) => {
            return (
              <GridItem xs={12} sm={12} md={4} key={index}>
                <CardWrapper hoverable
                    //style={{ width: '100%', cursor: 'pointer', minWidth: 280, minHeight: 323, borderRadius: 10 }}
                    style={{ width: '100%', cursor: 'pointer', maxWidth: 325, minWidth: 325, minHeight: 350, maxHeight: 350, borderRadius: 10 }}
                    cover={<WrapperImageCard><Image src={tour.cover} onClick={() => navigate(`/tour?uid=${tour.uid}&id=${tour.id}`)} /><span className='styled-box-price'>${tour.total}</span></WrapperImageCard>}
                  >
                    <Link to={`/tour?uid=${tour.uid}&id=${tour.id}`}>
                      <Card.Meta style={{ textAlign: "left"}}
                        title={<b>{tour.name}</b>}
                        description={
                          <div style={{ lineHeight: '30px' }}>
                            <Tooltip placement="left" title="Tooltip">
                              <CardDesc>{tour.shortDesc}</CardDesc>
                            </Tooltip>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>
                                {tour.country}/{tour.city}
                              </span>
                              <span>{tour.day} day</span>
                            </div>
                            <div className='totalReview'>
                              <span><StarFilled /> 5/5</span>
                            </div>
                          </div>
                        }
                      />
                    </Link>
                </CardWrapper>
              </GridItem>
            );  
          })} 
        </GridContainer>
      </Spin>
    </div>
  );
}

export default TourSection;