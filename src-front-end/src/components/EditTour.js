import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Layout from './Layout';
import SEO from './SEO';
import CreateTourWizard from './CreateTourWizard';

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
