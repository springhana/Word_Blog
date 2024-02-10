import Image from 'next/image';

import styles from '@/styles/Loading/Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <Image src={'/image/logo/icon.avif'} alt="로고 이미지" fill />
      </div>
      <div className={styles.shadow}></div>
    </div>
  );
}
