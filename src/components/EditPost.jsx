/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { updatePost } from '../service/api';
import Header from './Header';
import Modal from './Modal';

function EditPost({ props }) {
  const { modalOpened, setModalOpened } = useContext(AppContext);
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
    setMessage(`Error: ${response.status} - ${response.message}`);
    setRedirectTo('');
    setModalOpened(true);
  };

  return (
    <div>
      <Header />
      <div>
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
        <button
          type="button"
          onClick={() => fetchUpdatePost()}
        >
          {isLoading ? 'Loading...' : 'Update'}
        </button>
        <button type="button" onClick={() => history.push('/posts')}>Cancel</button>
      </div>
      {modalOpened ? <Modal message={message} redirect={redirectTo} /> : null}
    </div>
  );
}

export default EditPost;
