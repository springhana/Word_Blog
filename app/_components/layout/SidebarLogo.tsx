import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/Sidebar.module.css';

export default function SidebarLogo() {
  return (
    <div className={styles.logo}>
      <Link href={'/'}>
        <Image
          src={'/image/logo/icon.avif'}
          alt="대표 이미지"
          width={50}
          height={50}
          className={styles.logo_image}
        />
      </Link>
    </div>
  );
}
