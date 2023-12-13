'use client';

import axios from 'axios';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { change_state, commentID_change } from '@/redux/features/commentSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const CommentContainer = dynamic(
  () => import('./CommentContainer').then(mod => mod.default),
  { ssr: false }
);

export default function Comment() {
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.idReducer.id);
  const pathname = usePathname();
  const _id = pathname?.split('/')[2] as string;

  const commentPost = async () => {
    await axios
      .post('/api/comment', {
        id: _id,
        author: user,
        comment: comment,
      })
      .then(res => {
        if (res.data.post) {
          dispatch(change_state());
          dispatch(commentID_change(res.data.id));
        }
      });
  };
  return (
    <div>
      <input
        type="text"
        placeholder="댓글 달기..."
        value={comment}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setComment(e.target.value);
        }}
      />
      <span onClick={commentPost}>게시</span>
      <div>이미지</div>
      <br />

      <CommentContainer _id={_id} />
    </div>
  );
}
