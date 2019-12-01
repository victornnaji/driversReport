import fetch from 'node-fetch';

export default function getTrips() {
  return fetch('/api/trips')
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data.data;
    });
}
