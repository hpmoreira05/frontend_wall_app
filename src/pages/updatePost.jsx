/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { updatePost } from '../service/api';

function UpdatePost(props) {
  const { setIsLogged } = useContext(AppContext);
  const { location } = props;
  const { _id } = location.state.myPost;
  const [updatedTitle, setUpdatedTitle] = useState(location.state.myPost.title);
  const [updatedDescription, setUpdatedDescription] = useState(location.state.myPost.description);
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
    if (response.status === 401) {
      setIsLogged(false);
      history.push('/');
    }
  };

  return (
    <div>
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
          Password
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

export default UpdatePost;
