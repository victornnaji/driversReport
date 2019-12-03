import React, { useState, useEffect } from 'react';
import './Award.scss';
import Loader from '../Loader/Loader';

const Award = () => {
  const [trips, settrips] = useState({ trips: [{}] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrips = async () => {
      let tripdata = await fetch('/api/trips');
      return tripdata;
    };

    getTrips()
      .then(data => {
        return data.json();
      })
      .then(data => {
        setTimeout(function() {
          settrips({ trips: data.data });
          setLoading(false);
        }, 2000);
      });
  }, []);

  trips.trips.pop();
  let calculatedTrips = trips.trips.reduce((accumulator, currentTrip) => {
    let key = currentTrip.driverID;
    if (!accumulator[key]) {
      accumulator[key] = {
        Cash: 0,
        NonCash: 0,
        totalCash: 0,
        sum: 0,
        name: 'Drivers Name',
      };
    }

    if (currentTrip.isCash) {
      accumulator[key].Cash += 1;
    } else {
      accumulator[key].NonCash += 1;
    }
    accumulator[key].sum += 1;
    accumulator[key].totalCash = totalCash(
      currentTrip.billedAmount,
      accumulator[key].totalCash,
    );
    return accumulator;
  }, {});

  let tripSum = [];
  for (const i in calculatedTrips) {
    tripSum.push(calculatedTrips[i].sum);
  }

  let highestTrip = Math.max(...tripSum);

  let winner = {};
  for (const i in calculatedTrips) {
    if (calculatedTrips[i].sum === highestTrip) {
      winner[i] = calculatedTrips[i];
      break;
    }
  }

  const winnerID = Object.keys(winner);

  const [driverNameState, setDriverNameState] = useState({
    data: [],
  });

  useEffect(() => {
    fetch('/api/drivers')
      .then(data => {
        return data.json();
      })
      .then(data => {
        setDriverNameState({ data: data.data });
      });
  }, []);

  let driverName = 'Drivers Name';
  for (const i of driverNameState.data) {
    try {
      if (i.driverID === winnerID[0]) {
        driverName = i.name;
        break;
      }
    } catch {}
  }

  let winnerDetails = Object.values(winner);

  return (
    <div className="award-holder">
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <span role="img" aria-label="crown" className="crown">
            👑
          </span>
          <div className="driver-details">
            <div className="image-holder">
              <img src="assets/james.jpg" alt="" className="logo-image" />
            </div>
            <div className="details">
              <div className="name">{driverName}</div>

              <div className="lists">
                <div className="flex-between awards-list">
                  <div>
                    <span role="img" aria-label="cars" className="emoji">
                      💰
                    </span>
                  </div>
                  <div className="totalAmount">
                    ₦
                    {Math.ceil(winnerDetails[0].totalCash)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </div>
                  <div>1st</div>
                </div>

                <div className="flex-between awards-list">
                  <div>
                    <span role="img" aria-label="cars" className="emoji">
                      🚗
                    </span>
                  </div>
                  <div className="totalAmount">{winnerDetails[0].sum}</div>
                  <div>2nd</div>
                </div>

                <div className="flex-between awards-list">
                  <div>
                    <span role="img" aria-label="cars" className="emoji">
                      📱
                    </span>
                  </div>
                  <div className="totalAmount">{winnerDetails[0].NonCash}</div>
                  <div>1st</div>
                </div>

                <div className="flex-between awards-list">
                  <div>
                    <span role="img" aria-label="cars" className="emoji">
                      💵
                    </span>
                  </div>
                  <div className="totalAmount">{winnerDetails[0].Cash}</div>
                  <div>1st</div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function toMoney(str) {
  str = str.replace(',', '');
  return Number(str);
}

function totalCash(bA, btot) {
  if (typeof bA === 'number') {
    btot += bA;
  } else {
    btot += toMoney(bA);
  }

  btot = btot.toFixed(2);
  return Number(btot);
}

export default Award;
