import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import queryString from 'query-string';
import { Form, Col, Divider, Row, Spin, Button } from 'antd';
import classNames from 'classnames';
import { Box, Modal, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';

import * as API from '../apis';
import Layout from '../components/CustomLayout';
import SEO from '../components/SEO';
import Parallax from '../components/Parallax/Parallax';
import Footer from '../components/Footer/Footer';
import styles from '../assets/styles/searchPage';
import GuideSearchPanel from '../components/SearchPanel/GuideSearchPanel';
import TourSearchPanel from '../components/SearchPanel/TourSearchPanel';
import TeamResultSection from '../components/SearchResultSections/TeamResultSection';
import TourResultSection from '../components/SearchResultSections/TourResultSection';
import Card from '../components/Card/Card';
import { DEFAULTPRICEVALUE } from '../constants/keys';

const TitleWrapper = styled.div`
  margin-top: 30px;
  margin-left: 15px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 0;
  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

const SearchColWrapper = styled(Col)`
  @media (max-width: 991px) {
    display: none;
  }
`;

const FilterButton = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  color: #f12f60;
  margin-right: 10px;
  border: solid 1px #f12f60;
  border-radius: 6px;
  padding: 3px 5px;
  &:hover {
    cursor: pointer;
    background-color: #f12f60;
    color: white;
  }
  @media (min-width: 992px) {
    display: none;
  }
`;

const FilterWrapper = styled(Box)`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 991px;
  height: 100vh;
  z-index: 2000;
  padding: 30px;
  overflow-y: auto;
`;

const CloseIconWrapper = styled(CloseIcon)`
  color: black;
  margin-right: 10px;
  &:hover {
    cursor: pointer;
  }
  size: 2xl;
`;

const ResultButton = styled(Box)`
  display: inline-block;
  width: 80%;
  background-color: #f12f60;
  border-radius: 6px;
  color: white;
  padding: 3px 0;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

const useStyles = makeStyles(styles);

function IndexPage({ location }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [tourGuideLength, setTourGuideLength] = useState(0);
  const [tourLength, setTourLength] = useState(0);
  const [tourGuideNodes, setTourGuideNodes] = useState([]);
  const [tourNodes, setTourNodes] = useState([]);
  const [rootTourGuideNodes, setRootTourGuideNodes] = useState([]);
  const [rootTourNodes, setRootTourNodes] = useState([]);
  const [rootCity, setRootCity] = useState([]);
  const [rootCountry, setRootCountry] = useState([]);
  const [selectInterest, setSelectInterest] = useState([]);
  const [selectExtras, setSelectExtras] = useState([]);
  const [selectLanguage, setSelectLanguage] = useState([]);
  const [selectTag, setSelectTag] = useState([]);
  const [selectCountry, setSelectCountry] = useState(null);
  const [selectCity, setSelectCity] = useState(null);
  const [selectLength, setSelectLength] = useState(null);
  const [selectPriceValue, setSelectPriceValue] = useState(DEFAULTPRICEVALUE);
  const classes = useStyles();
  const { q } = queryString.parse(location.search);

  const filterGuideData = (item, keyword) => {
    const interestKeyword =
      (item === 'interest' && _.map(keyword, key => key.value.toString().toLowerCase())) ||
      (selectInterest &&
        _.map(selectInterest, interest => interest.value.toString().toLowerCase()));
    const extraKeyword =
      (item === 'extra' && _.map(keyword, key => key.value.toString().toLowerCase())) ||
      (selectExtras && _.map(selectExtras, extra => extra.value.toString().toLowerCase()));
    const languageKeyword =
      (item === 'language' && _.map(keyword, key => key.value.toString().toLowerCase())) ||
      (selectLanguage &&
        _.map(selectLanguage, language => language.value.toString().toLowerCase()));

    const interestResult =
      interestKeyword &&
      _.filter(rootTourGuideNodes, guide => {
        let result = true;
        interestKeyword.forEach(value => {
          if(
            guide.interest
              .toString()
              .toLowerCase()
              .indexOf(value) === -1
          ) {
            result = false;
          }
        });
        return result;
      });
    const extraResult =
      extraKeyword &&
      _.filter(rootTourGuideNodes, guide => {
        let result = true;
        extraKeyword.forEach(value => {
          if(
            guide.extras
              .toString()
              .toLowerCase()
              .indexOf(value) === -1
          ) {
            result = false;
          }
        });
        return result;
      });
    const languageResult =
      languageKeyword &&
      _.filter(rootTourGuideNodes, guide => {
        let result = true;
        languageKeyword.forEach(value => {
          if(
            guide.language
              .toString()
              .toLowerCase()
              .indexOf(value) === -1
          ) {
            result = false;
          }
        });
        return result;
      });
    
    const newGuide = _.intersection(interestResult, extraResult, languageResult);
    setTourGuideNodes([...newGuide]);
    setTourGuideLength(newGuide.length);
  }

  const filterTourData = (item, keyword) => {
    const tagKeyword =
      (item === 'tag' && _.map(keyword, key => key.value.toString().toLowerCase())) ||
      (selectTag && _.map(selectTag, tag => tag.value.toString().toLowerCase()));
    const countryKeyword = 
      (item === 'country' && keyword.label) || (selectCountry && selectCountry.label);
    const cityKeyword = () => {
      if (item === 'country') {
        return null;
      }
      return (item === 'city' && keyword) || selectCity;
    }
    const lengthKeyword = (item === 'length' && keyword) || selectLength;
    const priceValue = (item === 'price' && keyword) || selectPriceValue;

    const tagResult =
      tagKeyword &&
      _.filter(rootTourNodes, tour => {
        let result = true;
        tagKeyword.forEach(value => {
          if(
            tour.tag
              .toString()
              .toLowerCase()
              .indexOf(value) === -1
          ) {
            result = false;
          }
        });
        return result;
      });
    const countryResult =
      (countryKeyword && _.filter(rootTourNodes, tour => tour.country === countryKeyword)) ||
      rootTourNodes;
    const cityResult =
      (cityKeyword() && _.filter(rootTourNodes, tour => tour.city === cityKeyword())) ||
      rootTourNodes;
    const lengthResult =
      (lengthKeyword && _.filter(rootTourNodes, tour => tour.day === lengthKeyword)) ||
      rootTourNodes;
    const priceResult = _.filter(
      rootTourNodes,
      tour => tour.total >= priceValue[0] && tour.total <= priceValue[1]
    );

    const newTour = _.intersection(tagResult, countryResult, cityResult, lengthResult, priceResult);
    setTourNodes([...newTour]);
    setTourLength(newTour.length);
  }

  const fetchCountry = useCallback(async () => {
    const resCountry = await API.getAllCountry();
    setRootCountry(resCountry.data);
  }, [API.getAllCountry, setRootCountry]);

  const onChangeInterest = searchValue => {
    if (searchValue) {
      setSelectInterest(searchValue);
    } else {
      setSelectInterest([]);
    }
    filterGuideData('interest', searchValue);
  }
  
  const onChangeExtras = searchValue => {
    if (searchValue) {
      setSelectExtras(searchValue);
    } else {
      setSelectExtras([]);
    }
    filterGuideData('extra', searchValue);
  }
  
  const onChangeLanguage = searchValue => {
    if (searchValue) {
      setSelectLanguage(searchValue);
    } else {
      setSelectLanguage([]);
    }
    filterGuideData('language', searchValue);
  }
  
  const onChangeTag = searchValue => {
    if (searchValue) {
      setSelectTag(searchValue);
    } else {
      setSelectTag([]);
    }
    filterTourData('tag', searchValue);
  }

  const fetchCity = async value => {
    if (value) {
      const resCity = await API.getCityOfCountry(value.value);
      setRootCity(resCity.data);
      setSelectCity(null);
    }
  };

  const onChangeCountry = value => {
    if (value) {
      setSelectCountry({ value: value.value, label: value.label });
    } else {
      setSelectCountry({});
    }
    fetchCity(value);
    filterTourData('country', value);
  };

  const onChangeCity = searchValue => {
    setSelectCity(searchValue);
    filterTourData('city', searchValue);
  }

  const onChangeLength = searchValue => {
    setSelectLength(searchValue);
    filterTourData('length', searchValue);
  }

  const onChangePrice = searchValue => {
    setSelectPriceValue([searchValue[0], searchValue[1]]);
    filterTourData('price', searchValue);
  }

  const onChangeMin = value => {
    if (value <= selectPriceValue[1]) {
      setSelectPriceValue([value, selectPriceValue[1]]);
      filterTourData('price', [value, selectPriceValue[1]]);
    } else {
      filterTourData('price', selectPriceValue);
    }
  }

  const onChangeMax = value => {
    if (value >= selectPriceValue[0]) {
      setSelectPriceValue([selectPriceValue[0], value]);
      filterTourData('price', [selectPriceValue[0], value]);
    } else {
      filterTourData('price', selectPriceValue);
    }
  }

  const onChangeReset = () => {
    setSelectPriceValue(DEFAULTPRICEVALUE);
    setSelectTag([]);
    setSelectCountry(null);
    setSelectCity(null);
    setSelectLength(null);
    setTourNodes([...rootTourNodes]);
    setTourLength(rootTourNodes.length);
  }

  const onChangeAllReset = () => {
    setSelectInterest([]);
    setSelectExtras([]);
    setSelectLanguage([]);
    setSelectTag([]);
    setSelectCountry(null);
    setSelectCity(null);
    setSelectLength(null);
    setSelectPriceValue(DEFAULTPRICEVALUE);
    setTourGuideNodes([...rootTourGuideNodes]);
    setTourGuideLength(rootTourGuideNodes.length);
    setTourNodes([...rootTourNodes]);
    setTourLength(rootTourNodes.length);
  }

  useEffect(() => {
    fetchCountry();
    const fetchSearchData = async () => {
      try {
        setLoading(true);
        const response = await API.Search(q);
        if (response.guideResult != 0) {
          setTourGuideLength(response.guideResult);
          setTourGuideNodes(response.guide);
          setRootTourGuideNodes(response.guide);
        }
        if (response.tourResult != 0) {
          setTourLength(response.tourResult);
          setTourNodes(response.tour);
          setRootTourNodes(response.tour);
          console.log(response.tour);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchData();
  }, [fetchCountry, API.Search]);

  return (
    <>
      <Layout scrollHeight={300}>
        <SEO title="Search" />
        <Parallax small filter />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <Row>
              <SearchColWrapper lg={6}>
                <Card plain style={{ border: '1px solid black' }}>
                  <GuideSearchPanel
                    onChangeInterest={onChangeInterest}
                    onChangeExtras={onChangeExtras}
                    onChangeLanguage={onChangeLanguage}
                    selectInterest={selectInterest}
                    selectExtras={selectExtras}
                    selectLanguage={selectLanguage}
                  />
                </Card>
                <Card plain style={{ border: '1px solid black' }}>
                  <TourSearchPanel
                    onChangeTag={onChangeTag}
                    onChangeCountry={onChangeCountry}
                    onChangeCity={onChangeCity}
                    onChangeLength={onChangeLength}
                    onChangePrice={onChangePrice}
                    onChangeMin={onChangeMin}
                    onChangeMax={onChangeMax}
                    onChangeReset={onChangeReset}
                    selectTag={selectTag}
                    rootCountry={rootCountry}
                    rootCity={rootCity}
                    selectCountry={selectCountry}
                    selectCity={selectCity}
                    selectLength={selectLength}
                    selectPriceValue={selectPriceValue}
                    form={form}
                  />
                </Card>
              </SearchColWrapper>
              <Col lg={18}>
                <TitleWrapper>
                  <Row justify="space-between" align="middle">
                    <Col span={18}>
                      <Row>
                        <Col>
                          <Title>Search with </Title>
                        </Col>
                        <Col>
                          <Title>{`"${q}"`}</Title>
                        </Col>
                      </Row>
                    </Col>
                    <Col span={6}>
                      <FilterButton onClick={() => setShow(true)}>
                        <FilterListIcon />
                        <p style={{ margin: 0, padding: '0 3px' }}>Filter</p>
                      </FilterButton>
                    </Col>
                  </Row>
                </TitleWrapper>
                <Spin spinning={loading}>
                  <div className={classes.container}>
                    <TeamResultSection
                      tourGuideData={tourGuideNodes || { result: 'not found data' }}
                      dataLength={tourGuideLength}
                    />
                  </div>
                </Spin>
                <Spin spinning={loading}>
                  <div className={classes.container}>
                    <TourResultSection tourData={tourNodes} dataLength={tourLength} />
                  </div>
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </Layout>
      <Modal open={show}>
        <Slide direction="down" in={show} mountOnEnter unmountOnExit>
          <FilterWrapper>
            <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              <Row justify="space-between" align="middle">
                <Col>
                  <CloseIconWrapper onClick={() => setShow(false)} />
                </Col>
                <Col>
                  <Title style={{ fontWeight: 'bold' }}>Search Filter</Title>
                </Col>
                <Col>
                  <Button
                    type="link"
                    block
                    onClick={onChangeAllReset}
                    style={{ color: '#2e2e2e', fontSize: '20px' }}
                  >
                    Clear
                  </Button>
                </Col>
              </Row>
              <Divider style={{ margin: '8px 0' }} />
              <GuideSearchPanel
                onChangeInterest={onChangeInterest}
                onChangeExtras={onChangeExtras}
                onChangeLanguage={onChangeLanguage}
                selectInterest={selectInterest}
                selectExtras={selectExtras}
                selectLanguage={selectLanguage}
              />
              <TourSearchPanel
                onChangeTag={onChangeTag}
                onChangeCountry={onChangeCountry}
                onChangeCity={onChangeCity}
                onChangeLength={onChangeLength}
                onChangePrice={onChangePrice}
                onChangeReset={onChangeReset}
                onChangeMin={onChangeMin}
                onChangeMax={onChangeMax}
                selectTag={selectTag}
                rootCountry={rootCountry}
                rootCity={rootCity}
                selectCountry={selectCountry}
                selectCity={selectCity}
                selectLength={selectLength}
                selectPriceValue={selectPriceValue}
                form={form}
              />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <ResultButton onClick={() => setShow(false)}>Show Result</ResultButton>
              </div>
            </div>
          </FilterWrapper>
        </Slide>
      </Modal>
    </>
  );
}

IndexPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

export default IndexPage;