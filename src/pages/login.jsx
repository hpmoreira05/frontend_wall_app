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
        <img src={MainImage} alt="wall app mobile version" />
        {signInRendering ? <SignIn /> : <Register />}
      </div>
    </div>
  );
}

export default Login;
