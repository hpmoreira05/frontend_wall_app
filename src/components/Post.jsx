/* eslint-disable react/prop-types */
import React from 'react';

function Post({ post }) {
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.description}</div>
      <div>{post.createdAt}</div>
      <div>{post.userId}</div>
      <div>{post.editedAt}</div>
    </div>
  );
}

export default Post;
