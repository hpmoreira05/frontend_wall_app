import React from 'react';
import { useHistory } from 'react-router-dom';

function PageNotFound() {
  const history = useHistory();
  return (
    <div>
      <div>404 - Page not found</div>
      <button type="button" onClick={() => history.push('/posts')}>Back</button>
    </div>
  );
}

export default PageNotFound;
