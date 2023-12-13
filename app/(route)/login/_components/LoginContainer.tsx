'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hook';

export default function LoginContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const id = useAppSelector(state => state.idReducer.id);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      router.push('/');
    }
  }, [id]);

  return (
    <div>
      로그인
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <button
        onClick={async () => {
          await signIn('credentials', {
            email: email,
            password: password,
          });
        }}
      >
        전송
      </button>
      <br />
      <Link href="/register">회원가입</Link>
      <button
        onClick={async () => {
          await signIn('github');
        }}
      >
        깃허브 로그인
      </button>
    </div>
  );
}
