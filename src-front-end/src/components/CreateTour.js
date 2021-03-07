import React from 'react';
import styled from 'styled-components';

import Layout from './Layout';
import SEO from './SEO';
import CreateTourWizard from './CreateTourWizard';

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
