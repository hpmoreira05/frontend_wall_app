import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { getPostsByUser } from '../service/api';
import MyPost from '../components/MyPost';
import Header from '../components/Header';
import NotLogged from '../components/NotLogged';
import Modal from '../components/Modal';

function MyPosts() {
  const {
    userPosts, setUserPosts, isLogged, modalOpened, deletedPostMessage,
  } = useContext(AppContext);
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
                <div>
                  {userPosts.map((myPost) => <MyPost key={myPost.createdAt} myPost={myPost} />)}
                </div>
              ) : 'There are no posts yet. What about getting start? ;)'}
              {modalOpened ? <Modal message={deletedPostMessage} /> : null}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default MyPosts;
