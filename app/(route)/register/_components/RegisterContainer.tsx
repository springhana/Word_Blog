'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import icon from '@/public/image/icon.jpeg';
import styles from '@/styles/Login.module.css';

export default function RegisterContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState({ msg: '', ok: false, authNum: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [number, setNumber] = useState('');
  const [check, setCheck] = useState(false);

  const router = useRouter();

  const RegisterPost = async () => {
    await axios
      .post('/api/post/register', {
        name: name,
        email: email,
        image: 'default',
        password: password,
        ok: mail.ok,
        state: 'register',
      })
      .then(res => {
        if (res) {
          router.push('/login');
        }
      });
  };

  const MailPost = async () => {
    try {
      await axios
        .post('/api/post/register', {
          email: email,
          state: 'email',
        })
        .then(res => {
          if (res.data) {
            setMail(res.data);
            if (res.data.ok) setCheck(true);
          }
        });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const EmailCheck = () => {
    if (mail.authNum === parseInt(number)) {
      setCheck(false);
      alert('인증번호가 확인되었습니다.');
    } else {
      alert('인증번호가 불일치합니다.');
    }
  };

  return (
    <div className={`${styles.login} ${styles.register}`}>
      <div className={styles.title}>
        <Image src={icon} alt={'이미지'} width={10000} height={10000} />
        <p>회원가입</p>
      </div>

      <div className={styles.login_email}>
        <div className={styles.email_check}>
          {mail.ok && check ? (
            !loading && !error ? (
              <input
                type="text"
                value={number}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNumber(e.target.value);
                }}
                disabled={!check}
                className={styles.email_number}
              />
            ) : null
          ) : (
            <input
              type="text"
              placeholder="email"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              disabled={!check && mail.ok}
            />
          )}

          {check ? (
            <button onClick={EmailCheck} className={styles.email_post}>
              확인
            </button>
          ) : (
            <button
              onClick={MailPost}
              disabled={mail.ok}
              className={styles.email_post}
            >
              전송
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <button onClick={RegisterPost}>전송</button>
      </div>
    </div>
  );
}
