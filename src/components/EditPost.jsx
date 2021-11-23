/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { updatePost } from '../service/api';
import Header from './Header';

function EditPost({ props }) {
  const { location } = props;
  const { _id } = location.state.myPost;
  const [updatedTitle, setUpdatedTitle] = useState(location.state.myPost.title);
  const [updatedDescription,
    setUpdatedDescription] = useState(location.state.myPost.description);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const fetchUpdatePost = async () => {
    const response = await updatePost(updatedTitle, updatedDescription, _id);
    console.log(response);
    if (response.status === 200) {
      alert(response.message);
      setIsLoading(false);
      history.push('/posts');
      return;
    }
    setIsLoading(false);
    alert(`Error: ${response.status} - ${response.message}`);
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
    </div>
  );
}

export default EditPost;
