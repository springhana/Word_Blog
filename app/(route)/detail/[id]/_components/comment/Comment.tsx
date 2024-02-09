'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import User from '@/app/_components/card/User';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/CardDetail.module.css';

import CommentContainer from './CommentContainer';

export default function Comment() {
  const [comment, setComment] = useState('');
  const textarea = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.idReducer.id);
  const pathname = usePathname();
  const _id = pathname?.split('/')[2] as string;

  useEffect(() => {
    dispatch(setTitle('detail'));
  }, []);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await axios.post('/api/comment', {
        id: _id,
        author: user,
        comment: comment,
      });
    },
    onSuccess: () => {
      toast.success('댓글 추가 성공');
      setComment('');
      queryClient.invalidateQueries({
        queryKey: [`comments-${_id}`],
      });
    },
    onError: () => {
      toast.error('댓글 에러');
    },
  });

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  return (
    <div>
      <div className={styles.comment_post}>
        <div className={styles.card_profile}>
          <User id={user} />
        </div>
        <div className={styles.comment_input}>
          <textarea
            ref={textarea}
            placeholder="댓글 달기..."
            value={comment}
            rows={1}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              handleResizeHeight();
              setComment(e.target.value);
            }}
          />
          <button
            onClick={() => {
              mutate();
            }}
            disabled={comment.length <= 0}
            style={comment.length <= 0 ? {} : { cursor: 'pointer' }}
          >
            게시
          </button>
        </div>
      </div>

      <CommentContainer _id={_id} />
    </div>
  );
}
