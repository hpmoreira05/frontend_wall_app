import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { getPostsByUser } from '../service/api';
import MyPost from '../components/MyPost';
import Header from '../components/Header';

function MyPosts() {
  const { userPosts, setUserPosts } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const fetchMyPosts = async () => {
    const response = await getPostsByUser();
    if (response.status === 200) {
      setUserPosts(response.posts);
      setIsLoading(false);
      return;
    }
    setError(response.posts.message);
    setIsLoading(false);
    alert(error);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div>
      <Header />
      {isLoading ? 'Loading...' : (
        <div>{userPosts.length > 0 ? userPosts.map((myPost) => <MyPost myPost={myPost} />) : 'There are no posts yet. Be the first one ;)'}</div>
      )}
    </div>
  );
}

export default MyPosts;
