/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login';
import Posts from './pages/posts';
import MyPosts from './pages/myPosts';
import CreatePost from './pages/createPost';
import UpdatePost from './pages/updatePost';
import PageNotFound from './pages/pageNotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/posts/mine" component={MyPosts} />
      <Route exact path="/createpost" component={CreatePost} />
      <Route exact path="/updatepost" component={UpdatePost} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
