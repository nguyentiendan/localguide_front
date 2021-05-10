import destinations from '../../mockdata/destinations.json';
import blogs from '../../mockdata/blogs.json';
import reviews from '../../mockdata/reviews.json';
import { request } from '../utils/http';

export async function getAllTourGuides() {
  return request({
    url: '/account/getAll',
    method: 'GET',
  });
}

export async function getAllReviews() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(reviews);
  });
}

export async function getAllDestinations() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(destinations);
  });
}

export async function getAllBlogs() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(blogs);
  });
}

export async function getGuideProfile(uid) {
  return request({
    url: `/account/guideView/${uid}`,
    method: 'GET',
    authRequired: true,
  });
}

// Get GuideProfile
export async function getGuideProfileOverview({ uid, guideId }) {
  return request({
    url: `/account/guide/${uid}/${guideId}`,
    method: 'GET',
  });
}

// Get Related tour of uid. Use in GuideProfile
export async function getRelatedTour({ uid }) {
  return request({
    url: `/tour/getAllTour?uid=${uid}`,
    method: 'GET',
  });
}

// Get User Profile
export async function getUserProfile(uid) {
  return request({
    url: `/account/user/${uid}`,
    method: 'GET',
  });
}

export async function getPhotosGuide({ uid }) {
  return request({
    url: `/guide/getAllPhoto/${uid}`,
    method: 'GET',
  });
}

export async function createTour(tour) {
  return request({
    url: `/tour/new`,
    method: 'POST',
    authRequired: true,
    data: tour,
  });
}

export async function getAllTours() {
  return request({
    url: '/tour/getPopularTour',
    method: 'GET',
  });
}

export async function getGuideAllTours({ uid, page }) {
  return request({
    url: `guide/tour/${uid}?page=${page}`,
    method: 'GET',
    authRequired: true,
  });
}

export async function deleteTour({ id, uid }) {
  return request({
    url: `guide/deleteTour`,
    method: 'DELETE',
    authRequired: true,
    data: { uid, id },
  });
}

export async function getAllFeedback({ uid, id }) {
  return request({
    url: `admin/tourFeedback/getAll?uid=${uid}&id=${id}`,
    method: 'GET',
    authRequired: true,
  });
}

export async function getAllFeedbackOfGuide({ uid, id }) {
  return request({
    url: `guide/tourFeedback/getAll?uid=${uid}&id=${id}`,
    method: 'GET',
    authRequired: true,
  });
}

