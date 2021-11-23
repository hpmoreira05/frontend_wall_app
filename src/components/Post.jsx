/* eslint-disable react/prop-types */
import React from 'react';

function Post({ post }) {
  const {
    title, description, createdAt, userId, updatedAt,
  } = post;

  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>
        Created at:
        {createdAt}
      </div>
      <div>
        Created by:
        {' '}
        {userId}
      </div>
      {updatedAt ? (
        <div>
          Updated at:
          {updatedAt}
        </div>
      ) : null}
    </div>
  );
}

export default Post;
