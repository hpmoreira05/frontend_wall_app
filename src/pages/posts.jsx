import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Post from '../components/Post';
import AppContext from '../context/AppContext';
import { getAllPosts } from '../service/api';
import NoPostsAll from '../images/noPostsAll.svg';

function Posts() {
  const { setPosts, posts } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const history = useHistory();

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
    fetchPosts();
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? 'Loading...' : (
        <div>
          {posts.length > 0 ? posts.map((post) => <Post key={post.createdAt} post={post} />) : (
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
