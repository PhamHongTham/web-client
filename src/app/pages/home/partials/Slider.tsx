import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import SlideItem from './SlideItem';
import { getFeaturedPostsRequest } from 'app/stores/post/actions';

const Slide = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState<any>(null);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    dispatch(getFeaturedPostsRequest(1, 3)).then((res: any) => {
      setPosts(res?.data);
    });
  }, []);

  useEffect(() => {
    setInterval(() => {
      setIndex((prev) => (prev > 1 ? 0 : prev + 1));
    }, 10000);
  }, []);

  return (
    <section className="section-slide">
      <div className="container">
        <h2 className="slide-title">Trending</h2>
        <div className="slide-content">
          <ul className="list-post">
            {posts?.map((item: any) => (
              <SlideItem post={item} index={index} />
            ))}
          </ul>
          <div className="slide-dots">
            {posts?.map((item: any, indexItem: number) => (
              <span
                className={index === indexItem ? 'dot-item active' : 'dot-item'}
                onClick={() => setIndex(indexItem)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide;
