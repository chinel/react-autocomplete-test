import React from 'react';
import './main.scss';
import { Route, Switch } from 'react-router-dom';
import SearchLocation from './search-location/search-location';
import homePage from './homePage';

function App() {
  return (
    <div className="wrapper">
      <Switch>
        <Route exact path="/" component={homePage}/>
        <Route  path="/demo/:id" component={SearchLocation}/>
        
      </Switch>
    
    </div>
  );
}

export default App;
