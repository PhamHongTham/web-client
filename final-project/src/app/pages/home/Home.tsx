import React from 'react';

import Contact from './partials/Contact';
import Slide from './partials/Slider';
import Footer from 'app/shared/components/Footer';

const Home = () => {
  return (
    <>
      <Slide />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
