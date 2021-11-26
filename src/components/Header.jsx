import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import styles from '../styles/Header.module.css';
import Logo from '../images/logo.svg';
import userAvatar from '../images/userAvatar.svg';
import SanduichButton from '../images/sanduich.svg';
import CloseButton from '../images/close.svg';

function Header() {
  const {
    isLogged, setSignInRendering, user,
    setUser, setIsLogged, setUserPosts,
  } = useContext(AppContext);
  const history = useHistory();
  const [isOpened, setIsOpened] = useState(false);

  const path = history.location.pathname;

  const signIn = () => {
    setSignInRendering(true);
    setIsOpened(false);
    history.push('/');
  };

  const signUp = () => {
    setSignInRendering(false);
    setIsOpened(false);
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
    <>
      <div className={styles.header}>
        <Link to="/posts">
          <img src={Logo} alt="logo" />
        </Link>
        {isLogged ? (
          <>
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
            <div>
              <button type="button" className={styles.sanduichBttn} onClick={() => setIsOpened(!isOpened)}>
                <img src={isOpened ? CloseButton : SanduichButton} alt="mobile menu" />
              </button>
            </div>

          </>
        ) : (
          <div>
            {path === '/posts' ? (
              <>
                <div className={styles.notLoggeBttns}>
                  <button type="button" onClick={() => signIn()} className={styles.signIn}>Sign In</button>
                  <button type="button" onClick={() => signUp()}>Sign up</button>
                </div>
                <button type="button" className={styles.sanduichBttn} onClick={() => setIsOpened(!isOpened)}>
                  <img src={isOpened ? CloseButton : SanduichButton} alt="mobile menu" />
                </button>
              </>
            ) : (
              <>
                <div className={styles.notLoggeBttns}>
                  <button type="button" onClick={() => history.push('/posts')}>Go to Posts</button>
                </div>
                <button type="button" className={styles.sanduichBttn} onClick={() => setIsOpened(!isOpened)}>
                  <img src={isOpened ? CloseButton : SanduichButton} alt="mobile menu" />
                </button>
              </>
            )}
          </div>
        )}
      </div>
      {
        isOpened ? (
          <div>
            {!isLogged ? (
              <div className={styles.mobile}>
                <Link to="/posts" className={styles.link}>All posts</Link>
                <hr className={styles.divider} />
                <button type="button" onClick={() => signIn()} className={styles.signIn}>Sign In</button>
                <button type="button" onClick={() => signUp()}>Sign up</button>
              </div>
            ) : (
              <div className={styles.mobile}>
                <div>
                  <img src={userAvatar} alt="user avatar" />
                  <span>{user}</span>
                </div>
                <Link to="/posts" className={styles.link}>All posts</Link>
                <Link to="/posts/mine">My posts</Link>
                {path !== '/createpost' ? <button type="button" onClick={() => history.push('/createpost')}>Add new post</button> : null}
                <hr className={styles.divider} />
                <button type="button" onClick={() => logout()}>Sign out</button>
              </div>
            )}
          </div>

        ) : null
      }
    </>
  );
}

export default Header;
