/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function UpdatePost(props) {
  const { location } = props;
  const [updatedTitle, setUpdatedTitle] = useState(location.state.myPost.title);
  const [updatedDescription, setUpdatedDescription] = useState(location.state.myPost.description);

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
        {/* <button
          type="button"
          onClick={() => fetchCreatePost()}
        >
          {isLoading ? 'Loading...' : 'Send'}
        </button>
        <button type="button" onClick={() => history.push('/posts')}>Cancel</button> */}
      </div>
    </div>
  );
}

export default UpdatePost;
