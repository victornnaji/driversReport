import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import './Display.scss';
import Trips from '../Trips/Trips';

export const HeadingContext = React.createContext();

const Display = () => {
  const [heading, setHeading] = useState('Dashboard');
  return (
    <div className="display-container">
      <div className="heading-container">
        <div className="header">{heading}</div>
      </div>
      <HeadingContext.Provider value={{ heading, setHeading }}>
        <div className="display-items">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/trips" component={Trips} />
          </Switch>
        </div>
      </HeadingContext.Provider>
    </div>
  );
};

export default Display;
