import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Link,
  useRouteMatch,
} from 'react-router-dom';

import './App.css';

import Home from './container/Home';
import Comment from './container/Comment';

function App() {
  return (
    <Router>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/comment">
        <Comment />
      </Route>
    </Router>
  );
}

export default App;
