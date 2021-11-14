import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_ARTICLE_URL,
  headers: {
    'content-type': 'article/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
axiosClient.interceptors.request.use(async (config) => {

  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
