import React, { useContext, useEffect } from 'react';
import { HeadingContext } from '../Display/Display';

const Trips = () => {
  const { setHeading } = useContext(HeadingContext);
  useEffect(() => {
    setHeading('Trips');
  }, []);
  return <div>trips</div>;
};

export default Trips;
