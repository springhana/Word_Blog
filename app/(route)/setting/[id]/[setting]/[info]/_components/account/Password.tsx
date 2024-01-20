'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import styles from '@/styles/UserSetting.module.css';

export default function Password({ user }: { user: string }) {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const router = useRouter();
  const PasswordPost = async () => {
    if (newPassword === passwordCheck && newPassword.trim().length > 0) {
      try {
        await axios
          .post('/api/user', {
            password: password,
            newPassword: newPassword,
            id: user,
          })
          .then(res => {
            if (res.data.post) {
              router.push('account');
            } else {
              alert('현재 비밀번호가 잘못되었습니다.');
            }
          });
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('잘못 입력된 정보가 있습니다.');
    }
  };

  return (
    <div className={styles.password}>
      <p>비밀 번호 변경</p>

      <div>
        <input
          type="text"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
          placeholder="현재 비밀번호"
        />
      </div>
      <div>
        <input
          type="text"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword(e.target.value);
          }}
          placeholder="새 비밀번호"
        />
      </div>
      <div>
        <input
          type="text"
          value={passwordCheck}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordCheck(e.target.value);
          }}
          placeholder="비밀번호 확인"
        />
      </div>

      <button onClick={PasswordPost}>비밀번호 변경</button>
    </div>
  );
}
