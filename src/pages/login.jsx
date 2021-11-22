import React, { useContext } from 'react';
import Header from '../components/Header';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import AppContext from '../context/AppContext';

function Login() {
  const { signInRendering } = useContext(AppContext);
  return (
    <div>
      <Header />
      {signInRendering ? <SignIn /> : <Register />}
    </div>
  );
}

export default Login;
