'use client';

import axios from 'axios';
import { useState } from 'react';

import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';

export default function SubscribeBtn({
  user,
  value,
}: {
  user: string;
  value?: string;
}) {
  const [fallow, setFallow] = useState(value ? value : '구독');
  const id = useAppSelector(state => state.idReducer.id);

  if (!id) {
    return null;
  }

  const SubscribePost = async () => {
    try {
      axios.post('/api/subscribe', { author: id, user: user }).then(res => {
        if (res.data.post) {
          if (fallow === '구독') {
            setFallow('구독해체');
          } else {
            setFallow('구독');
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div onClick={SubscribePost} className={styles.subscribe_btn}>
      {fallow}
    </div>
  );
}
