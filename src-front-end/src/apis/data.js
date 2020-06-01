import tourGuides from '../../mockdata/tour-guides.json';
import destinations from '../../mockdata/destinations.json';
import blogs from '../../mockdata/blogs.json';
import tours from '../../mockdata/tours.json';
import reviews from '../../mockdata/reviews.json';

export async function getAllTourGuides() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(tourGuides);
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

export async function getAllTours() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(tours);
  });
}

export async function getAllReviews() {
  // TODO: call API
  return new Promise(resolve => {
    resolve(reviews);
  });
}
