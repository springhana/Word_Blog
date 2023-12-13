'use client';

import { usePathname } from 'next/navigation';

import MyCard from './tab/MyCard';

export default function ProfileTabs() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;

  return (
    <div>
      <MyCard id={id} />
    </div>
  );
}
