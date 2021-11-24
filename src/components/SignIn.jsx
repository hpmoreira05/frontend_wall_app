import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { login } from '../service/api';
import styles from '../styles/login.module.css';
import Warning from '../images/warning.svg';

function SignIn() {
  const { setSignInRendering, setIsLogged, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const verifyEmail = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    if (reg) {
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
        {loading ? (
          <div className={styles.spinner}>
            <Spinner color="primary" />
          </div>
        ) : null}
        {error ? (
          <div className="error">
            <img src={Warning} alt="warning icon" />
            <div>{ error }</div>
          </div>
        ) : null}
        <button
          type="button"
          disabled={verifyEmail()}
          onClick={() => signIn()}
          className={styles.signInBttn}
        >
          Sign-In
        </button>
        <span>
          Dont have an account yet?
          {' '}
          <button type="button" onClick={() => setSignInRendering(false)} className={styles.signUpBttn}>Sign-up</button>
        </span>
      </div>
    </section>
  );
}

export default SignIn;
