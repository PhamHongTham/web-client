import React, { useEffect } from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import Slide from './partials/Slider';
import Newsfeed from './partials/newsfeed/Newsfeed';
import { localStorageOption } from 'app/shared/helper/LocalAction';
import { getUserInfoRequest } from 'app/stores/user/actions';

const Home = () => {
  const dispatch = useDispatch();
  const { search }: any = useLocation();
  const accessToken = new URLSearchParams(search).get('accessToken');

  useEffect(() => {
    if (accessToken) {
      localStorageOption.setUserToken(accessToken);
      dispatch(getUserInfoRequest());
    }
  }, []);

  return (
    <>
      <Slide />
      <Newsfeed />
    </>
  );
};
export default Home;
