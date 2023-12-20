'use client';
import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { usePathname, useRouter } from 'next/navigation';

import UserTab from '../_components/UserTab';
import FollowersContainer from './_components/followers/FollowersContainer';
import FollowingContainer from './_components/following/FollowingContainer';
import TagsContainer from './_components/tags/TagsContainer';

export default function Follow() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;
  const url = pathname?.split('/')[3] as string;
  const router = useRouter();

  return (
    <div>
      <div
        className="back"
        onClick={() => {
          router.push(`/profile/${id}`);
        }}
      >
        <IoArrowBack />
        <span>뒤로가기</span>
      </div>
      <div className="memoTab">
        <UserTab url={url} />
      </div>
      {url === 'tags' && <TagsContainer />}
      {url === 'following' && <FollowingContainer id={id} />}
      {url === 'followers' && <FollowersContainer id={id} />}
    </div>
  );
}
