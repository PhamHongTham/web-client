import axiosClient from './axios-client';

const articleApi = {
  getAll: (params: { page: number, size: number }) => {
    const url = `/public`;
    return axiosClient.get(url, { params });
  }
};
export default articleApi;
