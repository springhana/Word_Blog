'use client';

import axios from 'axios';
import { useState } from 'react';

import { change_state, tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch } from '@/redux/hook';

export default function TagAdd({ id }: { id: string }) {
  const [tag, setTag] = useState('');

  const dispatch = useAppDispatch();

  const tagPost = async () => {
    try {
      await axios.post('/api/tag', { id: id, tag: tag }).then(res => {
        if (res.data.post) {
          dispatch(change_state());
          dispatch(tag_change({ id: 'all', name: 'all' }));
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={tag}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTag(e.target.value);
        }}
      />
      <button onClick={tagPost}>태그 추가</button>
    </div>
  );
}
