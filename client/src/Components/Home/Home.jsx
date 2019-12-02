import React, { useContext, useEffect } from 'react';
import './Home.scss';
import { HeadingContext } from '../Display/Display';

const Home = () => {
  const { setHeading } = useContext(HeadingContext);
  useEffect(() => {
    setHeading('Dashboard');
  }, []);

  return (
    <div className="home">
      <p>hello</p>
      <p>hi</p>
      <p>lol</p>
    </div>
  );
};

export default Home;
