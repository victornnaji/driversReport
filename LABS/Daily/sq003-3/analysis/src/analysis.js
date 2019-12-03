$_$wp(1);
const { getTrips, getDriver } = ($_$w(1, 0), require('api'));
async function analysis() {
  $_$wf(1);
  let trips_data = ($_$w(1, 1), await getTrips());
  let driversID = $_$w(1, 2);
  let uniqueDriversID = $_$w(1, 3);
  let driverDetails = ($_$w(1, 4), []);
  let allDriverDetails = ($_$w(1, 5), new Map());
  let drivers_trip = ($_$w(1, 6), []);
  $_$w(1, 7), (res = [...trips_data]);
  try {
    $_$w(1, 8),
      (driversID = trips_data.map(currentValue => {
        $_$wf(1);
        return $_$w(1, 9), currentValue.driverID;
      }));
    $_$w(1, 10), (uniqueDriversID = [...new Set(driversID)]);
  } catch (error) {
    $_$w(1, 11), console.error(error.message);
  }
  for (value of ($_$w(1, 12), uniqueDriversID)) {
    try {
      let detail = ($_$w(1, 13), await getDriver(value));
      $_$w(1, 14), driverDetails.push(detail);
      $_$w(1, 15), (driverDetail = { ...detail });
      $_$w(1, 16), (driverDetail['noOfTrips'] = 0);
      $_$w(1, 17), (driverDetail['totalAmountEarned'] = 0);
      $_$w(1, 18), allDriverDetails.set(value, driverDetail);
    } catch (error) {
      $_$w(1, 19), $_$tracer.log(error.message, 'error.message', 1, 19);
    }
  }
  let noOfDriversWithMoreThanOneVehicle = ($_$w(1, 20), 0);
  $_$w(1, 21),
    driverDetails.forEach(currentValue => {
      $_$wf(1);
      if (($_$w(1, 22), currentValue.vehicleID.length > 1)) {
        $_$w(1, 23), (noOfDriversWithMoreThanOneVehicle += 1);
      }
    });
  for (x of ($_$w(1, 24), allDriverDetails)) {
    $_$w(1, 25), drivers_trip.push(x);
  }
  return (
    $_$w(1, 26),
    res.reduce(
      (acc, cur) => {
        $_$wf(1);
        $_$w(1, 27),
          (acc.billedTotal = totalCash(cur.billedAmount, acc.billedTotal));
        if (($_$w(1, 28), cur.isCash)) {
          $_$w(1, 29), acc.noOfCashTrips++;
          $_$w(1, 30),
            (acc.cashBilledTotal = totalCash(
              cur.billedAmount,
              acc.cashBilledTotal,
            ));
        } else {
          $_$w(1, 31), acc.noOfNonCashTrips++;
          $_$w(1, 32),
            (acc.nonCashBilledTotal = totalCash(
              cur.billedAmount,
              acc.nonCashBilledTotal,
            ));
        }
        if (($_$w(1, 33), allDriverDetails.has(cur.driverID))) {
          let details = ($_$w(1, 34), allDriverDetails.get(cur.driverID));
          $_$w(1, 35), (details.noOfTrips += 1);
          $_$w(1, 36),
            (details.totalAmountEarned = totalCash(
              cur.billedAmount,
              details.totalAmountEarned,
            ));
          let sortedTrips = ($_$w(1, 37),
          [...allDriverDetails].sort((a, b) => {
            $_$wf(1);
            return $_$w(1, 38), b[1].noOfTrips - a[1].noOfTrips;
          }));
          let sortedtAmount = ($_$w(1, 39),
          [...allDriverDetails].sort((a, b) => {
            $_$wf(1);
            return $_$w(1, 40), b[1].totalAmountEarned - a[1].totalAmountEarned;
          }));
          let { name, email, phone, noOfTrips, totalAmountEarned } = ($_$w(
            1,
            41,
          ),
          sortedTrips[0][1]);
          $_$w(1, 42),
            (acc.mostTripsByDriver = {
              name,
              email,
              phone,
              noOfTrips,
              totalAmountEarned,
            });
          $_$w(1, 43),
            (acc.highestEarningDriver = {
              name: sortedtAmount[0][1].name,
              email: sortedtAmount[0][1].email,
              phone: sortedtAmount[0][1].phone,
              noOfTrips: sortedtAmount[0][1].noOfTrips,
              totalAmountEarned: sortedtAmount[0][1].totalAmountEarned,
            });
        }
        return $_$w(1, 44), acc;
      },
      {
        noOfCashTrips: 0,
        noOfNonCashTrips: 0,
        billedTotal: 0,
        cashBilledTotal: 0,
        nonCashBilledTotal: 0,
        noOfDriversWithMoreThanOneVehicle,
        mostTripsByDriver: {},
        highestEarningDriver: {},
      },
    )
  );
}
function toMoney(str) {
  $_$wf(1);
  $_$w(1, 45), (str = str.replace(',', ''));
  return $_$w(1, 46), Number(str);
}
function totalCash(bA, btot) {
  $_$wf(1);
  if (($_$w(1, 47), typeof bA === 'number')) {
    $_$w(1, 48), (btot += bA);
  } else {
    $_$w(1, 49), (btot += toMoney(bA));
  }
  $_$w(1, 50), (btot = btot.toFixed(2));
  return $_$w(1, 51), Number(btot);
}
$_$w(1, 52), (module.exports = analysis);
$_$wpe(1);
