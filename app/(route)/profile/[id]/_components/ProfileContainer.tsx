'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import UserImage from '@/app/_components/UserImage';
import { useUser } from '@/hook/useUser';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';
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
  const dispatch = useAppDispatch();
  const { loading, error, user, hasMore } = useUser(id, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };

  useEffect(() => {
    if (!loading && !error && hasMore) {
      dispatch(setTitle(user.name));
    }
  }, [hasMore]);

  return (
    <div className={styles.profile}>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore ? (
        <div>
          <div className={styles.profile_image}>
            <div className={styles.profile_banner}>
              <BannerImage image={user.bannerImage} />
            </div>
            <div className={styles.profile_user}>
              <UserImage image={user.image} size={100} />
            </div>
          </div>
          <div className={styles.profile_info}>
            {session && session.user.email === user.email ? (
              <p>
                <Link href={`/edit/profile/${id}`}>프로필 수정</Link>
              </p>
            ) : (
              <SubscribeBtn user={user._id} />
            )}
            <div className={styles.name}>{user.name}</div>
            {user.intro ? <div>{user.intro}</div> : null}
            <div className={styles.follower}>
              <span>
                <Link href={`/book/${id}`}>단어장</Link>
              </span>

              <span>
                <Link href={`${id}/following`}>팔로우</Link>
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
