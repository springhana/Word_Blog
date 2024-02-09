import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import { toast } from 'react-toastify';

import User from '@/app/_components/card/User';
import Setting from '@/app/_components/Setting';
import styles from '@/styles/CardDetail.module.css';
import { CommentType } from '@/types/word_blog';

export default function CommentItem({ item }: { item: CommentType }) {
  const commentRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`/api/comment`, { params: { id: id } });
    },
    onSuccess: id => {
      toast.success('댓글 삭제 성공');
      if (commentRef.current) {
        commentRef.current.style.opacity = '0';
        setTimeout(() => {
          if (commentRef.current) {
            commentRef.current.style.display = 'none';
          }
        }, 500);
      }
      queryClient.invalidateQueries({
        queryKey: [`comments-${id}`],
      });
    },
    onError: () => {
      toast.error('댓글 에러');
    },
  });

  return (
    <div ref={commentRef} className={styles.comment_inner}>
      <div className={styles.card_profile}>
        <User id={item.author} date={item.date} />
      </div>
      <div className={styles.comment_content}>{item.comment}</div>

      <Setting
        id={item._id}
        state={'comment'}
        Delete={() => {
          mutate(item._id);
        }}
        author={item.author}
      />
    </div>
  );
}
