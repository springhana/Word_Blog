import { useEffect } from 'react';

import User from '@/app/_components/card/User';
import SubscribeBtn from '@/app/_components/SubscribeBtn';
import { useSubscribe } from '@/hook/useSubscribe';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';
import { SubscribeType } from '@/types/word_blog';

export default function FollowingContainer({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { loading, error, subscribe, hasMore } = useSubscribe(id, 'author') as {
    loading: boolean;
    error: boolean;
    subscribe: SubscribeType[];
    hasMore: boolean;
  };

  useEffect(() => {
    dispatch(setTitle('following'));
  }, []);

  return (
    <div className={styles.follow}>
      {!loading && !error && hasMore && subscribe[0]
        ? subscribe[0].userID.map((item, index) => (
            <div key={index} className={styles.follow_item}>
              <User id={item} />
              <SubscribeBtn user={item} value="구독해체" />
            </div>
          ))
        : null}
    </div>
  );
}
