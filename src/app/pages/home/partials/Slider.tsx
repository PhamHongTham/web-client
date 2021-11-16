import React, { useEffect, useState } from 'react';
import SlideItem from './SlideItem';

const Slide = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    setInterval(() => {
      setIndex((prev) => (prev > 1 ? 0 : prev + 1));
    }, 7000);
  }, []);

  return (
    <section className="section-slide">
      <div className="container">
        <h2 className="slide-title">Trending</h2>
        <div className="slide-content">
          <ul className="list-post">
            <SlideItem index={index} />
            <SlideItem index={index} />
            <SlideItem index={index} />
          </ul>
          <div className="slide-dots">
            <span
              className={index === 0 ? 'dot-item active' : 'dot-item'}
            ></span>
            <span
              className={index === 1 ? 'dot-item active' : 'dot-item'}
              onClick={() => setIndex(1)}
            ></span>
            <span
              className={index === 2 ? 'dot-item active' : 'dot-item'}
            ></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide;
