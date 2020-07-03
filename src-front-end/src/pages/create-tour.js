import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import SEO from '../components/SEO';
import CreateTourWizard from '../components/CreateTourWizard';

const Wrapper = styled.div``;

function CreateTourPage() {
  return (
    <Layout noHeader>
      <SEO title="Create tour" />
      <Wrapper>
        <CreateTourWizard />
      </Wrapper>
    </Layout>
  );
}

CreateTourPage.propTypes = {};

export default CreateTourPage;
