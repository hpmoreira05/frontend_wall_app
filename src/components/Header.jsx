import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Header() {
  const { isLogged, setSignInRendering, user } = useContext(AppContext);
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

  return (
    <div>
      {isLogged ? (
        <div>
          <Link to="/posts">ALL POSTS</Link>
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
