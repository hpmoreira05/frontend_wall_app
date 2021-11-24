import React, { useState, useEffect, useContext } from 'react';
import { Spinner } from 'reactstrap';
import AppContext from '../context/AppContext';
import { createUser } from '../service/api';
import Modal from './Modal';
import styles from '../styles/login.module.css';

function Register() {
  const { setSignInRendering, setModalOpened, modalOpened } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const verifyName = () => {
    if (name === '') {
      setError('Name is required');
      return false;
    }
    return true;
  };

  const verifyEmail = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    if (email === '') {
      setError('Email is required');
      return false;
    }
    if (!reg) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const verifyPassword = () => {
    if (password === '') {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Passwords must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match');
      return false;
    }
    return true;
  };

  const createAccount = async () => {
    setClicked(true);
    if (!verifyName()) return;
    if (!verifyEmail()) return;
    if (!verifyPassword()) return;
    setLoading(true);
    const fetchCreateUser = await createUser(name, email, password);
    if (fetchCreateUser.status !== 201) {
      setError(fetchCreateUser.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setMessage(fetchCreateUser.message);
    setModalOpened(true);
  };

  useEffect(() => {
    setClicked(false);
    setError('');
  }, [name, email, password, confirmPassword]);

  return (
    <section>
      <div className={styles.form}>
        <h2>Create your account</h2>
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          Re-enter password
          <input
            id="confirmPassword"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        { clicked && <div className={styles.error}>{ error }</div> }
        {loading ? (
          <div className={styles.spinner}>
            <Spinner color="primary" />
          </div>
        ) : null}
        <button type="submit" className={styles.createAccBttn} onClick={() => createAccount()}>
          Create account
        </button>
        <span>
          Already have an account?
          {' '}
          <button type="button" onClick={() => setSignInRendering(true)} className={styles.signUpBttn}>Sign-in</button>
        </span>
        {modalOpened ? <Modal message={message} /> : null}
      </div>
    </section>
  );
}

export default Register;
