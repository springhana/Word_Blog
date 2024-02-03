import { ObjectId } from 'mongodb';
import dynamic from 'next/dynamic';

import { useLike } from '@/hook/useLike';
import { LikeType } from '@/types/word_blog';

const CardDetail = dynamic(() => import('@/app/_components/card/CardDetail'));

export default function LikeCards({ id }: { id: string | ObjectId }) {
  const { loading, error, like, hasMore } = useLike(id, 'user') as {
    loading: boolean;
    error: boolean;
    like: LikeType[];
    hasMore: boolean;
  };

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {hasMore && like.length > 0
        ? like.map(item => (
            <div key={item._id}>
              <CardDetail id={item._id} />
            </div>
          ))
        : null}
    </div>
  );
}
