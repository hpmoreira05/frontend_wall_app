import React from 'react';
import { useHistory } from 'react-router-dom';

function NotLogged() {
  const history = useHistory();

  return (
    <div>
      <div>User not logged</div>
      <button type="button" onClick={() => history.push('/')}>Sign-in</button>
    </div>
  );
}

export default NotLogged;
