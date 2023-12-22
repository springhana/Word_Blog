'use client';

import { usePathname } from 'next/navigation';

import { useUser } from '@/hook/useUser';
import { useAppSelector } from '@/redux/hook';
import { UsersType } from '@/types/word_blog_user';

import Deactivate from './account/Deactivate';
import Mydata from './account/Mydata';
import Password from './account/Password';

export default function AccountContainer() {
  const id = useAppSelector(state => state.idReducer.id);
  let pathname = usePathname();
  pathname = pathname?.split('/')[4] as string;

  const { loading, error, user, hasMore } = useUser(id, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };

  return (
    <div>
      {!loading && !error && hasMore ? (
        <div>
          {pathname === 'mydata' ? (
            <Mydata user={user} />
          ) : pathname === 'password' ? (
            <Password user={user._id} />
          ) : pathname === 'deactivate' ? (
            <Deactivate user={user} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
