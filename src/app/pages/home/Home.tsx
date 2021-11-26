import React, { useEffect } from 'react';

import { useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import Slide from './partials/Slider';
import Newsfeed from './partials/Newsfeed/Newsfeed';
import { localStorageOption } from 'app/shared/helper/LocalAction';
import { getUserInfoRequest } from 'app/stores/user/actions';
import Footer from 'app/shared/components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const { search }: any = useLocation();
  const accessToken = new URLSearchParams(search).get('accessToken');

  useEffect(() => {
    if (accessToken) {
      localStorageOption.setUserToken(accessToken);
      dispatch(getUserInfoRequest());
    }
  }, [accessToken]);

  return (
    <>
      <Slide />
      <Newsfeed />
      <Footer />
    </>
  );
};
export default Home;
