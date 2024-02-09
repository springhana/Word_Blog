import dynamic from 'next/dynamic';

import { Loader } from '@/app/_components/Loading/Loader';
import { useSubscribe } from '@/hook/useSubscribe';
import { SubscribeType } from '@/types/word_blog';

const SubscribeBtn = dynamic(
  () =>
    import('@/app/(route)/profile/[id]/_components/SubscribeBtn').then(
      mod => mod.default
    ),
  {
    ssr: false,
  }
);

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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div>
      {hasMore &&
        (subscribe[0].userID.some(item => item === userId) ? (
          <SubscribeBtn user={userId} value="구독해체" />
        ) : (
          <SubscribeBtn user={userId} value="구독" />
        ))}
    </div>
  );
}
