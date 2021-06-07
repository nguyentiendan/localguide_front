import React from 'react';
import { Router,} from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import Admin from '../components/Admin/Admin';
import AdminTourList from '../components/Admin/AdminTourList';
import AdminTourReview from '../components/Admin/AdminTourReview';
import AdminGuideList from '../components/Admin/AdminGuideList';
import AdminGuideReview from '../components/Admin/AdminGuideReview';
import AdminUserReview from '../components/Admin/AdminUserReview';

import GuideAdmin from '../components/Guide/GuideAdmin';
import GuideCreateTour from '../components/Guide/GuideCreateTour';
import GuideEditTour from '../components/Guide/GuideEditTour';
import GuideTourList from '../components/Guide/GuideTourList';
import GuideProfile from '../components/Guide/GuideProfile';
import GuideTourReview from '../components/Guide/GuideTourReview';
import UserProfile from '../components/User/Profile';
import ProfileReview from '../components/User/UserReview';
import BecomeGuide from '../components/User/BecomeGuide';
import StartProfile from '../components/User/Start';
import Page404 from "../components/NotFound";

const NotFound = () => (
  <>
    <Page404/>
  </>
)

const App = () => (
  <Router basepath="/app">
    {/* Admin */}
    <PrivateRoute path="/admin" component={Admin} />
    <PrivateRoute path="/adminTourList" component={AdminTourList} />
    <PrivateRoute path="/adminTourReview" component={AdminTourReview} />
    <PrivateRoute path="/adminGuideList" component={AdminGuideList} />
    <PrivateRoute path="/adminGuideReview" component={AdminGuideReview} />
    <PrivateRoute path="/adminUserReview" component={AdminUserReview} />
    
    {/* Guide */}
    <PrivateRoute path="/guideAdmin" component={GuideAdmin} />
    <PrivateRoute path="/createTour" component={GuideCreateTour} />
    <PrivateRoute path="/editTour" component={GuideEditTour} />
    <PrivateRoute path="/guideTourList" component={GuideTourList} />
    <PrivateRoute path="/guideProfile" component={GuideProfile} />
    <PrivateRoute path="/guideTourReview" component={GuideTourReview} /> 

    {/* User */}
    <PrivateRoute path="/profile" component={UserProfile} />
    <PrivateRoute path="/becomeGuide" component={BecomeGuide} />
    <PrivateRoute path="/profileReview" component={ProfileReview} />
    <PrivateRoute path="/start" component={StartProfile} />
    
    <NotFound default />

  </Router>
);

export default App;