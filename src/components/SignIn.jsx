import React from 'react';

function SignIn() {
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
              // onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="passwordLogin">
            Password
            <input
              type="password"
              id="passwordLogin"
              // onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            className="btnLogin"
            type="button"
            // disabled={verifyEmailAndPassword()}
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
