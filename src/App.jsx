/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Posts from './pages/Posts';
import MyPosts from './pages/MyPosts';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PageNotFound from './pages/PageNotFound';
import Unauthorized from './pages/Unauthorized';
import './styles/index.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/posts/mine" component={MyPosts} />
      <Route exact path="/createpost" component={CreatePost} />
      <Route exact path="/updatepost" component={UpdatePost} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
