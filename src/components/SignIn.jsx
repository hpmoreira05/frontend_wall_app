import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { login } from '../service/api';
import styles from '../styles/login.module.css';

function SignIn() {
  const { setSignInRendering, setIsLogged, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const verifyEmailAndPassword = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    const minLenght = 6;
    if (reg && password.length >= minLenght) {
      return false;
    }
    return true;
  };

  const signIn = async () => {
    setLoading(true);
    const token = await login(email, password);
    if (token.status !== 200) {
      setError(token.message);
      setLoading(false);
      return;
    }
    localStorage.setItem('token', token.message);
    setLoading(false);
    setIsLogged(true);
    setUser(email);
    history.push('/posts');
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  return (
    <section>
      <div className={styles.form}>
        <h2>Welcome back</h2>
        <label htmlFor="emailLogin">
          E-mail
          <input
            type="email"
            id="emailLogin"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="passwordLogin">
          Password
          <input
            type="password"
            id="passwordLogin"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button
          type="button"
          disabled={verifyEmailAndPassword()}
          onClick={() => signIn()}
          className={styles.signInBttn}
        >
          {loading ? 'Loading...' : 'Sign-In'}
        </button>
        <span>
          Dont have an account yet?
          {' '}
          <button type="button" onClick={() => setSignInRendering(false)} className={styles.signUpBttn}>Sign-up</button>
        </span>
        {error ? <div>{error}</div> : null}
      </div>
    </section>
  );
}

export default SignIn;
