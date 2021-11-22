import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';
import { createUser } from '../service/api';

function Register() {
  const { setSignInRendering } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(false);

  const verifyName = () => {
    if (name === '') {
      setError('Name is required');
    }
  };

  const verifyEmail = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    if (email === '') {
      setError('Email is required');
      return;
    }
    if (!reg) {
      setError('Invalid email format');
    }
  };

  const verifyPassword = () => {
    if (password === '') {
      setError('Password is required');
      return;
    }
    if (password.length < 6) {
      setError('Passwords must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords must match');
    }
  };

  const createAccount = async () => {
    setClicked(true);
    setLoading(true);
    const fetchCreateUser = await createUser(name, email, password);
    if (fetchCreateUser.status !== 201) {
      setError(fetchCreateUser.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    alert(fetchCreateUser.message);
    setSignInRendering(true);
  };

  useEffect(() => {
    setClicked(false);
    setError('');
    verifyPassword();
    verifyEmail();
    verifyName();
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
      </div>
    </section>
  );
}

export default Register;
