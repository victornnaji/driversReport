## This is the boilerplate for the client side UI

Please ensure you write test for your components

---

## RUN

```basb
yarn

yarn start
```

## Helper Functions

Helper functions to consume the APIs can be found in `src/Helpers` folder

```javascript
/**
 * Returns a Promise
 * @param {string} url
 * @returns {Promise} Promise<resolved>
 */

getAny(url);

/**
 * Returns a Promise
 * @returns {Promise} Promise<resolved>
 */

getDrivers();
getTrips();
GetVehicle();
```

## Sample code to give all trips data

Try this as a component and see what you get

```javascript
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Table.css';
function TripsData() {
  const [driverState, setDriverState] = useState({
    drivers: [{ driverID: '1234' }],
  });

  const [tripState, setTripState] = useState({
    trips: [{ tripID: '', driverID: '' }],
  });

  useEffect(() => {
    const fetchDriver = () => {
      fetch('/api/drivers')
        .then(data => {
          return data.json();
        })
        .then(data => {
          setDriverState({ drivers: data.data });
        });
    };
    fetchDriver();
  }, []);

  useEffect(() => {
    fetch('api/trips')
      .then(data => {
        return data.json();
      })
      .then(data => {
        setTripState({ trips: data.data });
      });
    return () => {};
  }, []);

  let tripDetails = [];
  let driversIds = [];
  for (const trip of tripState.trips) {
    driversIds.push(trip.driverID);
    try {
      tripDetails.push({
        passengerName: trip.user.name,
        billed: trip.billedAmount,
        tripID: trip.tripID,
        driverID: trip.driverID,
      });
    } catch {}
  }

  let driverNamesKey = driverState.drivers.reduce((accumulator, driver) => {
    let key = driver.driverID;
    if (!accumulator[key]) {
      accumulator[key] = { name: 'Driver Name' };
    }
    accumulator[key].name = driver.name;
    return accumulator;
  }, {});

  let driverNames = [];

  for (const driverId of driversIds) {
    try {
      driverNames.push(driverNamesKey[driverId].name);
    } catch {
      driverNames.push('A man has no name');
    }
  }

  for (const i in tripDetails) {
    try {
      tripDetails[i].driverName = driverNames[i];
    } catch {}
  }

  const tableDate = () => {
    let passengerName = [];
    let driverName = [];
    let billed = [];
    let tripId = [];
    for (let i in tripDetails) {
      try {
        passengerName.push(tripDetails[i].passengerName);
        driverName.push(tripDetails[i].name);
        billed.push(tripDetails[i].billed);
        tripId.push(tripDetails[i].tripID);
      } catch {
        passengerName.push('No name');
        driverName.push('Driver does not exist');
        billed.push('No billing');
      }
    }

    let markup = passengerName.map((passengerName, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{driverNames[index]}</td>
          <td>{passengerName}</td>
          <td>{billed[index]}</td>
          <td>
            {
              <Link to={`/trips/${driverNames[index]}/${tripId[index]}`}>
                {' '}
                Details
              </Link>
            }
          </td>
        </tr>
      );
    });
    return markup;
  };

  return (
    <div className="trips-table">
      <p>TRIPS DETAILS</p>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>User</th>
            <th>Amount (&#8358;)</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody className="trips-body">
          {tableDate().map(dataRow => {
            return dataRow;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TripsData;
```
