/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [signInRendering, setSignInRendering] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLogged, setIsLogged] = useState(false);

  const contextValue = {
    signInRendering,
    setSignInRendering,
    posts,
    setPosts,
    isLogged,
    setIsLogged,
  };

  return (
    <AppContext.Provider value={contextValue}>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
