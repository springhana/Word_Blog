'use client';

import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { useTag } from '@/hook/useTag';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Card.module.css';
import { CardType, TagType } from '@/types/word_blog';

import Setting from '../../Setting';
import Like from '../Like';
import Memorize from '../Memorize';
import User from '../User';

export default function WordItem({
  item,
  memorize,
}: {
  item: CardType;
  memorize?: string;
}) {
  const { loading, error, tags, hasMore } = useTag(item.tag, 'one') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

  const dispatch = useAppDispatch();
  const cardRef = useRef<HTMLDivElement>(null);

  if (memorize === 'On' && !item.memorize) {
    return null;
  } else if (memorize === 'Off' && item.memorize) {
    return null;
  }

  const Delete = async () => {
    try {
      await axios
        .delete(`/api/card`, { params: { id: item._id, author: item.author } })
        .then(res => {
          if (res.data.delete && cardRef.current) {
            cardRef.current.style.opacity = '0';
            setTimeout(() => {
              if (cardRef.current) {
                cardRef.current.style.display = 'none';
              }
            }, 500);
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const Papers = (paper: string) => {
    switch (paper) {
      case 'Paper1':
        return { backgroundImage: 'url(/image/paper/paper1.png)' };
      case 'Paper2':
        return { backgroundImage: 'url(/image/paper/paper2.png)' };
      case 'Paper3':
        return { backgroundImage: 'url(/image/paper/paper3.png)' };
      case 'Paper4':
        return { backgroundImage: 'url(/image/paper/paper4.png)' };
      case 'Paper5':
        return { backgroundImage: 'url(/image/paper/paper5.png)' };
      case 'Paper6':
        return { backgroundImage: 'url(/image/paper/paper6.png)' };
      default:
        return { backgroundImage: 'url(/image/paper/paper1.png)' };
    }
  };

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.card_profile}>
        <User id={item.author} date={item.date} />
      </div>

      <div className={styles.card_info} style={Papers(item.paper)}>
        <div className={styles.card_info_inner}>
          <Link href={`/detail/${item._id}`} className={styles.card_detail}>
            {item.image === 'default' || !item.image ? null : (
              <div className={styles.card_image_pic}>
                <Image
                  src={item.image}
                  alt={item.image}
                  width={10000}
                  height={10000}
                  className={styles.card_image}
                />
              </div>
            )}

            <div className={styles.card_word}>
              <div>{item.word}</div>
              <div>{item.meaning}</div>
              <div>{item.sentence}</div>
            </div>
          </Link>

          <div className={styles.card_like}>
            <Memorize memorize={item.memorize} id={item._id} />
            <div>
              <Like id={item._id} />
            </div>
          </div>
        </div>
        <Setting id={item._id} state={'card'} Delete={Delete} />
      </div>

      <div
        className={styles.card_tag}
        onClick={() => {
          dispatch(tag_change({ id: tags[0]._id, name: tags[0].name }));
        }}
      >
        {hasMore && !loading && !error && (
          <>
            <HiHashtag />
            <span>{tags[0].name}</span>
          </>
        )}
      </div>
    </div>
  );
}
