'use client';

import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { usePathname, useRouter } from 'next/navigation';

import Login from '@/app/_components/Login';
import { useAppSelector } from '@/redux/hook';

import Account from './_components/Account';

export default function Settings() {
  let pathname = usePathname();
  pathname = pathname?.split('/')[3] as string;
  const id = useAppSelector(state => state.idReducer.id);
  const router = useRouter();

  if (!id) {
    return <Login />;
  }

  return (
    <div>
      <div
        className="back"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
        <span>뒤로가기</span>
      </div>
      {pathname === 'account' && <Account />}
    </div>
  );
}
