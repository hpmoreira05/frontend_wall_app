/* eslint-disable react/jsx-filename-extension */
import React, { useContext } from 'react';
import Header from '../components/Header';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import AppContext from '../context/AppContext';
import MainImage from '../images/registerImg.svg';
import styles from '../styles/login.module.css';

function Login() {
  const { signInRendering } = useContext(AppContext);
  return (
    <div>
      <Header />
      <div className={styles.login}>
        <div className={styles.mainImage}>
          <img src={MainImage} alt="wall app mobile version" />
        </div>
        {signInRendering ? <SignIn /> : <Register />}
      </div>
    </div>
  );
}

export default Login;
