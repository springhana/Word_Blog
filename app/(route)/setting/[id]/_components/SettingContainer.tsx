'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SettingContainer() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[2] as string;

  return (
    <div>
      <div>
        <Link href={`${pathname}/account`}>계정</Link>
      </div>
    </div>
  );
}
