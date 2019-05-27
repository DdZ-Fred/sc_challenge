import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import ArtistDetails from './ArtistDetails'
import BadRoute from './BadRoute';
import classes from './MainContent.module.css';

class MainContent extends React.PureComponent {
  render() {
    return (
      <main className={classes.root}>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/artist/:id" component={ArtistDetails}/>
          <Route path="*" component={BadRoute}/>
        </Switch>
      </main>
    );
  }
}

export default MainContent;
