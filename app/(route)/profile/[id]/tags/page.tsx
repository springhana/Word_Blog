'use client';
import { usePathname } from 'next/navigation';

import UserTab from '../_components/UserTab';
import TagsContainer from './_components/TagsContainer';

export default function Tags() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[2] as string;

  return (
    <div>
      <UserTab />
      <TagsContainer />
    </div>
  );
}
