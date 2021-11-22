import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Header() {
  const { isLogged, setSignInRendering } = useContext(AppContext);
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
      {isLogged ? <div>Logged</div> : (
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
