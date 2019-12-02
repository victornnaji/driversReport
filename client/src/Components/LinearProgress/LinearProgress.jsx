import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import './LinearProgress.scss';

export default function LinearProgressBar({ percentCash }) {
  return (
    <div>
      <LinearProgress
        variant="determinate"
        value={percentCash}
        color="secondary"
      />
    </div>
  );
}
