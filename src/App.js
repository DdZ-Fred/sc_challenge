import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './shell/Header';
import SideBar from './shell/SideBar';
import MainContent from './pages/MainContent';
import Footer from './shell/Footer';

import classes from './App.module.css';


function App() {
  return (
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
  );
}

export default App;
