'use client';

import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcLikePlaceholder } from '@react-icons/all-files/fc/FcLikePlaceholder';
import axios from 'axios';
import { ObjectId } from 'mongodb';

import { useLike } from '@/hook/useLike';
import { change_state } from '@/redux/features/likeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Card.module.css';

export default function Like({ id }: { id: string | ObjectId }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.idReducer.id);

  const { loading, error, like, hasMore } = useLike(id, 'id', user) as {
    loading: boolean;
    error: boolean;
    like: { result: number; like: boolean };
    hasMore: boolean;
  };

  const LikeEvent = async () => {
    try {
      await axios.post('/api/like', { id: id, user: user }).then(res => {
        if (res.data.post) {
          dispatch(change_state());
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!loading && !error && hasMore && (
        <div
          onClick={LikeEvent}
          className={like.like ? styles.like_true : styles.like_false}
        >
          {like.like ? (
            <>
              <span className={styles.like_icon}>
                <FcLike />
              </span>
              <span>{like.result}</span>
            </>
          ) : (
            <>
              <span className={styles.like_icon}>
                <FcLikePlaceholder />
              </span>
              <span>{like.result}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
