import * as React from 'react';
import Link from '@material-ui/core/Link';
import classes from './Footer.module.css';

export const Footer: React.SFC<{}> = (props) => {
  return (
    <footer className={classes.root}>
      <span className={classes.copyright}>2019 © Design by</span>
      <Link
        color="inherit"
        href="https://github.com/DdZ-Fred"
        underline="hover"
      >
          Frederic REY
      </Link>
    </footer>
  );
}

