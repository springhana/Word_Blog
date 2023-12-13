'use client';

import axios from 'axios';
import { ObjectId } from 'mongodb';

import { change_state } from '@/redux/features/likeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function Like({ id }: { id: string | ObjectId }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.idReducer.id);

  const LikeEvent = async () => {
    try {
      await axios.post('/api/like', { id: id, user: user }).then(res => {
        if (res.data.post) {
          dispatch(change_state());
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div onClick={LikeEvent} style={{ border: '1px solid blue', zIndex: 10 }}>
      좋아요
    </div>
  );
}
