import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Home from './Home';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import AnimalsContainer from './AnimalsContainer';
import PostAnimalContainer from './PostAnimalContainer';
import EditAnimalContainer from './EditAnimalContainer';

ReactDOM.render(
  <Router history={hashHistory} >
  <Route path='/' component={App}>
    <IndexRoute component={Home}/>
    <Route path='/animals' component={AnimalsContainer}/>
    <Route path='/post' component={PostAnimalContainer}/>
    <Route path='/edit/:animalId' component={EditAnimalContainer}/>
    </Route>
  </Router>,
  document.getElementById('root')
);
