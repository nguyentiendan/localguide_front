import React from 'react';
import { Router } from '@reach/router';
import PrivateRoute from '../components/PrivateRoute';
import Admin from '../components/Admin/Admin';
import AdminTourList from '../components/Admin/AdminTourList';
import AdminTourReview from '../components/Admin/AdminTourReview';
import AdminGuideList from '../components/Admin/AdminGuideList';
import AdminGuideReview from '../components/Admin/AdminGuideReview';
import AdminUserReview from '../components/Admin/AdminUserReview';
import AdminChangePass from '../components/Admin/AdminChangePass';
import AdminSetInterest from '../components/Admin/AdminSetInterest';
import AdminSetExtra from '../components/Admin/AdminSetExtra';
import AdminSetTag from '../components/Admin/AdminSetTag';
import AdminSetLanguage from '../components/Admin/AdminSetLanguage';

// Guide
import GuideAdmin from '../components/Guide/GuideAdmin';
import GuideCreateTour from '../components/Guide/GuideCreateTour';
import GuideEditTour from '../components/Guide/GuideEditTour';
import GuideTourList from '../components/Guide/GuideTourList';
import GuideProfile from '../components/Guide/GuideProfile';
import GuideTourReview from '../components/Guide/GuideTourReview';
import ReviewProfile from '../components/Guide/ReviewProfile';
import GuideSchedule from '../components/Guide/GuideSchedule';

// User
import UserProfile from '../components/User/Profile';
import ChangePass from '../components/User/ChangePass';
import BecomeGuide from '../components/User/BecomeGuide';

//import BecomeGuide1 from '../components/User/BecomeGuide1';
//import StartProfile from '../components/User/Start';
//import ProfileReview from '../components/User/UserReview';

import Page404 from '../components/NotFound';

const NotFound = () => (
  <>
    <Page404 />
  </>
);

const App = () => (
  <Router basepath="/app">
    {/* Admin */}
    <PrivateRoute path="/admin" component={Admin} />
    <PrivateRoute path="/adminTourList" component={AdminTourList} />
    <PrivateRoute path="/adminTourReview" component={AdminTourReview} />
    <PrivateRoute path="/adminGuideList" component={AdminGuideList} />
    <PrivateRoute path="/adminGuideReview" component={AdminGuideReview} />
    <PrivateRoute path="/adminUserReview" component={AdminUserReview} />
    <PrivateRoute path="/adminChangePass" component={AdminChangePass} />
    <PrivateRoute path="/adminSetInterest" component={AdminSetInterest} />
    <PrivateRoute path="/adminSetExtra" component={AdminSetExtra} />
    <PrivateRoute path="/adminSetTag" component={AdminSetTag} />
    <PrivateRoute path="/adminSetLanguage" component={AdminSetLanguage} />

    {/* Guide */}
    <PrivateRoute path="/guideAdmin" component={GuideAdmin} />
    <PrivateRoute path="/createTour" component={GuideCreateTour} />
    <PrivateRoute path="/editTour" component={GuideEditTour} />
    <PrivateRoute path="/guideTourList" component={GuideTourList} />
    <PrivateRoute path="/guideProfile" component={GuideProfile} />
    <PrivateRoute path="/reviewProfile" component={ReviewProfile} />
    <PrivateRoute path="/guideTourReview" component={GuideTourReview} />
    <PrivateRoute path="/guideSchedule" component={GuideSchedule} />

    {/* User */}
    <PrivateRoute path="/profile" component={UserProfile} />
    <PrivateRoute path="/changePass" component={ChangePass} />
    <PrivateRoute path="/becomeGuide" component={BecomeGuide} />

    {/*<PrivateRoute path="/becomeGuide" component={BecomeGuide1} />
    <PrivateRoute path="/profileReview" component={ProfileReview} />
    <PrivateRoute path="/start" component={StartProfile} />*/}
    

    <NotFound default />
  </Router>
);

export default App;
