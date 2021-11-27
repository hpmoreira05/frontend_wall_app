import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Header from '../components/Header';
import Post from '../components/Post';
import AppContext from '../context/AppContext';
import { getAllPosts, validation } from '../service/api';
import NoPostsAll from '../images/noPostsAll.svg';
import styles from '../styles/post.module.css';

function Posts() {
  const {
    setPosts, posts, isLogged, setUser, setIsLogged,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();

  const userValidation = async () => {
    const token = localStorage.getItem('token');
    if (!isLogged && token) {
      const response = await validation();
      if (response.status === 200) {
        setUser(response.message);
        setIsLogged(true);
        return;
      }
      setIsLogged(false);
    }
  };

  const fetchPosts = async () => {
    const response = await getAllPosts();
    if (response.status === 200) {
      setPosts(response.posts);
      setIsLoading(false);
      return;
    }
    setError(response);
    setIsLoading(false);
  };

  useEffect(() => {
    userValidation();
    fetchPosts();
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
          {posts.length > 0 ? posts
            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
            .map((post) => <Post key={post.createdAt} post={post} />) : (
              <div className="notFoundComponents">
                <img src={NoPostsAll} alt="trees" />
                <div>There is no posts yet, but you can create the first one.</div>
                <div>Don&apos;t hide yourself, share your thoughts and knowledge with us!</div>
                <button type="button" onClick={() => history.push('/createpost')}>Write my first post</button>
              </div>
          )}

        </div>
      )}
      <div>{error ? { error } : null}</div>
    </div>
  );
}

export default Posts;
