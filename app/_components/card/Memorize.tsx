'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Card.module.css';

export default function Memorize({
  memorize,
  id,
  author,
}: {
  memorize: boolean;
  id: string | ObjectId;
  author: string;
}) {
  const [memori, setMemori] = useState(memorize);
  const _id = useAppSelector(state => state.idReducer.id);
  const router = useRouter();
  const MemorizeEvent = async () => {
    if (_id) {
      try {
        await axios.put('/api/update/memorize', { id: id }).then(res => {
          if (res.data.update) {
            setMemori(res.data.memorize);
          }
        });
      } catch (e) {
        console.error(e);
      }
    } else {
      router.push('/login');
    }
  };

  return (
    <div onClick={MemorizeEvent} className={styles.memo}>
      {memori ? (
        <>
          <Image
            src={'/image/memo/memo.avif'}
            alt="memo"
            width={43}
            height={33}
            className={styles.memo_image}
          />
          <span>외웠어요</span>
        </>
      ) : (
        <>
          <Image
            src={'/image/memo/memo_false.avif'}
            alt="memo_flase"
            width={43}
            height={33}
            className={styles.memo_image}
          />
          <span>못외웠어요</span>
        </>
      )}
    </div>
  );
}
