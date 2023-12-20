'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/UserSetting.module.css';

export default function SettingContainer() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[2] as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('setting'));
  }, []);

  return (
    <div>
      <div className={styles.setting_btn}>
        <button
          onClick={() => {
            router.push(`${pathname}/account`);
          }}
        >
          계정
        </button>
        <button
          onClick={() => {
            router.push(`${pathname}/dark`);
          }}
        >
          다크 모드
        </button>
      </div>
    </div>
  );
}
