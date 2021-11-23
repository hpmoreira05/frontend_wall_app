import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import styles from '../styles/Header.module.css';
import Logo from '../images/logo.svg';
import userAvatar from '../images/userAvatar.svg';

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
    <div className={styles.header}>
      <img src={Logo} alt="logo" />
      {isLogged ? (
        <div className={styles.loggedHeader}>
          <div className={styles.container}>
            <div className={path === '/posts' ? styles.active : null}>
              <Link to="/posts" className={styles.link}>ALL POSTS</Link>
            </div>
            <div className={path === '/posts/mine' ? styles.active : null}>
              <Link to="/posts/mine">MY POSTS</Link>
            </div>
          </div>
          <div className={styles.container}>
            {path !== '/createpost' ? <button type="button" onClick={() => history.push('/createpost')}>Add new post</button> : null}
            <div className={styles.userInfo}>
              <img src={userAvatar} alt="user avatar" />
              <div>
                <div>{user}</div>
                <button type="button" onClick={() => logout()}>Sign out</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {path === '/posts' ? (
            <div>
              <button type="button" onClick={() => signIn()} className={styles.signIn}>Sign In</button>
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
