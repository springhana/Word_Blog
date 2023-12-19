'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import UserImage from '@/app/_components/UserImage';
import { useUser } from '@/hook/useUser';
import { SessionType } from '@/types/global';
import { UsersType } from '@/types/word_blog_user';

import BannerImage from '../../../../_components/BannerImage';
import SubscribeBtn from '../../../../_components/SubscribeBtn';

export default function ProfileContainer({
  session,
}: {
  session: SessionType | null;
}) {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;

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
          <BannerImage image={user.bannerImage} />
          <div>
            <UserImage image={user.image} size={100} />

            {session && session.user.email === user.email ? (
              <p>
                <Link href={`/edit/profile/${id}`}>프로필 수정</Link>
              </p>
            ) : (
              <SubscribeBtn user={user._id} />
            )}

            <p>이름: {user.name}</p>
            {user.intro ? <p>자기소개: {user.intro}</p> : null}
          </div>
          <p>
            <Link href={`/book/${id}`}>단어장</Link>
          </p>

          <p>
            <Link href={`${id}/following`}>팔로우</Link>
          </p>
        </div>
      ) : null}
    </div>
  );
}
