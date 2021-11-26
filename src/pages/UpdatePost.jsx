/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import EditPost from '../components/EditPost';
import { validation } from '../service/api';

function UpdatePost(props) {
  const { isLogged, setUser, setIsLogged } = useContext(AppContext);

  const history = useHistory();

  const userValidation = async () => {
    if (!isLogged) {
      const response = await validation();
      if (response.status === 200) {
        setUser(response.message);
        setIsLogged(true);
        return;
      }
      setIsLogged(false);
      history.push('/unauthorized');
    }
  };

  useEffect(() => {
    userValidation();
  }, []);

  return (
    <div>
      {isLogged ? <EditPost props={props} /> : null}
    </div>
  );
}

export default UpdatePost;
