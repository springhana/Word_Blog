import SubscribeBtn from '@/app/_components/SubscribeBtn';
import { useSubscribe } from '@/hook/useSubscribe';
import { SubscribeType } from '@/types/word_blog';

export default function FollowersBtn({
  id,
  userId,
}: {
  id: string;
  userId: string;
}) {
  const { loading, error, subscribe, hasMore } = useSubscribe(id, 'author') as {
    loading: boolean;
    error: boolean;
    subscribe: SubscribeType[];
    hasMore: boolean;
  };
  return (
    <div>
      {hasMore && !loading && !error && subscribe[0] ? (
        subscribe[0].userID.some(item => item === userId) ? (
          <SubscribeBtn user={userId} value="구독해체" />
        ) : (
          <SubscribeBtn user={userId} value="구독" />
        )
      ) : (
        <SubscribeBtn user={userId} value="구독" />
      )}
    </div>
  );
}
