'use client';

import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoPricetagSharp } from '@react-icons/all-files/io5/IoPricetagSharp';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useTag } from '@/hook/useTag';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function Tag() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);
  const { loading, error, tags, hasMore } = useTag(id, 'all');

  useEffect(() => {
    if (pathname?.split('/')[1] !== 'add') {
      dispatch(tag_change('all'));
    }
  }, []);

  return (
    <div>
      {loading ? id && '로딩중' : null}
      {error ? id && '에러' : null}

      {pathname?.split('/')[1] === 'add' ? null : (
        <span
          onClick={() => {
            dispatch(tag_change('all'));
          }}
          style={
            tag === 'all'
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
                dispatch(tag_change(item._id));
              }}
              style={
                tag === item._id
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
          dispatch(tag_change('태그 추가'));
        }}
        style={
          tag === '태그 추가'
            ? { margin: '10px 10px 10px 0', color: 'red' }
            : { margin: '10px 10px 10px 0' }
        }
      >
        {tag === '태그 추가' ? (
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
