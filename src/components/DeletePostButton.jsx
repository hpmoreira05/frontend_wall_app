/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';
import { deletePost } from '../service/api';

function DeletePostButton({ id }) {
  const { setUserPosts, userPosts } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeletePost = async () => {
    const response = await deletePost(id);
    if (response.status === 200) {
      const newUserPosts = userPosts.filter(({ _id }) => _id !== id);
      setUserPosts(newUserPosts);
      alert(response.message);
      setIsLoading(false);
      return;
    }
    alert(response.message);
    setIsLoading(false);
  };

  return (
    <button type="button" onClick={() => fetchDeletePost()}>{isLoading ? 'Loading...' : 'Delete'}</button>
  );
}

export default DeletePostButton;
