/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import DeletePostButton from './DeletePostButton';
import Ellipse from '../images/ellipse.svg';
import styles from '../styles/post.module.css';

function MyPost({ myPost }) {
  const {
    _id, title, description, createdAt, updatedAt,
  } = myPost;

  const history = useHistory();

  return (
    <div className={styles.post}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div>
          <button type="button" onClick={() => history.push({ pathname: '/updatepost', state: { myPost } })} className={styles.updateBttn}>Edit</button>
          <DeletePostButton id={_id} />
        </div>
      </div>
      <div className={styles.info}>
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

export default MyPost;
