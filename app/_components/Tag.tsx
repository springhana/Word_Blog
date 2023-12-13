'use client';

import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoPricetagSharp } from '@react-icons/all-files/io5/IoPricetagSharp';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useTag } from '@/hook/useTag';
import { tag_change } from '@/redux/features/tagSlice';
import { onOpen } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function Tag() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);
  const { loading, error, tags, hasMore } = useTag(id, 'all');

  useEffect(() => {
    dispatch(tag_change({ id: 'all', name: 'all' }));
  }, []);

  return (
    <div>
      {loading ? id && '로딩중' : null}
      {error ? id && '에러' : null}

      {pathname?.split('/')[1] === 'add' ? null : (
        <span
          onClick={() => {
            dispatch(tag_change({ id: 'all', name: 'all' }));
          }}
          style={
            tag.id === 'all'
              ? { margin: '10px 10px 10px 0', color: 'red' }
              : { margin: '10px 10px 10px 0' }
          }
        >
          all
        </span>
      )}
      {hasMore
        ? tags.map((item: { _id: string; name: string }, index: number) => (
            <span
              key={index}
              onClick={() => {
                dispatch(tag_change({ id: item._id, name: item.name }));
              }}
              style={
                tag.id === item._id
                  ? { margin: '10px 10px 10px 0', color: 'red' }
                  : { margin: '10px 10px 10px 0' }
              }
            >
              {item.name}
            </span>
          ))
        : null}
      <span
        onClick={() => {
          dispatch(tag_change({ id: '태그 추가', name: '태그 추가' }));
          dispatch(onOpen());
        }}
        style={
          tag.id === '태그 추가'
            ? { margin: '10px 10px 10px 0', color: 'red' }
            : { margin: '10px 10px 10px 0' }
        }
      >
        {tag.id === '태그 추가' ? (
          <span>
            <IoPricetagSharp />
            태그 추가
          </span>
        ) : (
          <span>
            <IoPricetagOutline />
            태그 추가
          </span>
        )}
      </span>
    </div>
  );
}
