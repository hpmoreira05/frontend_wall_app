/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Posts from './pages/posts';
import MyPosts from './pages/myPosts';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/posts/mine" component={MyPosts} />
    </Switch>
  );
}

export default App;
