'use client';

import { useEffect, useState } from 'react';

import CardDetail from '@/app/_components/card/CardDetail';
import { useSearch } from '@/hook/useSearch';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';

export default function SearchContainer() {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const { loading, error, cards, hasMore } = useSearch(value) as {
    loading: boolean;
    error: boolean;
    cards: { _id: string }[];
    hasMore: boolean;
  };
  useEffect(() => {
    dispatch(setTitle('home'));
  }, [hasMore]);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
      />
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

      {hasMore
        ? cards.map((item, index) => (
            <div key={index}>
              <CardDetail id={item._id} />
            </div>
          ))
        : '검색 결과가 없습니다.'}
    </div>
  );
}
