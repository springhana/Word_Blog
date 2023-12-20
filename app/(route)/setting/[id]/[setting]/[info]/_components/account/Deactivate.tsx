'use client';

import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

import styles from '@/styles/UserSetting.module.css';
import { UsersType } from '@/types/word_blog_user';

export default function Deactivate({ user }: { user: UsersType }) {
  const [check, setCheck] = useState(true);
  const DeleleUser = async () => {
    try {
      await axios
        .delete('/api/user', { params: { user: user._id, email: user.email } })
        .then(res => {
          if (res.data.delete) {
            signOut();
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.deactivate}>
      <div>
        <p>회원 탈퇴</p>
        {check ? (
          <span>
            회원 탈퇴 시 단블에 대한 이용 서비스들 모두 이용하실 수 없게됩니다.
            <br /> <br />
            <ul>
              <li>글쓰기</li>
              <li>단어장</li>
              <li>구독</li>
              <li>프로필</li>
              <li>태그</li>
              <li>차트 & 그래프</li>
            </ul>
            <br />
            ... 등의 기능들을 사용할 수 없스빈다.
          </span>
        ) : (
          <span>정말 회원 탈퇴를 하시겠습니까?</span>
        )}
      </div>

      {check ? (
        <button
          onClick={() => {
            setCheck(false);
          }}
        >
          회원 탈퇴
        </button>
      ) : (
        <button onClick={DeleleUser}>진행</button>
      )}
    </div>
  );
}
