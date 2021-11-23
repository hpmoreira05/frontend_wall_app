/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import DeletePostButton from './DeletePostButton';

function MyPost({ myPost }) {
  const {
    _id, title, description, createdAt, editedAt,
  } = myPost;

  const history = useHistory();

  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{createdAt}</div>
      <div>{editedAt}</div>
      <button type="button" onClick={() => history.push({ pathname: '/updatepost', state: { myPost } })}>Edit</button>
      <DeletePostButton id={_id} />
    </div>
  );
}

export default MyPost;
