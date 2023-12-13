import User from '@/app/_components/card/User';
import SubscribeBtn from '@/app/_components/SubscribeBtn';
import { useSubscribe } from '@/hook/useSubscribe';
import { SubscribeType } from '@/types/word_blog';

export default function FollowingContainer({ id }: { id: string }) {
  const { loading, error, subscribe, hasMore } = useSubscribe(id, 'author') as {
    loading: boolean;
    error: boolean;
    subscribe: SubscribeType[];
    hasMore: boolean;
  };

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore && subscribe[0]
        ? subscribe[0].userID.map((item, index) => (
            <div key={index}>
              <User id={item} />
              <SubscribeBtn user={item} value="구독해체" />
            </div>
          ))
        : null}
    </div>
  );
}
