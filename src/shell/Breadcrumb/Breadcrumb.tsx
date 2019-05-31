import * as React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import classes from './Breadcrumb.module.css';
import { IBreadcrumbEntry } from '../../store/breadcrumb';

interface BreadcrumbProps {

};

interface ConnectedBreadcrumbProps extends BreadcrumbProps{
  entries: IBreadcrumbEntry[],
};

const BreadcrumbEntry: React.SFC<IBreadcrumbEntry> = (props) => {
  if (props.to) {
    return (
      <Link component={RouterLink} to={props.to} className={classes.link}>
        {props.icon && <Icon>{props.icon}</Icon>}
        {props.label}
      </Link>
    );
  }
  return (
    <Typography color="textPrimary">{props.label}</Typography>
  );
}

export const Breadcrumb: React.SFC<ConnectedBreadcrumbProps> = (props) => {
  return (
    <div
      className={classes.root}
    >
      <Breadcrumbs aria-label="Breadcrumb" separator="›">
        <BreadcrumbEntry to="/" icon="home" label="Home"/>
        {props.entries.map((entry, idx) => {
          return (
            <BreadcrumbEntry
              key={`${idx+1}-${entry.label.toLowerCase()}`}
              {...entry}
            />
          )
        })}
      </Breadcrumbs>
    </div>
  );
}