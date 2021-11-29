/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [signInRendering, setSignInRendering] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [deletedPostMessage, setDeletedPostMessage] = useState(false);

  const contextValue = {
    signInRendering,
    setSignInRendering,
    posts,
    setPosts,
    isLogged,
    setIsLogged,
    user,
    setUser,
    userPosts,
    setUserPosts,
    modalOpened,
    setModalOpened,
    deletedPostMessage,
    setDeletedPostMessage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  );
}

export default AppProvider;
