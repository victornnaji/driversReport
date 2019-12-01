import getTrips from '../getTrips';
import getDrivers from '../getDrivers';

function tripDetails() {
  const trips = getTrips();
  const drivers = getDrivers();
  console.log(drivers);
}

export default tripDetails;
