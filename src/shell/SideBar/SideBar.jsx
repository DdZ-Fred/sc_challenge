import React from 'react';
import Title from 'antd/lib/typography/Title';

import classes from './SideBar.module.css';

function SideBar(props) {
  return (
    <div className={classes.root}>
      <Title level={4}>
        My favorite artists
      </Title>
    </div>
  );
}

export default SideBar;
