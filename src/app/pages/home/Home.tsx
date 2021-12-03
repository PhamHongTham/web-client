import React, { useEffect } from 'react';

import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';

import Slide from './partials/Slider';
import Newsfeed from './partials/newsfeed/Newsfeed';
import { localStorageOption } from 'app/shared/helper/LocalAction';
import { getUserInfoRequest } from 'app/stores/user/actions';
import Footer from 'app/shared/components/Footer';

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search }: { search: string } = useLocation();
  const accessToken = new URLSearchParams(search).get('accessToken');
  const prePath: string | null = localStorage.getItem('PATH');

  useEffect(() => {
    if (accessToken) {
      localStorageOption.setUserToken(accessToken);
      dispatch(getUserInfoRequest());
    }
  }, [accessToken]);

  useEffect(() => {
    if (prePath) {
      history.push(`${prePath}`);
      localStorage.removeItem('PATH');
    }
  }, [prePath]);

  return (
    <>
      <Slide />
      <Newsfeed />
      <Footer />
    </>
  );
};
export default Home;
