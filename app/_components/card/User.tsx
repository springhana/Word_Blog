import Link from 'next/link';

import { useUser } from '@/hook/useUser';
import { UsersType } from '@/types/word_blog_user';

import UserImage from '../UserImage';

export default function User({ id, date }: { id: string; date?: string }) {
  const { loading, error, user, hasMore } = useUser(id, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };

  return (
    <>
      {!loading && !error && hasMore ? (
        <>
          <Link href={`/profile/${user._id}`}>
            <UserImage image={user.image} size={50} />
            <span>
              <div>{user.name}</div>
              {date ? (
                <div>
                  {date.split('.')[0].split('T')[0] +
                    '/' +
                    date.split('.')[0].split('T')[1]}
                </div>
              ) : null}
            </span>
          </Link>
        </>
      ) : null}
    </>
  );
}
