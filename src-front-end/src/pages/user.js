import React from 'react';
import { Router } from '@reach/router';

import Layout from '../components/Layout';
import PrivateRoute from '../components/PrivateRoute';
import Profile from '../components/Profile';

function User() {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/profile" component={Profile} />
      </Router>
    </Layout>
  );
}
export default User;
