'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useUser } from '@/hook/useUser';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/UserSetting.module.css';
import { UsersType } from '@/types/word_blog_user';

export default function Account() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[3] as string;
  const router = useRouter();

  const id = useAppSelector(state => state.idReducer.id);

  const { loading, error, user, hasMore } = useUser(id, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };

  return (
    <div>
      {!loading && !error && hasMore && (
        <div className={styles.setting_btn}>
          <button
            onClick={() => {
              router.push('./account/mydata');
            }}
          >
            계정 정보
          </button>
          <button
            disabled={user.password ? false : true}
            onClick={() => {
              router.push('./account/password');
            }}
            style={user.password ? { color: 'black' } : { color: 'gray' }}
          >
            비밀번호 변경
          </button>
          <button
            onClick={() => {
              router.push('./account/deactivate');
            }}
          >
            계정 비활성화
          </button>
        </div>
      )}
    </div>
  );
}
