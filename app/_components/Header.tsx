'use client';

import { usePathname } from 'next/navigation';

import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Headeer.module.css';

export default function Header() {
  let pathname = usePathname() as string;
  pathname = pathname.split('/')[1];

  const tags = useAppSelector(state => state.tagReducer.tag);

  return (
    <div className={styles.header}>
      <title>{pathname ? pathname : 'home'}</title>
      <h4>{pathname ? pathname : 'home'}</h4>
    </div>
  );
}
