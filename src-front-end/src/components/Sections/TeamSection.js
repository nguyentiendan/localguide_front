import React, { useState, useEffect } from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// @material-ui/icons
// core components
import { Spin } from 'antd';
import { Link } from 'gatsby';
import GridContainer from '../Grid/GridContainer.js';
import GridItem from '../Grid/GridItem.js';
import Card from '../Card/Card.js';
import CardBody from '../Card/CardBody.js';
import CardFooter from '../Card/CardFooter.js';
import * as API from '../../apis';

import styles from '../../assets/styles/teamStyle.js';

const useStyles = makeStyles(styles);

function TeamSection() {
  const [tourGuides, setTourGuides] = useState();
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const imageClasses = classNames(classes.imgRaised, classes.imgRoundedCircle, classes.imgFluid);

  useEffect(() => {
    const fetchTourGuides = async () => {
      try {
        setLoading(true);
        const response = await API.getAllTourGuides();
        setTourGuides(response.data);
        // TODO : if network down or data not found => call mock API
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTourGuides();
    const interval = setInterval(() => fetchTourGuides(), 100000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Tour Guides </h2>
      <Spin spinning={loading}>
        <GridContainer>
          {tourGuides &&
            tourGuides.map((guide, index) => {
              return (
                <GridItem xs={12} sm={12} md={4} key={index}>
                  <Link to={`/guide1?uid=${guide.uid}&id=${guide.id}`}>
                    <Card plain>
                      <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                        <img src={guide.avatar} alt="..." className={imageClasses} />
                      </GridItem>
                      <h4 className={classes.cardTitle}>
                        {guide.fullname}
                        <br />
                        <small className={classes.smallTitle}>{guide.job}</small>
                      </h4>
                      <CardBody>
                        <p className={classes.description}>
                          You can write here details about one of your team members. You can give
                          more details about what they do. Feel free to add some for people to be
                          able to follow them outside the site.
                        </p>
                      </CardBody>
                    </Card>
                  </Link>
                </GridItem>
              );
            })}
        </GridContainer>
      </Spin>
    </div>
  );
}

export default TeamSection;
