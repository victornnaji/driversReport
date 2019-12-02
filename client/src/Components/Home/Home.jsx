import React, { useContext, useEffect, useState } from 'react';
import './Home.scss';
import { HeadingContext } from '../Display/Display';
import Card from '../Card/Card';
import ProgressBar from '../CircularProgressBar/ProgressBar';
import IconVertical from '../VerticalIcon/IconVertical';
import BarChart from '../BarChart/BarChart';
import Chips from '../Badge/Badge';
import LinearProgress from '@material-ui/core/LinearProgress';
import LinearProgressBar from '../LinearProgress/LinearProgress';

const Home = () => {
  const { setHeading } = useContext(HeadingContext);
  const [total, setTotal] = useState('');
  const [gender, setGender] = useState({ male: '', female: '' });
  const [cash, setCash] = useState('');

  useEffect(() => {
    setHeading('Dashboard');
  }, [setHeading]);

  useEffect(() => {
    fetch('/api/stats')
      .then(data => {
        return data.json();
      })
      .then(data => {
        console.log(data.data);
        let datanew = data.data.billedTotal;
        setTotal(datanew);
        setGender({ male: data.data.male, female: data.data.female });
        setCash(data.data.cashBilledTotal);
      });
  }, []);

  let percentCash = ((cash / total) * 100).toFixed(1);

  return (
    <div className="home">
      <div className="home-submenu-cards-holder">
        <div className="row">
          <div className="col-lg-4">
            <Card height="20">
              <div className="card-item">
                <div className="flex-between">
                  <h2>Total Revenue</h2>
                  <IconVertical />
                </div>
                <div className="flex-between">
                  <ProgressBar value="66" color="#f05050" />
                  <div className="card-figure-holder">
                    <p className="money">
                      ₦
                      {Math.ceil(total)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p className="title">Revenues Today</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          <div className="col-lg-4">
            <Card height="20">
              <div className="card-item">
                <div className="flex-between">
                  <h2>Gender</h2>
                  <IconVertical />
                </div>
                <div className="chart-holder">
                  <BarChart
                    gradient="#10c469"
                    labels={['Men', 'Women']}
                    datasetLabel="Gender"
                    data={[gender.male, gender.female]}
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="col-lg-4">
            <Card height="20">
              <div className="card-item">
                <div className="flex-between">
                  <h2>Statistics</h2>
                  <IconVertical />
                </div>

                <div className="flex-between">
                  <Chips percentCash={percentCash} />
                  <div className="card-figure-holder">
                    <p className="money">
                      ₦
                      {Math.ceil(cash)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </p>
                    <p className="title">Cash Billed Today</p>
                  </div>
                </div>

                <div className="line">
                  <LinearProgressBar percentCash={percentCash} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
