import { GiSpellBook } from '@react-icons/all-files/gi/GiSpellBook';
import Link from 'next/link';

import styles from '@/styles/Sidebar.module.css';

export default function SidebarLogo() {
  return (
    <div className={styles.logo}>
      <Link href={'/'}>
        <GiSpellBook size={40} />
      </Link>
    </div>
  );
}
