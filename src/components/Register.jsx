import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import { createUser } from '../service/api';
import Modal from './Modal';

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
      <div>
        <div>
          <h2>Register</h2>
          <button type="button" onClick={() => setSignInRendering(true)}>Sign-in</button>
          <label htmlFor="name">
            Name
            <input
              id="name"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              id="email"
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="confirmPassword">
            Re-enter password
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>
          { clicked && <div>{ error }</div> }
          <button type="submit" className="btnLogin" onClick={() => createAccount()}>
            {loading ? 'Loading...' : 'Create account'}
          </button>
        </div>
        {modalOpened ? <Modal message={message} /> : null}
      </div>
    </section>
  );
}

export default Register;
