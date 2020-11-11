import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Row, Col, Button, Spin, Pagination } from 'antd';
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
  };
  return (
    <Wrapper>
      <FilterWrapper>
        <br />
        <Button
          icon={<PlusOutlined />}
          type="primary"
          size="large"
          onClick={() => navigate('/create-tour')}
        >
          Create Tour
        </Button>
        <br />
        <br />
        <br />
        <Spin spinning={loading}>
          <Row gutter={32}>
            {allTours.tours.map(tour => {
              return (
                <Col span={8} key={tour.ID} style={{ marginBottom: 20 }}>
                  <TourCard
                    id={tour.ID}
                    uid={user.uid}
                    title={tour.Name}
                    day={tour.Day}
                    avatarImg={tour.AvatarImg}
                    coverImg={tour.CoverImg}
                    status={tour.Status}
                    handleDeleteTour={handleDeleteTour}
                  />
                </Col>
              );
            })}
          </Row>
        </Spin>
      </FilterWrapper>
      <br />
      <Pagination
        defaultCurrent={1}
        total={allTours.totalPage * 10}
        onChange={page => setCurrentPage(page)}
      />
    </Wrapper>
  );
}

export default Tours;