export async function createReplyFeedback({ uid, feedbackId, content }) {
  return request({
    url: `admin/tourFeedback/create`,
    method: 'POST',
    authRequired: true,
    data: {
      uid,
      feedbackId,
      content,
    },
  });
}
// User get TourDetail
export async function getTourDetail({ id, uid }) {
  return request({
    url: '/tour/getTour',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}
// Admin review Tour
export async function adminReviewTour({ id, uid }) {
  return request({
    url: '/admin/tourReview/review',
    method: 'GET',
    authRequired: true,
    params: {
      id,
      uid,
    },
  });
}

export async function getTourFeeTransport({ id, uid }) {
  return request({
    url: '/tourFee/getTransport',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}

export async function getTourFeeMeal({ id, uid }) {
  return request({
    url: '/tourFee/getMeal',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}

export async function getTourFeeOther({ id, uid }) {
  return request({
    url: '/tourFee/getOther',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}

export async function getTourSchedulePickUp({ id, uid }) {
  return request({
    url: '/tourSchedule/getPickup',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}

export async function getTourSchedule({ id, uid }) {
  return request({
    url: '/tourSchedule/getSchedule',
    method: 'GET',
    params: {
      id,
      uid,
    },
  });
}

export async function updateTour(tour) {
  return request({
    url: '/tour/edit',
    method: 'POST',
    data: tour,
    authRequired: true,
  });
}
/*
export async function getRelatedTour() {
  return request({
    url: '/tour/getAllTour',
    method: 'GET',
  });
} */

export async function getAllCountry() {
  return request({
    url: '/country/getAll',
    method: 'GET',
  });
}

export async function getCityOfCountry(countryCode) {
  return request({
    url: `/city/getAll/${countryCode}`,
    method: 'GET',
  });
}

//upload multi photo for Guide
export async function uploadMultiPhotoGuide({ uid, file }) {
  return request({
    url: `/guide/uploadPhoto`,
    method: 'POST',
    authRequired: true,
    data: { uid, uploadFiles: file },
    isFormData: true,
  });
}

//upload cover image for Tour
export async function uploadCoverPhoto({ tourId, file }) {
  return request({
    url: `/tour/uploadCover`,
    method: 'POST',
    authRequired: true,
    data: { id: tourId, uploadFile: file },
    isFormData: true,
  });
}

export async function uploadPhoto({ uid, tourId, file }) {
  return request({
    url: `/tour/uploadOneFile`,
    method: 'POST',
    authRequired: true,
    data: { uid, id: tourId, uploadFile: file },
    isFormData: true,
  });
}

//upload multi photo for Tour
export async function uploadMultiPhoto({ uid, tourId, file }) {
  return request({
    url: `/tour/uploadMultiFile`,
    method: 'POST',
    authRequired: true,
    data: { uid, id: tourId, uploadFiles: file },
    isFormData: true,
  });
}
export async function uploadAvatar({ uid, file }) {
  return request({
    url: `/account/uploadAvatar`,
    method: 'POST',
    authRequired: true,
    data: { uid, uploadFile: file },
    isFormData: true,
  });
}

export async function updateCaption({ caption, name, tourId, uid }) {
  return request({
    url: `/tour/updateCaption`,
    method: 'POST',
    authRequired: true,
    data: { caption, fileName: name, id: tourId, uid },
    isFormData: true,
  });
}

export async function updateCaptionGuide({ caption, name, uid }) {
  return request({
    url: `/guide/updateCaption`,
    method: 'POST',
    authRequired: true,
    data: { caption, fileName: name, uid },
    isFormData: true,
  });
}

export async function getTourPhotos({ id, uid }) {
  return request({
    url: `/tour/getAllPhoto`,
    method: 'GET',
    params: { uid, id },
  });
}

export async function getTourCoverPhoto({ id, uid }) {
  return request({
    url: `/tour/getCoverPhoto`,
    method: 'GET',
    params: { uid, id },
  });
}

export async function deleteCover({ nameImage, tourId, uid }) {
  return request({
    url: `/tour/deleteCover`,
    method: 'DELETE',
    authRequired: true,
    data: { fileName: nameImage, id: tourId, uid },
    isFormData: true,
  });
}

export async function deleteTourPhoto({ nameImage, tourId, uid }) {
  return request({
    url: `/tour/deletePhoto`,
    method: 'DELETE',
    authRequired: true,
    data: { fileName: nameImage, id: tourId, uid },
    isFormData: true,
  });
}

export async function deletePhotoGuide({ name, uid }) {
  return request({
    url: `/guide/deletePhoto`,
    method: 'DELETE',
    authRequired: true,
    data: { uid, fileName: name },
    isFormData: true,
  });
}

export async function getAllTags() {
  return request({
    url: `/tag/getAllTag`,
    method: 'GET',
  });
}

export async function createTourFee({ tourId, day, transport, meal, other }) {
  return request({
    url: `/tourFee/create`,
    method: 'POST',
    authRequired: true,
    data: { tourId, day, transport, meal, other },
  });
}

export async function createTourSchedule({ tourId, day, pickup, schedule }) {
  return request({
    url: `/tourSchedule/create`,
    method: 'POST',
    authRequired: true,
    data: { tourId, day, pickup, schedule },
  });
}

// Admin get all Tour
export async function adminGetAllTour({ uid, token }) {
  return request({
    url: `/admin/tour/${uid}?page=1`,
    method: 'GET',
    authRequired: true,
    token,
  });
}

// Admin get all Guide
export async function adminGetAllGuide({ token }) {
  return request({
    url: `/admin/guide/getAll`,
    method: 'GET',
    authRequired: true,
    token,
  });
}

export async function getAdminProfile({ uid }) {
  return request({
    url: `account/admin/${uid}`,
    method: 'GET',
    authRequired: true,
  });
}

export async function editProfile(data) {
  return request({
    url: 'account/edit',
    method: 'POST',
    authRequired: true,
    data,
  });
}

export async function getAllInterest() {
  return request({
    url: '/interest/getAllInterest',
    method: 'GET',
  });
}

export async function getAllExtra() {
  return request({
    url: '/extra/getAllExtra',
    method: 'GET',
    authRequired: true,
  });
}

export async function getAllLang() {
  return request({
    url: '/lang/getAllLang',
    method: 'GET',
  });
}

// API for edit tour.
export async function getTourEditGuide({ uid, id }) {
  return request({
    url: `guide/getTour?uid=${uid}&id=${id}`,
    method: 'GET',
    authRequired: true,
  });
}

export async function getAllCostTourEdit({ uid, id }) {
  return request({
    url: `tourFee/getAllCost?uid=${uid}&id=${id}`,
    method: 'GET',
  });
}

export async function getAllScheduleTourEdit({ uid, id }) {
  return request({
    url: `tourSchedule/getAllSchedule?uid=${uid}&id=${id}`,
    method: 'GET',
  });
}

export async function handleFillterTourAdmin({ data }) {
  const handleStatus = () => {
    switch (data.status) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 2;
      default:
        return 3;
    }
  };
  return request({
    url: '/admin/tourFilter/filter',
    method: 'GET',
    authRequired: true,
    params: {
      city: data.city,
      country: data.country,
      status: handleStatus(),
      price: data.total || 0,
      day: data.day || 1,
    },
  });
}

export async function handleAdminApproveTour({ uid, id }) {
  return request({
    url: '/admin/tourReview/approve',
    method: 'POST',
    authRequired: true,
    data: { uid, id: Number(id) },
  });
}

export async function handleCreateFeedback({ uid, tourId, content }) {
  return request({
    url: 'admin/tourFeedback/create',
    method: 'POST',
    authRequired: true,
    data: { uid, tourId, content },
  });
}

export async function handleGetAllFeedback({ uid, id }) {
  return request({
    url: '/admin/tourFeedback/getAll',
    method: 'GET',
    authRequired: true,
    params: { uid, id: Number(id) },
  });
}

export async function handleEditFeedback({ id, content }) {
  return request({
    url: '/admin/tourFeedback/edit',
    method: 'POST',
    data: { id, content },
    authRequired: true,
  });
}

export async function handleDeleteFeedback({ id }) {
  return request({
    url: '/admin/tourFeedback/delete',
    method: 'DELETE',
    data: { id },
    authRequired: true,
  });
}

export async function handleResolveFeedback({ id }) {
  return request({
    url: '/admin/tourFeedback/resolve',
    method: 'POST',
    data: { id },
    authRequired: true,
  });
}

export async function handleGetAllReplyFeedback({ uid, id }) {
  return request({
    url: '/admin/tourFeedback/getAllReply',
    method: 'GET',
    authRequired: true,
    params: { uid, id: Number(id) },
  });
}

export async function handleCreateReply({ uid, feedbackId, content }) {
  return request({
    url: '/admin/tourReply/create',
    method: 'POST',
    authRequired: true,
    data: { uid, feedbackId, content },
  });
}

export async function handleEditReply({ id, content }) {
  return request({
    url: '/admin/tourReplyFb/edit',
    method: 'POST',
    data: { id, content },
    authRequired: true,
  });
}

export async function handleDeleteReply({ id }) {
  return request({
    url: '/admin/tourReplyFb/delete',
    method: 'DELETE',
    data: { id },
    authRequired: true,
  });
}
