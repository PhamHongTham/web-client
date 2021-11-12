// api/productApi.js
import axiosClient from './axios-client';

const articleApi = {
  getAll : (params: any) => {
    const url = `/products`;
    return axiosClient.get(url, { params });
  },
  get : (id: string) => {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  create : (id: string) => {
    const url = `/products/${id}`;
    return axiosClient.post(url);
  },
  update : (id: string) => {
    const url = `/products/${id}`;
    return axiosClient.put(url);
  },
  delete : (id: string) => {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  }
};

export default articleApi;
