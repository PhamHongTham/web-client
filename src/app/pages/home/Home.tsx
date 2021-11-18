import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Contact from './partials/Contact';
import Slide from './partials/Slider';
import { getUserInfoRequest } from 'app/stores/user/actions';

import NewPost from './partials/NewPost/NewPost';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <>
      <Slide />
      <NewPost />
      <Contact />
    </>
  );
};
export default Home;
