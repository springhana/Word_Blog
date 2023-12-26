'use client';
import { useEffect } from 'react';

import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import MemoTab from '../MemoTab';
import Cards from './Cards';

export default function ViewCard() {
  const tag = useAppSelector(state => state.tagReducer.tag);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTitle('home'));
  }, []);

  return (
    <div>
      <div className="memoTab">
        <MemoTab />
      </div>
      <Cards tag={tag.id} />
    </div>
  );
}
