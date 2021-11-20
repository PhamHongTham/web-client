import React from 'react';

import Contact from './partials/Contact';
import Slide from './partials/Slider';
import NewPost from './partials/NewPost/NewPost';

const Home = () => {
  return (
    <>
      <Slide />
      <NewPost/>
      <Contact />
    </>
  );
};
export default Home;
