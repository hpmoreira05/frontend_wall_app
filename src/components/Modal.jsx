/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function Modal({ message, redirect }) {
  const { setModalOpened, setSignInRendering } = useContext(AppContext);

  const history = useHistory();

  const modal = () => {
    setModalOpened(false);
    setSignInRendering(true);
    history.push(redirect);
  };

  return (
    <div>
      <div>{message}</div>
      <button type="button" onClick={() => modal()}>Close</button>
    </div>
  );
}

export default Modal;
