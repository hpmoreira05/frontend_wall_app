import React, { useState } from 'react';

function CreatePost() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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
      {title}
      {description}
      {/* <button
        type="button"
        disabled={verifyEmailAndPassword()}
        onClick={() => signIn()}
      >
        {loading ? 'Loading...' : 'Sign-In'}
      </button> */}
    </div>
  );
}

export default CreatePost;
