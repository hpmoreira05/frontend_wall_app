import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import AppContext from '../context/AppContext';
import { login } from '../service/api';

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
    console.log(token);
    if (token.status !== 200) {
      setError(token.message);
      setLoading(false);
      return;
    }
    localStorage.setItem('token', token.message);
    alert('Signed in successfully');
    setLoading(false);
    setIsLogged(true);
    setUser(email);
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  return (
    <section>
      <div>
        <div>
          <h2>Sign-In</h2>
          <button type="button" onClick={() => setSignInRendering(false)}>Sign-up</button>
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
          >
            {loading ? 'Loading...' : 'Sign-In'}
          </button>
          {error ? <div>{error}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default SignIn;
