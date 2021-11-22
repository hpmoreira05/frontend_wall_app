import React, { useContext, useEffect, useState } from 'react';
import Post from '../components/Post';
import AppContext from '../context/AppContext';
import { getAllPosts } from '../service/api';

function Posts() {
  const { setPosts, posts } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    const response = await getAllPosts();
    if (response.status === 200) {
      console.log(response.posts);
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
      {isLoading ? 'Loading...' : (
        <div>{posts.length > 0 ? posts.map((post) => <Post post={post} />) : 'There are no posts yet. Be the first one ;)'}</div>
      )}
      <div>{error ? { error } : null}</div>
    </div>
  );
}

export default Posts;
