/* eslint-disable react/prop-types */
import React from 'react';
import Ellipse from '../images/ellipse.svg';
import styles from '../styles/Post.module.css';

function Post({ post }) {
  const {
    title, description, createdAt, name, updatedAt,
  } = post;

  return (
    <div className={styles.post}>
      <div className={styles.title}>{title}</div>
      <div className={styles.info}>
        <div>
          Created by:
          {' '}
          <span>{name}</span>
        </div>
        <img src={Ellipse} alt="ellipse icon" />
        <div>
          Created at:
          {' '}
          <span>{createdAt}</span>
        </div>
        {updatedAt ? (
          <>
            <img src={Ellipse} alt="ellipse icon" />
            <div>
              Updated at:
              {' '}
              <span>{updatedAt}</span>
            </div>
          </>
        ) : null}
      </div>
      <div className={styles.description}>{description}</div>
      <div className={styles.divider} />
    </div>
  );
}

export default Post;
