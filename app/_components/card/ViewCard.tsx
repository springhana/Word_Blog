'use client';
import dynamic from 'next/dynamic';

import { useAppSelector } from '@/redux/hook';

import MemoTab from '../MemoTab';

const Cards = dynamic(() => import('./Cards').then(mod => mod.default), {
  ssr: false,
});

export default function ViewCard() {
  const tag = useAppSelector(state => state.tagReducer.tag);

  return (
    <div>
      <div className="memoTab">
        <MemoTab />
      </div>
      <Cards tag={tag.id} />
    </div>
  );
}
