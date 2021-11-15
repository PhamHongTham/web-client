import axiosClient from "./axios-client";

export const getRecommendPost = (params: { page: number, size: number }) :any => axiosClient.get('posts/public', {params});
