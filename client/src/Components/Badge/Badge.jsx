import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Chip from '@material-ui/core/Chip';
import './Badge.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ percentCash }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Chip
        label={`${percentCash}%`}
        icon={<TrendingUpIcon />}
        color="primary"
      />
    </div>
  );
}
