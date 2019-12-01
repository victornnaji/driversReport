import fetch from 'node-fetch';

export default function getAny(url) {
  return fetch(url)
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data.data;
    });
}
