import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressBar.scss';

const ProgressBar = ({ value, color }) => {
  return (
    <div>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        className="progressBar"
        styles={buildStyles({
          pathColor: `${color}`,
          textColor: `${color}`,
        })}
      />
    </div>
  );
};

export default ProgressBar;
