/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';
import NotLogged from '../components/NotLogged';
import EditPost from '../components/EditPost';
import { validation } from '../service/api';

function UpdatePost(props) {
  const { isLogged, setUser, setIsLogged } = useContext(AppContext);

  const userValidation = async () => {
    if (!isLogged) {
      const response = await validation();
      if (response.status === 200) {
        setUser(response.message);
        setIsLogged(true);
        return;
      }
      setIsLogged(false);
    }
  };

  useEffect(() => {
    userValidation();
  }, []);

  return (
    <div>
      {!isLogged ? <NotLogged /> : <EditPost props={props} />}
    </div>
  );
}

export default UpdatePost;
