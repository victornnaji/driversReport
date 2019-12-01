import fetch from 'node-fetch';

export default function getDrivers() {
  return fetch('api/drivers')
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data.data;
    });
}
