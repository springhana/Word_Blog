'use client';

import { usePathname } from 'next/navigation';

import UserTab from '../_components/UserTab';
import FollowingContainer from './_components/FollowingContainer';

export default function Following() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[2] as string;

  return (
    <div>
      <UserTab />
      <FollowingContainer id={pathname} />
    </div>
  );
}
