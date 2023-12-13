'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
    <div>
      <div>
        <div>현재 비밀번호</div>
        <input
          type="text"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <div>새 비밀번호</div>
        <input
          type="text"
          value={newPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <div>비밀번호 확인</div>
        <input
          type="text"
          value={passwordCheck}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPasswordCheck(e.target.value);
          }}
        />
      </div>

      <button onClick={PasswordPost}>저장</button>
    </div>
  );
}
