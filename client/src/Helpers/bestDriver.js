const getTrips = async () => {
  let tripData = await fetch('/api/trips');
  return tripData;
};

const getDriver = async () => {
  fetch('/api/drivers').then(data => {
    return data.json();
  });
};

async function analysis() {
  // Your code goes here
  let trips_data = await getTrips();
  let driversID;
  let uniqueDriversID;
  let driverDetails = [];
  let allDriverDetails = new Map();
  let drivers_trip = [];

  let res = trips_data;

  try {
    driversID = trips_data.map(currentValue => currentValue.driverID);
    uniqueDriversID = [...new Set(driversID)];
  } catch (error) {
    console.error(error.message);
  }

  for (let value of uniqueDriversID) {
    try {
      let detail = await getDriver(value);
      driverDetails.push(detail);

      let driverDetail = {
        ...detail,
      };
      driverDetail['noOfTrips'] = 0;
      driverDetail['totalAmountEarned'] = 0;

      allDriverDetails.set(value, driverDetail);
    } catch (error) {
      console.log(error.message);
    }
  }
  for (let x of allDriverDetails) {
    drivers_trip.push(x);
  }

  return res.reduce(
    (acc, cur) => {
      acc.billedTotal = totalCash(cur.billedAmount, acc.billedTotal);

      if (cur.isCash) {
        acc.noOfCashTrips++;
        acc.cashBilledTotal = totalCash(cur.billedAmount, acc.cashBilledTotal);
      } else {
        acc.noOfNonCashTrips++;
        acc.nonCashBilledTotal = totalCash(
          cur.billedAmount,
          acc.nonCashBilledTotal,
        );
      }

      if (allDriverDetails.has(cur.driverID)) {
        let details = allDriverDetails.get(cur.driverID);
        details.noOfTrips += 1;
        details.totalAmountEarned = totalCash(
          cur.billedAmount,
          details.totalAmountEarned,
        );

        let sortedTrips = [...allDriverDetails].sort(
          (a, b) => b[1].noOfTrips - a[1].noOfTrips,
        );

        let {
          name,
          email,
          phone,
          noOfTrips,
          totalAmountEarned,
        } = sortedTrips[0][1];

        acc.mostTripsByDriver = {
          name,
          email,
          phone,
          noOfTrips,
          totalAmountEarned,
        };
      }

      return acc;
    },
    {
      mostTripsByDriver: {},
    },
  );
}

// functions
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

export default analysis;
