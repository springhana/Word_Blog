'use client';

import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcLikePlaceholder } from '@react-icons/all-files/fc/FcLikePlaceholder';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { useLike } from '@/hook/useLike';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Card.module.css';

export default function Like({ id }: { id: string | ObjectId }) {
  const user = useAppSelector(state => state.idReducer.id);

  const { loading, error, like, hasMore } = useLike(id, 'id', user) as {
    loading: boolean;
    error: boolean;
    like: { result: number; like: boolean };
    hasMore: boolean;
  };
  const [likeLength, setLikeLength] = useState(0);
  const [isLike, setIsLike] = useState(false);

  const LikeEvent = async () => {
    try {
      await axios.post('/api/like', { id: id, user: user }).then(res => {
        if (res.data.post) {
          if (isLike) {
            setIsLike(false);
            if (likeLength > 0) {
              setLikeLength(likeLength - 1);
            }
          } else {
            setIsLike(true);
            setLikeLength(likeLength + 1);
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (hasMore) {
      setIsLike(like.like);
      setLikeLength(like.result);
    }
  }, [hasMore]);

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <>
      {hasMore && (
        <div
          onClick={LikeEvent}
          className={isLike ? styles.like_true : styles.like_false}
        >
          {isLike ? (
            <>
              <span className={styles.like_icon}>
                <FcLike />
              </span>
              <span>{likeLength}</span>
            </>
          ) : (
            <>
              <span className={styles.like_icon}>
                <FcLikePlaceholder />
              </span>
              <span>{likeLength}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
