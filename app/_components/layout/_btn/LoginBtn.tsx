'use client';

import { FaDoorClosed } from '@react-icons/all-files/fa/FaDoorClosed';
import { FaDoorOpen } from '@react-icons/all-files/fa/FaDoorOpen';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

import styles from '@/styles/Sidebar.module.css';
import { SessionType } from '@/types/global';

const LoginBtn = ({ session }: { session: SessionType | null }) => {
  const itme = {
    icon: FaDoorOpen,
    visited_icon: FaDoorClosed,
    label: '로그인',
    visited_Label: '로그아웃',
    link: '/',
  };

  return (
    <div
      className={styles.item}
      onClick={async () => {
        if (session) {
          signOut();
        } else {
          signIn();
        }
      }}
    >
      <Link href={itme.link}>
        <div className={styles.item_icon}>
          {session ? itme.icon() : itme.visited_icon()}
        </div>

        <div className={styles.item_label}>
          {session ? itme.visited_Label : itme.label}
        </div>
      </Link>
    </div>
  );
};
export default LoginBtn;
