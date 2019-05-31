import React from 'react';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
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
      <Icon fontSize="large">library_music</Icon>
      <Typography
        variant="h4"
        component="h4"
        gutterBottom
        style={styles.title}
        title="pronounced 'DeeDeeZ Leeb'"
      >
        DdZ Lib
      </Typography>
    </header>
  );
}

export default Header;
