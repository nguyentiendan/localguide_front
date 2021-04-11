import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import Admin from '../components/Admin';
import MyTour from '../components/MyTour';
import CreateTour from '../components/CreateTour';
import EditTour from '../components/EditTour';
import AdminTourReview from '../components/AdminTourReview';
import GuideTourReview from '../components/GuideTourReview';

const App = () => (
  <Router>
    <PrivateRoute path="/app/admin" component={Admin} />
    <PrivateRoute path="/app/my_tours" component={MyTour} />
    <PrivateRoute path="/app/create_tour" component={CreateTour} />
    <PrivateRoute path="/app/edit_tour" component={EditTour} />
    <PrivateRoute path="/app/admin_tour_review" component={AdminTourReview} />
    <PrivateRoute path="/app/tour_review" component={GuideTourReview} />
  </Router>
);

export default App;
