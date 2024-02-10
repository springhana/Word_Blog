'use client';

import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { toast } from 'react-toastify';

import { useTag } from '@/hook/useTag';
import { Init } from '@/redux/features/cardSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Card.module.css';
import { CardType, TagType } from '@/types/word_blog';

import { SkeletonCard } from '../../loading/skeleton/SkeletonCard';
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

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string | ObjectId) => {
      await axios.delete(`/api/card`, {
        params: { id: item._id, author: item.author },
      });
    },
    onSuccess: id => {
      toast.success('카드 삭제 성공');
      if (cardRef.current) {
        cardRef.current.style.opacity = '0';
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.display = 'none';
          }
        }, 500);
      }
      queryClient.invalidateQueries({
        queryKey: [`card-detail-${id}`],
      });
    },
    onError: () => {
      toast.error('카드 에러');
    },
  });

  const Papers = (paper: string) => {
    switch (paper) {
      case 'Paper1':
        return { backgroundImage: 'url(/image/paper/paper1.avif)' };
      case 'Paper2':
        return { backgroundImage: 'url(/image/paper/paper2.avif)' };
      case 'Paper3':
        return { backgroundImage: 'url(/image/paper/paper3.avif)' };
      case 'Paper4':
        return { backgroundImage: 'url(/image/paper/paper4.avif)' };
      case 'Paper5':
        return { backgroundImage: 'url(/image/paper/paper5.avif)' };
      case 'Paper6':
        return { backgroundImage: 'url(/image/paper/paper6.avif)' };
      default:
        return { backgroundImage: 'url(/image/paper/paper1.avif)' };
    }
  };

  if (memorize === 'On' && !item.memorize) {
    return null;
  } else if (memorize === 'Off' && item.memorize) {
    return null;
  }

  if (loading) {
    return <SkeletonCard />;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <div className={styles.card} ref={cardRef}>
      <div className={styles.card_profile}>
        <User
          id={item.author}
          date={item.updateDate ? item.updateDate : item.date}
        />
      </div>
      <div className={styles.card_info} style={Papers(item.paper)}>
        <div className={styles.card_info_inner}>
          <Link href={`/detail/${item._id}`} className={styles.card_detail}>
            {item.image === 'default' || !item.image ? null : (
              <div className={styles.card_image_pic}>
                <Image
                  src={item.image}
                  alt={item.image}
                  fill
                  placeholder="blur"
                  blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VA8AAmkBc7YFeIIAAAAASUVORK5CYII="
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
        </div>
        <Setting
          id={item._id}
          state={'card'}
          Delete={() => {
            mutate(item._id);
          }}
          author={item.author}
        />
      </div>
      <div
        className={styles.card_tag}
        onClick={() => {
          dispatch(Init());
          dispatch(tag_change({ id: tags[0]._id, name: tags[0].name }));
        }}
      >
        {hasMore && (
          <>
            <HiHashtag />
            <span>{tags[0].name}</span>
          </>
        )}
      </div>
      <div className={styles.card_like}>
        <Memorize memorize={item.memorize} id={item._id} author={item.author} />
        <div>
          <Like id={item._id} />
        </div>
      </div>
    </div>
  );
}
