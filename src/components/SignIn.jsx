import React, { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  const verifyEmailAndPassword = () => {
    const reg = /\S+@\S+\.\S+/
      .test(email);
    const minLenght = 6;
    if (reg && password.length >= minLenght) {
      return false;
    }
    return true;
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
            // onClick={() => login()}
          >
            Sign-In
          </button>
        </div>
      </div>
    </section>
  );
}

export default SignIn;
