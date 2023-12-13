import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useRef } from 'react';

import User from '@/app/_components/card/User';
import Setting from '@/app/_components/Setting';
import { CommentType } from '@/types/word_blog';

export default function CommentItem({ item }: { item: CommentType }) {
  const commentRef = useRef<HTMLDivElement>(null);

  const Delete = async (id?: string | ObjectId) => {
    try {
      await axios.delete(`/api/comment`, { params: { id: id } }).then(res => {
        if (res.data.delete && commentRef.current) {
          commentRef.current.style.opacity = '0';
          setTimeout(() => {
            if (commentRef.current) {
              commentRef.current.style.display = 'none';
            }
          }, 500);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div ref={commentRef} style={{ position: 'relative' }}>
      <User id={item.author} />
      <div>{item.comment}</div>

      <Setting id={item._id} state={'comment'} Delete={Delete} />
    </div>
  );
}
