import React from 'react';
import Typography from '@material-ui/core/Typography';
import classes from './Header.module.css';

const styles = {
  title: {
    margin: '0',
    padding: '0',
  }
};

function Header(props) {
  return (
    <header className={classes.root}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        style={styles.title}
      >
        DdZ Artist Library
      </Typography>
    </header>
  );
}

export default Header;
