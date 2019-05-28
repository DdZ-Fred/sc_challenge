import React from 'react';
import Typography from '@material-ui/core/Typography';

import classes from './SideBar.module.css';

function SideBar(props) {
  return (
    <div className={classes.root}>
      <Typography
        variant="h5"
        component="h5"
        gutterBottom
      >
        My favorite artists
      </Typography>
    </div>
  );
}

export default SideBar;
