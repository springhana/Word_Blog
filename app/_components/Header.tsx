'use client';

import { usePathname } from 'next/navigation';

import { useAppSelector } from '@/redux/hook';

export default function Header() {
  let pathname = usePathname() as string;
  pathname = pathname.split('/')[1];

  const tags = useAppSelector(state => state.tagReducer.tag);

  return (
    <div>
      <title>{pathname ? pathname : 'home'}</title>
      <h4>{pathname ? pathname : 'home'}</h4>
      <span># {tags.name}</span>
    </div>
  );
}
