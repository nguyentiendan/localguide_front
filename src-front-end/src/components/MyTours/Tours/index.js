import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';
import { Row, Col, Button, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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
  const [allTours, setAllTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getUserProfile();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data: guideAllTours } = await API.getGuideAllTours({ uid: user.uid });
      setAllTours(guideAllTours);
      setLoading(false);
    }
    fetchData();
  }, [setAllTours]);

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
            {allTours.map(tour => {
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
                  />
                </Col>
              );
            })}
          </Row>
        </Spin>
      </FilterWrapper>
      <br />
    </Wrapper>
  );
}

export default Tours;
