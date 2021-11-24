import React from 'react';
import { useHistory } from 'react-router-dom';
import NotLoggedImg from '../images/notLogged.svg';
import Header from './Header';

function NotLogged() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <div className="notFoundComponents">
        <img src={NotLoggedImg} alt="not logged" />
        <div>You need to sign in to access this page.</div>
        <button type="button" onClick={() => history.push('/')}>Back</button>
      </div>
    </div>
  );
}

export default NotLogged;
