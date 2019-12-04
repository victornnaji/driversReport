import React, { useContext, useEffect } from 'react';
import { HeadingContext } from '../Display/Display';
import Tables from '../Tables/Tables';

const Trips = () => {
  const { setHeading } = useContext(HeadingContext);
  useEffect(() => {
    setHeading('Trips');
  }, [setHeading]);

  return (
    <div>
      <Tables />
    </div>
  );
};

export default Trips;
