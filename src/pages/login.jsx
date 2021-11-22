import React, { useContext } from 'react';
import Register from '../components/Register';
import SignIn from '../components/SignIn';
import AppContext from '../context/AppContext';

function Login() {
  const { signInRendering } = useContext(AppContext);
  return (
    <div>
      {signInRendering ? <SignIn /> : <Register />}
    </div>
  );
}

export default Login;
