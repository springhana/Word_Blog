'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from '@/styles/Sidebar.module.css';
import { SidebarItemType } from '@/types/global';

export default function SidebarItem({
  icon,
  visited_icon,
  label,
  link,
}: SidebarItemType) {
  const pathname = usePathname();

  return (
    <div className={pathname === link ? styles.item_active : styles.item}>
      <Link href={link}>
        <div className={styles.item_icon}>
          {pathname === link ? visited_icon : icon}
        </div>
        <div className={styles.item_label}>{label}</div>
      </Link>
    </div>
  );
}
