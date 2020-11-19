import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import CreateTourWizard from '../components/CreateTourWizard';

const Wrapper = styled.div``;

function CreateTourPage(props) {
  const { location } = props;
  return (
    <Layout noHeader>
      <SEO title="Create tour" />
      <Wrapper>
        <CreateTourWizard location={location} />
      </Wrapper>
    </Layout>
  );
}

CreateTourPage.propTypes = {
  location: PropTypes.shape({}).isRequired,
};

export default CreateTourPage;
