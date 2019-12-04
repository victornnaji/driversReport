import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import { DataGrid, ToolbarOptions } from 'tubular-react';
import { ColumnModel } from 'tubular-common';

import './Table.scss';
import Loader from '../Loader/Loader';

const columns = [
  new ColumnModel('id'),
  new ColumnModel(`driversName`, {
    Label: 'Driver',
    Searchable: true,
  }),
  new ColumnModel('customer'),
  new ColumnModel('amount'),
  new ColumnModel('date'),
  new ColumnModel('pickup'),
  new ColumnModel('destination'),
];

const toolbarOptions = new ToolbarOptions({
  advancePagination: false,
  bottomPager: true,
  exportButton: false,
  printButton: false,
  searchText: true,
  topPager: false,
});

const Tables = () => {
  const [trips, setTrips] = useState([]);
  const [driver, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrips = async () => {
      let res = await fetch(`api/trips`);
      return res;
    };

    getTrips()
      .then(data => data.json())
      .then(res => {
        let data = res.data;
        setTrips(data);
      });
  }, []);

  useEffect(() => {
    const getTrips = async () => {
      let res = await fetch(`api/drivers`);
      return res;
    };
    getTrips()
      .then(data => data.json())
      .then(res => {
        let data = res.data;
        setDriver(data);
        setLoading(false);
      });
  }, []);

  let newTrip = [];

  trips.pop();
  trips.forEach((trip, index) => {
    let ch = driver.filter(x => trip.driverID === x.driverID)[0];

    try {
      ch = ch.name;
    } catch (err) {
      console.log(err);
    }
    newTrip.push({
      id: index + 1,
      driversName: ch,
      customer: trip.user.name,
      amount: trip.billedAmount,
      date: trip.created.split('T')[0],
      pickup: trip.pickup.address,
      destination: trip.destination.address,
    });
  });

  console.log(newTrip);
  return (
    <>
      {loading ? (
        <div className="loader-holder">
          <Loader />
        </div>
      ) : (
        <Card height={80}>
          <div className="table-holder">
            <DataGrid
              columns={columns}
              dataSource={newTrip}
              gridName="Drivers"
              toolbarOptions={toolbarOptions}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default Tables;
