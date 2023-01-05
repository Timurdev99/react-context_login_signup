import axios from 'axios';

export function getBaseApi() {
  return axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
  });
};

export function getProtectedApi(token) {
  return axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        token: token,
    }
  })
};