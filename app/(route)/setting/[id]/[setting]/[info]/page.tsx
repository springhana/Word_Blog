'use client';
import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { useRouter } from 'next/navigation';

import AccountContainer from './_components/AccountContainer';

export default function Info() {
  const router = useRouter();
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
      <AccountContainer />
    </div>
  );
}
