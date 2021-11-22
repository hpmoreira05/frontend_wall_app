import React, { useState } from 'react';
import { login } from '../service/api';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
    const token = await login(email, password);
    console.log(token);
    if (token.status !== 200) {
      setError(token.message);
      return;
    }
    alert('Signed in successfully');
  };

  return (
    <section>
      <div>
        <div>
          <h2>Sign-In</h2>
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
            className="btnLogin"
            type="button"
            disabled={verifyEmailAndPassword()}
            onClick={() => signIn()}
          >
            Sign-In
          </button>
          {error && <div>{error}</div>}
        </div>
      </div>
    </section>
  );
}

export default SignIn;
