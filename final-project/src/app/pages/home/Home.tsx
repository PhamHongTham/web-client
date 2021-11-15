import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Contact from './partials/Contact';
import Slide from './partials/Slider';
import Footer from 'app/shared/components/Footer';
import { getUserInfoRequest } from 'app/stores/user/actions';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfoRequest());
  }, [dispatch]);

  return (
    <>
      <Slide />
      <Contact />
    </>
  );
};

export default Home;
