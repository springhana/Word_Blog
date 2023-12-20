'use client';

import { FaGithub } from '@react-icons/all-files/fa/FaGithub';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

import icon from '@/public/image/icon.jpeg';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Login.module.css';

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
    <div className={styles.login}>
      <div className={styles.title}>
        <Image src={icon} alt={'이미지'} width={10000} height={10000} />
        <p>로그인</p>
      </div>

      <div className={styles.login_auth}>
        <button
          onClick={async () => {
            await signIn('github');
          }}
        >
          <FaGithub size={20} />
          Github 계정으로 로그인
        </button>
        <button>
          <FcGoogle size={20} />
          Google 계정으로 로그인
        </button>
      </div>

      <div className={styles.login_email}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
          placeholder="아이디"
        />
        <input
          type="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          placeholder="비밀번호"
        />
        <button
          onClick={async () => {
            await signIn('credentials', {
              email: email,
              password: password,
            });
          }}
          className={styles.login_btn}
        >
          로그인
        </button>
        <button
          onClick={() => {
            router.push('/register');
          }}
          className={styles.register_btn}
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
