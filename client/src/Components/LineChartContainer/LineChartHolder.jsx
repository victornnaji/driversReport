import React, { useEffect, useState } from 'react';
import IconVertical from '../VerticalIcon/IconVertical';
import './LineChart.scss';
import BarChart from '../BarChart/BarChart';

const LineChartHolder = () => {
  const [price, setPrice] = useState({ total: '', cash: '', app: '' });
  useEffect(() => {
    fetch('/api/stats')
      .then(data => data.json())
      .then(res => {
        console.log(res);
        let data = res.data;
        setPrice({
          total: data.billedTotal,
          cash: data.cashBilledTotal,
          app: data.nonCashBilledTotal,
        });
      });
  }, []);

  return (
    <div className="linechart-holder">
      <div className="flex-between">
        <h2>Cash Inflow</h2>
        <IconVertical />
      </div>
      <div className="chartline">
        <BarChart
          gradient="#8965e0"
          bg="transparent"
          labels={['Total', 'Cash', 'App']}
          datasetLabel="Gender"
          data={[price.total, price.cash, price.app]}
        />
      </div>
    </div>
  );
};

export default LineChartHolder;
