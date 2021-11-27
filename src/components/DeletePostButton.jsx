/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { Spinner } from 'reactstrap';
import AppContext from '../context/AppContext';
import { deletePost } from '../service/api';
import styles from '../styles/post.module.css';

function DeletePostButton({ id }) {
  const {
    setUserPosts, userPosts, setDeletedPostMessage, setModalOpened,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDeletePost = async () => {
    const response = await deletePost(id);
    if (response.status === 200) {
      const newUserPosts = userPosts.filter(({ _id }) => _id !== id);
      setUserPosts(newUserPosts);
      setDeletedPostMessage(response.message);
      setModalOpened(true);
      setIsLoading(false);
      return;
    }
    setDeletedPostMessage(response.message);
    setModalOpened(true);
    setIsLoading(false);
  };

  return (
    <button className={styles.deleteBttn} type="button" onClick={() => fetchDeletePost()}>{isLoading ? <Spinner color="warning" /> : 'Delete'}</button>
  );
}

export default DeletePostButton;
