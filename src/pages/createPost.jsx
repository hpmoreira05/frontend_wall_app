import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../service/api';

function CreatePost() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const fetchCreatePost = async () => {
    setIsLoading(true);
    const response = await createPost(title, description);
    if (response.status === 201) {
      alert(response.message);
      setIsLoading(false);
      history.push('/posts');
      return;
    }
    setIsLoading(false);
    alert(`Error: ${response.status} - ${response.message}`);
    if (response.status === 401) {
      history.push('/');
    }
  };

  return (
    <div>
      <label htmlFor="title">
        Title
        <input
          type="text"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label htmlFor="description">
        Password
        <textarea
          rows="20"
          cols="100"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button
        type="button"
        onClick={() => fetchCreatePost()}
      >
        {isLoading ? 'Loading...' : 'Send'}
      </button>
    </div>
  );
}

export default CreatePost;
