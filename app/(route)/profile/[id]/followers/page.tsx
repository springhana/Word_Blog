'use client';

import { usePathname } from 'next/navigation';

import UserTab from '../_components/UserTab';
import FollowersContainer from './_components/FollowersContainer';

export default function Followers() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[2] as string;

  return (
    <div>
      <UserTab />
      <FollowersContainer id={pathname} />
    </div>
  );
}
