'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  let pathname = usePathname() as string;
  pathname = pathname.split('/')[1];

  return (
    <div>
      <title>{pathname ? pathname : 'home'}</title>
      <h4>{pathname ? pathname : 'home'}</h4>
    </div>
  );
}
