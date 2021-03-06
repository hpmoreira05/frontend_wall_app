/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Spinner } from 'reactstrap';
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

  const fetchUpdatePost = async (event) => {
    event.preventDefault();
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
      {isLoading ? (
        <div className="spinner">
          <Spinner color="primary" />
        </div>
      ) : (
        <form className={styles.container} onSubmit={fetchUpdatePost}>
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
              rows="10"
              cols="100"
              id="description"
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
          </label>
          <div className={styles.buttons}>
            <button className={styles.cancelBttn} type="button" onClick={() => history.push('/posts')}>Cancel</button>
            <button
              type="submit"
            >
              {isLoading ? 'Loading...' : 'Update'}
            </button>
          </div>
        </form>
      )}
      {modalOpened ? <Modal message={message} redirect={redirectTo} /> : null}
    </div>
  );
}

export default EditPost;
