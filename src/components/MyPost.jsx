/* eslint-disable react/prop-types */
import React from 'react';

function MyPost({ myPost }) {
  return (
    <div>
      <div>{myPost.title}</div>
      <div>{myPost.description}</div>
      <div>{myPost.createdAt}</div>
      <div>{myPost.editedAt}</div>
      <button type="button">Edit</button>
      <button type="button">Delete</button>
    </div>
  );
}

export default MyPost;
