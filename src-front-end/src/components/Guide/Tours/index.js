import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Row, Col, Button, Spin, Pagination, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';

import * as API from '../../../apis';
import { getUserProfile } from '../../../utils/auth';
import TourCard from '../TourCard';

const Wrapper = styled.div``;
const FilterWrapper = styled.div`
  label {
    width: 75px;
  }
`;

function Tours() {
  const [allTours, setAllTours] = useState({
    tours: [],
    totalPage: 1,
  });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const user = getUserProfile();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: guideAllTours, totalpage: totalPage } = await API.getGuideAllTours({
        uid: user.uid,
        page: currentPage,
      });
      setAllTours({
        ...allTours,
        tours: guideAllTours,
        totalPage,
      });
      setLoading(false);
    }
    fetchData();
  }, [API.getGuideAllTours, setAllTours, currentPage, setLoading]);

  const handleDeleteTour = async data => {
    setLoading(true);
    await API.deleteTour({ id: data.id, uid: data.uid });
    _.remove(allTours?.tours, tour => {
      return tour.ID === data.id;
    });
    setLoading(false);
    notification.success({ message: `You have successfully deleted ${data.title} tour.` });
  };

  return (
    <Wrapper>
      {allTours.tours.length == 0 && <div>You don’t have any tours.</div>}
      <FilterWrapper>
        <br />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="large"
          // onClick={() => navigate('/app/create_tour')}
          onClick={() => navigate('/app/createTour')}
        >
          Create New Tour
        </Button>
        <br />
        <br />
        <br />
        <Spin spinning={loading}>
          <Row gutter={32}>
            {allTours.tours.map(tour => {
              return (
                <Col span={8} key={tour.id} style={{ marginBottom: 20 }}>
                  <TourCard
                    id={tour.id}
                    uid={user.uid}
                    title={tour.name}
                    day={tour.day}
                    // avatarImg={tour.AvatarImg}
                    coverImg={tour.cover}
                    status={tour.status}
                    shortDesc={tour.shortDesc}
                    city={tour.city}
                    price={tour.total}
                    country={tour.country}
                    totalReview={tour.num}
                    handleDeleteTour={handleDeleteTour}
                  />
                </Col>
              );
            })}
          </Row>
        </Spin>
      </FilterWrapper>
      <br />
      {allTours.tours.length > 0 && (
        <Pagination
          defaultCurrent={1}
          total={allTours.totalPage * 10}
          onChange={page => setCurrentPage(page)}
        />
      )}
    </Wrapper>
  );
}

export default Tours;
