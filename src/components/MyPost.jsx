/* eslint-disable react/prop-types */
import React from 'react';
import DeletePostButton from './DeletePostButton';

function MyPost({ myPost }) {
  const {
    _id, title, description, createdAt, editedAt,
  } = myPost;
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{createdAt}</div>
      <div>{editedAt}</div>
      <button type="button">Edit</button>
      <DeletePostButton id={_id} />
    </div>
  );
}

export default MyPost;
