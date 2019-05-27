import React from 'react';
import Title from 'antd/lib/typography/Title';
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
      <Title style={styles.title}>
        DdZ Artist Library
      </Title>
    </header>
  );
}

export default Header;
