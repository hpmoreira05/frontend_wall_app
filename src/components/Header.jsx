import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Header() {
  const {
    isLogged, setSignInRendering, user,
    setUser, setIsLogged, setUserPosts,
  } = useContext(AppContext);
  const history = useHistory();

  const path = history.location.pathname;

  const signIn = () => {
    setSignInRendering(true);
    history.push('/');
  };

  const signUp = () => {
    setSignInRendering(false);
    history.push('/');
  };

  const logout = () => {
    setUser('');
    setUserPosts([]);
    setIsLogged(false);
    localStorage.removeItem('token');
    history.push('/');
  };

  return (
    <div>
      {isLogged ? (
        <div>
          <Link to="/posts">ALL POSTS</Link>
          <button type="button" onClick={() => history.push('/posts/mine')}>MY POSTS</button>
          <button type="button" onClick={() => logout()}>Logout</button>
          {path !== '/createpost' ? <button type="button" onClick={() => history.push('/createpost')}>Add new post</button> : null}
          <div>{user}</div>
        </div>
      ) : (
        <div>
          {path === '/posts' ? (
            <div>
              <button type="button" onClick={() => signIn()}>Sign in</button>
              <button type="button" onClick={() => signUp()}>Sign up</button>
            </div>
          ) : (
            <div>
              <button type="button" onClick={() => history.push('/posts')}>Go to Posts</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
