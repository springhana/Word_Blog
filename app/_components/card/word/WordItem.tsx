'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { useTag } from '@/hook/useTag';
import { CardType, TagType } from '@/types/word_blog';

import Setting from '../../Setting';
import Like from '../Like';
import Likes from '../Likes';
import Memorize from '../Memorize';
import User from '../User';

export default function WordItem({
  item,
  memorize,
}: {
  item: CardType;
  memorize?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { loading, error, tags, hasMore } = useTag(item.tag, 'one') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

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

  if (memorize === 'On' && !item.memorize) {
    return null;
  } else if (memorize === 'Off' && item.memorize) {
    return null;
  }
  return (
    <div
      style={{ border: '1px solid red', position: 'relative' }}
      ref={cardRef}
    >
      <User id={item.author} />
      <Link href={`/detail/${item._id}`}>
        <div>{hasMore && !loading && !error && tags[0].name}</div>
        <div>{item.word}</div>
        <div>{item.meaning}</div>
        <div>{item.date}</div>
        <div style={{ width: '200px' }}>
          {item.image === 'default' || !item.image ? null : (
            <Image
              src={item.image}
              alt={item.image}
              width={10000}
              height={10000}
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
      </Link>
      <div>
        <Memorize memorize={item.memorize} id={item._id} />
        <Like id={item._id} />
        <Likes id={item._id} />
      </div>

      <Setting id={item._id} paper={item.tag} state={'card'} Delete={Delete} />
    </div>
  );
}
