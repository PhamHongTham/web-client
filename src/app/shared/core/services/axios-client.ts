import axios, { AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://vast-lowlands-08945.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config: any) {
    let tokenString: string | null = localStorage.getItem('USER_TOKEN');
    if (tokenString) {
      let token: string = tokenString.slice(1, tokenString.length - 1);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
