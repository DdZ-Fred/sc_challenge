import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Home from './Home';
import ArtistDetails from './ArtistDetails'
import BadRoute from './BadRoute';
import Breadcrumb from '../shell/Breadcrumb';
import classes from './MainContent.module.css';

const StyledDivider = withStyles({
  root: {
    margin: '15px 0 15px 0'
  }
})(Divider);

class MainContent extends React.PureComponent {
  render() {
    return (
      <main className={classes.root}>
        <Breadcrumb/>
        <StyledDivider
          variant="middle"
        />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/artists/:mbid" component={ArtistDetails}/>
          <Route path="*" component={BadRoute}/>
        </Switch>
      </main>
    );
  }
}

export default MainContent;
