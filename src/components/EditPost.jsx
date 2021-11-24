/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { updatePost } from '../service/api';
import Header from './Header';
import Modal from './Modal';
import styles from '../styles/createAndUpdatePost.module.css';

function EditPost({ props }) {
  const { modalOpened, setModalOpened, setIsLogged } = useContext(AppContext);
  const { location } = props;
  const { _id } = location.state.myPost;
  const [updatedTitle, setUpdatedTitle] = useState(location.state.myPost.title);
  const [updatedDescription,
    setUpdatedDescription] = useState(location.state.myPost.description);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [redirectTo, setRedirectTo] = useState('');

  const history = useHistory();

  const fetchUpdatePost = async () => {
    const response = await updatePost(updatedTitle, updatedDescription, _id);
    if (response.status === 200) {
      setMessage(response.message);
      setRedirectTo('/posts');
      setModalOpened(true);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setMessage(response.message);
    setRedirectTo('');
    setModalOpened(true);
    if (response.status === 401) {
      setRedirectTo('/');
      setIsLogged(false);
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <label htmlFor="title">
          Title
          <input
            value={updatedTitle}
            type="text"
            id="title"
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            value={updatedDescription}
            rows="20"
            cols="100"
            id="description"
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
        </label>
        <div className={styles.buttons}>
          <button className={styles.cancelBttn} type="button" onClick={() => history.push('/posts')}>Cancel</button>
          <button
            type="button"
            onClick={() => fetchUpdatePost()}
          >
            {isLoading ? 'Loading...' : 'Update'}
          </button>
        </div>
      </div>
      {modalOpened ? <Modal message={message} redirect={redirectTo} /> : null}
    </div>
  );
}

export default EditPost;
