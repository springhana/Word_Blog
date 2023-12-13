import Link from 'next/link';

import { useUser } from '@/hook/useUser';
import { UsersType } from '@/types/word_blog_user';

import UserImage from '../UserImage';

export default function User({ id }: { id: string }) {
  const { loading, error, user, hasMore } = useUser(id, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

      {hasMore ? (
        <div>
          <Link href={`/profile/${user._id}`}>
            <UserImage image={user.image} size={10} />
            <p>{user.name}</p>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
