import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apollo/client';
import ScProvider from './store/ScProvider';
import store from './store';
import Header from './shell/Header';
import SideBar from './shell/SideBar';
import MainContent from './pages/MainContent';
import Footer from './shell/Footer';

import classes from './App.module.css';


function App() {
  return (
    <ScProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <div className={classes.root}>
            <Header/>
            <div className={classes.container}>
              <SideBar/>
              <MainContent/>
            </div>
            <Footer/>
          </div>
        </Router>
      </ApolloProvider>
    </ScProvider>
  );
}

export default App;
