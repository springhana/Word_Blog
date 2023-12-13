'use client';

import { usePathname, useRouter } from 'next/navigation';

import Login from '@/app/_components/Login';
import { useUser } from '@/hook/useUser';
import { useAppSelector } from '@/redux/hook';
import { UsersType } from '@/types/word_blog_user';

import Deactivate from './_components/Deactivate';
import Mydata from './_components/Mydata';
import Password from './_components/Password';

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

  if (!id) {
    return <Login />;
  }

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore ? (
        <div>
          <button
            onClick={() => {
              router.push('mydata');
            }}
          >
            계정 정보
          </button>
          <button
            disabled={user.password ? false : true}
            onClick={() => {
              router.push('password');
            }}
            style={user.password ? { color: 'black' } : { color: 'gray' }}
          >
            비밀번호 변경
          </button>
          <button
            onClick={() => {
              router.push('deactivate');
            }}
          >
            계정 비활성화
          </button>

          {pathname === 'mydata' && <Mydata user={user} />}
          {pathname === 'password' && <Password user={user._id} />}
          {pathname === 'deactivate' && <Deactivate user={user._id} />}
        </div>
      ) : null}
    </div>
  );
}
