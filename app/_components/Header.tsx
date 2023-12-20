'use client';

import { usePathname } from 'next/navigation';

import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Headeer.module.css';

export default function Header() {
  let pathname = usePathname() as string;
  pathname = pathname.split('/')[1];

  const header = useAppSelector(state => state.headerReducer.title);

  return (
    <div className={styles.header}>
      <title>{header ? header : pathname}</title>
      <h4>{header ? header : pathname}</h4>
    </div>
  );
}
