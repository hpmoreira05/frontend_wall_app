import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Universe from '../images/universe.svg';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import { validation } from '../service/api';

function PageNotFound() {
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
    }
  };

  useEffect(() => {
    userValidation();
  }, []);

  return (
    <div>
      <Header />
      <div className="notFoundComponents">
        <img src={Universe} alt="universe" />
        <div>We searched the entire universe and didn&apos;t find this page.</div>
        <button type="button" onClick={() => history.push('/posts')}>Back</button>
      </div>
    </div>
  );
}

export default PageNotFound;
