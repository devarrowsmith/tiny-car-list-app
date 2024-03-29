import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';
import Navbar from './Navbar/Navbar';
import SplashPage from './SplashPage';
import FeaturedListing from './FeaturedListing';
import AllListings from './AllListings';
import NewListing from './NewListing';
import getListings from '../controllers/listingsController';
import buzzwords from '../assets/buzzwords';

const App = () => {
  const [listingsState, setListingsState] = useState([]);
  const [selectedState, setSelectedState] = useState(0);
  const [buzzState, setBuzzState] = useState(['fabulous', 'auto']);

  const setBuzz = () => {
    setBuzzState([
      buzzwords.buzzOne[Math.floor(Math.random() * buzzwords.buzzOne.length)],
      buzzwords.buzzTwo[Math.floor(Math.random() * buzzwords.buzzTwo.length)],
    ]);
  };

  const setSelected = (data) => {
    const selectedIndex = Math.floor(Math.random() * data.length);
    setSelectedState(selectedIndex);
  };

  const setListings = async () => {
    const res = await getListings();
    await setListingsState(res.data);
    await setSelected(res.data);
  };

  useEffect(() => {
    setListings();
    setBuzz();
  }, []);

  return (
    <Router>
      <GlobalStyles />

      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <SplashPage
              selectedListing={listingsState[selectedState]}
              buzzState={buzzState}
            />
          )}
        />
        <Route
          exact
          path="/Listing"
          component={() => (
            <FeaturedListing selectedListing={listingsState[selectedState]} />
          )}
        />
        <Route
          exact
          path="/AllListings"
          component={() => <AllListings listings={listingsState} />}
        />
        <Route exact path="/NewListing" component={() => <NewListing />} />
      </Switch>
      <Navbar />
    </Router>
  );
};

export default App;
