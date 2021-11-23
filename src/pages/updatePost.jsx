/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import NotLogged from '../components/NotLogged';
import EditPost from '../components/EditPost';

function UpdatePost(props) {
  const { isLogged } = useContext(AppContext);
  return (
    <div>
      {!isLogged ? <NotLogged /> : <EditPost props={props} />}
    </div>
  );
}

export default UpdatePost;
