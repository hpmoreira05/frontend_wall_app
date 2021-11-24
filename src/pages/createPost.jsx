import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { createPost } from '../service/api';
import Header from '../components/Header';
import NotLogged from '../components/NotLogged';
import Modal from '../components/Modal';
import styles from '../styles/createAndUpdatePost.module.css';

function CreatePost() {
  const {
    setIsLogged, isLogged, modalOpened, setModalOpened,
  } = useContext(AppContext);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [redirectTo, setRedirectTo] = useState('');

  const history = useHistory();

  const fetchCreatePost = async () => {
    setIsLoading(true);
    const response = await createPost(title, description);
    if (response.status === 201) {
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
      {!isLogged ? <NotLogged /> : (
        <>
          <Header />
          <div className={styles.container}>
            <label htmlFor="title">
              Title
              <input
                type="text"
                id="title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                rows="20"
                cols="100"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <div className={styles.buttons}>
              <button className={styles.cancelBttn} type="button" onClick={() => history.push('/posts')}>Cancel</button>
              <button
                type="button"
                onClick={() => fetchCreatePost()}
              >
                {isLoading ? 'Loading...' : 'Send'}
              </button>
            </div>
            {modalOpened ? <Modal message={message} redirect={redirectTo} /> : null}
          </div>
        </>
      )}
    </div>
  );
}

export default CreatePost;
