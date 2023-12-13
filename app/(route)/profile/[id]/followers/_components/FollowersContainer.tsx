import User from '@/app/_components/card/User';
import { useSubscribe } from '@/hook/useSubscribe';
import { SubscribeType } from '@/types/word_blog';

import FollowersBtn from './FollowersBtn';

export default function FollowersContainer({ id }: { id: string }) {
  const { loading, error, subscribe, hasMore } = useSubscribe(id, 'user') as {
    loading: boolean;
    error: boolean;
    subscribe: SubscribeType[];
    hasMore: boolean;
  };
  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore && subscribe
        ? subscribe.map((item, index) => (
            <div key={index}>
              <User id={item._id} />
              <FollowersBtn id={id} userId={item._id} />
            </div>
          ))
        : null}
    </div>
  );
}
