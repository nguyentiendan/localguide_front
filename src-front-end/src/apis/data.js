import destinations from '../../mockdata/destinations.json';
import blogs from '../../mockdata/blogs.json';
import tours from '../../mockdata/tours.json';
import reviews from '../../mockdata/reviews.json';
import tourDetails from '../../mockdata/tour-details.json';
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
    url: `/account/get/${uid}`,
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
  // TODO: call API
  return new Promise(resolve => {
    resolve(tours);
  });

  // return request({
  //   url: '/tour/getPopularTour',
  //   method: 'GET',
  // });
}

// eslint-disable-next-line no-unused-vars
export async function getTourDetail({ id, uid }) {
  // TODO: call API
  return new Promise(resolve => {
    resolve(tourDetails);
  });

  // return request({
  //   url: '/tour/getTour',
  //   method: 'GET',
  //   params: {
  //     id,
  //     uid,
  //   },
  // });
}

export async function updateTour(tour) {
  return request({
    url: '/tour/edit',
    method: 'POST',
    data: tour,
    authRequired: true,
  });
}

export async function getRelatedTour() {
  return request({
    url: '/tour/getAllTour',
    method: 'GET',
  });
}

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

export async function uploadCoverPhoto({ tourId, file }) {
  return request({
    url: `/file/uploadCover`,
    method: 'POST',
    authRequired: true,
    data: { id: tourId, uploadFile: file },
    isFormData: true,
  });
}

export async function uploadPhoto({ tourId, file }) {
  return request({
    url: `/file/uploadOneFile`,
    method: 'POST',
    authRequired: true,
    data: { id: tourId, uploadFile: file },
    isFormData: true,
  });
}

export async function updateCaption({ caption, name, tourId, uid }) {
  return request({
    url: `/tour/updateCaption`,
    method: 'POST',
    authRequired: true,
    data: { caption, fileName: name, id: tourId, uid },
  });
}

export async function getTourPhotos({ tourId, uid }) {
  return request({
    url: `/tour/getAllPhoto`,
    method: 'GET',
    params: { uid, id: tourId },
  });
}
