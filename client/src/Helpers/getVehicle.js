import { useState, useEffect } from 'react';
import getDriver from './getDrivers';

export default function GetVehicle() {
  const [driverState, setDriverState] = useState({});

  useEffect(() => {
    getDriver().then(data => {
      setDriverState({ data });
    });
  }, []);
  return driverState;
}
