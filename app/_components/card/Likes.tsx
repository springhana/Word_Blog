'use client';
import { ObjectId } from 'mongodb';

import { useLike } from '@/hook/useLike';

export default function Likes({ id }: { id: string | ObjectId }) {
  const { loading, error, like, hasMore } = useLike(id, 'id') as {
    loading: boolean;
    error: boolean;
    like: number;
    hasMore: boolean;
  };

  return (
    <div>
      <div>좋아요 수 {!loading && !error && hasMore ? like : 0}</div>
    </div>
  );
}
