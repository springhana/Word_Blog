'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useSearch } from '@/hook/useSearch';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';

const CardDetail = dynamic(() => import('@/app/_components/card/CardDetail'));

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
    dispatch(setTitle('search'));
  }, [hasMore]);

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="search">
      <div className="search_input">
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
          }}
          placeholder="검색어를 입력해주세요"
        />
      </div>

      {value.length > 1 ? (
        !loading && hasMore && cards.length >= 1 ? (
          cards.map((item, index) => (
            <div key={index}>
              <CardDetail id={item._id} />
            </div>
          ))
        ) : (
          <div className="search_result">
            <div className="search_result">검색 결과가 없습니다.</div>
          </div>
        )
      ) : (
        <div className="search_result">
          <div className="search_result">두 글자이상 입력해주세요.</div>
        </div>
      )}
    </div>
  );
}
