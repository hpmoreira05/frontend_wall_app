import React from 'react';
import { useHistory } from 'react-router-dom';
import Universe from '../images/universe.svg';
import Header from '../components/Header';

function PageNotFound() {
  const history = useHistory();
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
