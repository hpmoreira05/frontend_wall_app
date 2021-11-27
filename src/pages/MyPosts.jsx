import React, { useContext, useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { getPostsByUser, validation } from '../service/api';
import MyPost from '../components/MyPost';
import Header from '../components/Header';
import Modal from '../components/Modal';
import NoPosts from '../images/noPosts.svg';
import styles from '../styles/post.module.css';

function MyPosts() {
  const {
    userPosts, setUserPosts, isLogged, modalOpened, deletedPostMessage, setUser, setIsLogged,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

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

  const fetchMyPosts = async () => {
    const response = await getPostsByUser();
    if (response.status === 200) {
      setUserPosts(response.posts);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    history.push('/unauthorized');
  };

  useEffect(() => {
    userValidation();
    fetchMyPosts();
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? (
        <div className="spinner">
          <Spinner color="primary" />
        </div>
      ) : (
        <div className={styles.allPosts}>
          {userPosts.length > 0 ? (
            <div>
              {userPosts.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                .map((myPost) => <MyPost key={myPost.createdAt} myPost={myPost} />)}
            </div>
          ) : (
            <div className="notFoundComponents">
              <img src={NoPosts} alt="spaceship" />
              <div>Were your posts abducted or don&apos;t you have any yet?</div>
              <div>What about starting now?</div>
              <button type="button" onClick={() => history.push('/createpost')}>Write my first post</button>
            </div>
          )}
          {modalOpened ? <Modal message={deletedPostMessage} /> : null}
        </div>
      )}
    </div>
  );
}

export default MyPosts;
