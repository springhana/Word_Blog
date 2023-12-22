import { ObjectId } from 'mongodb';

import CardDetail from '@/app/_components/card/CardDetail';
import { useLike } from '@/hook/useLike';
import { LikeType } from '@/types/word_blog';

export default function LikeCards({ id }: { id: string | ObjectId }) {
  const { loading, error, like, hasMore } = useLike(id, 'user') as {
    loading: boolean;
    error: boolean;
    like: LikeType[];
    hasMore: boolean;
  };

  return (
    <div>
      {!loading && !error && hasMore && like.length > 0
        ? like.map((item, index) => (
            <div key={index}>
              <CardDetail id={item._id} />
            </div>
          ))
        : null}
    </div>
  );
}
