/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import styles from '../styles/modal.module.css';

function Modal({ message, redirect }) {
  const { setModalOpened, setSignInRendering } = useContext(AppContext);

  const history = useHistory();

  const modal = () => {
    setModalOpened(false);
    setSignInRendering(true);
    if (redirect) history.push(redirect);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondContainer}>
        <div className={styles.message}>{message}</div>
        <button type="button" onClick={() => modal()}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
