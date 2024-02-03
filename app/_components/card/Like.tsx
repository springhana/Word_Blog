'use client';

import { FcLike } from '@react-icons/all-files/fc/FcLike';
import { FcLikePlaceholder } from '@react-icons/all-files/fc/FcLikePlaceholder';
import { ObjectId } from 'mongodb';
import { useRouter } from 'next/navigation';

import { useLike } from '@/hook/useLike';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Card.module.css';

export default function Like({ id }: { id: string | ObjectId }) {
  const user = useAppSelector(state => state.idReducer.id);
  const router = useRouter();

  const { loading, error, like, hasMore, mutate } = useLike(id, 'id', user) as {
    loading: boolean;
    error: boolean;
    like: { result: number; like: boolean };
    hasMore: boolean;
    mutate: () => void;
  };

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
          onClick={() => {
            if (user) {
              mutate();
            } else {
              router.push('/login');
            }
          }}
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
