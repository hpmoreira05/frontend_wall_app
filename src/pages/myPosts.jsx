import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { getPostsByUser } from '../service/api';
import MyPost from '../components/MyPost';
import Header from '../components/Header';
import NotLogged from '../components/NotLogged';

function MyPosts() {
  const { userPosts, setUserPosts, isLogged } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyPosts = async () => {
    const response = await getPostsByUser();
    if (response.status === 200) {
      setUserPosts(response.posts);
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    alert(`Error: ${response.status} - ${response.posts.message}`);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div>
      {!isLogged ? <NotLogged /> : (
        <>
          <Header />
          {isLoading ? 'Loading...' : (
            <div>
              {userPosts.length > 0 ? (
                userPosts.map((myPost) => <MyPost key={myPost.createdAt} myPost={myPost} />)
              ) : 'There are no posts yet. What about getting start? ;)'}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyPosts;
