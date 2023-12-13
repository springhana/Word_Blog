'use client';

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
            setCheck(true);
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
    } else {
      alert('인증번호가 불일치합니다.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
        }}
        disabled={check}
      />
      {check ? (
        <button onClick={EmailCheck}>확인</button>
      ) : (
        <button onClick={MailPost} disabled={mail.ok}>
          전송
        </button>
      )}

      {mail.ok && check ? (
        !loading && !error ? (
          <input
            type="number"
            value={number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNumber(e.target.value);
            }}
            disabled={!check}
          />
        ) : null
      ) : null}

      <br />
      <input
        type="text"
        placeholder="password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="name"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      />
      <br />
      <button onClick={RegisterPost}>전송</button>
      <br />
      <Link href="/login">전으로</Link>
    </div>
  );
}
