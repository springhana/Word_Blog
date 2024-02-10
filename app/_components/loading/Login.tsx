'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Login() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  }, []);
  return <div>로그인 해주세요</div>;
}
