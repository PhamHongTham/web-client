import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import Slide from './partials/Slider';
import NewPost from './partials/NewPost/NewPost';

import { getUserInfoRequest } from 'app/stores/user/actions';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);
  return (
    <>
      <Slide />
      <NewPost />
    </>
  );
};
export default Home;
