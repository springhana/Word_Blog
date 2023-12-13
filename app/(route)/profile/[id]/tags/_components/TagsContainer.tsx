'use client';
import axios from 'axios';
import { useState } from 'react';

import { useTag } from '@/hook/useTag';
import { change_state } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { TagType } from '@/types/word_blog';

export default function TagsContainer() {
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.idReducer.id);

  const [update, setUpdate] = useState('');
  const [remove, setRemove] = useState('');
  const [value, setValue] = useState('');

  const { loading, error, tags, hasMore } = useTag(id, 'all') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

  const TagUpdate = async (id: string) => {
    try {
      await axios.put('/api/tag', { id: id, name: value }).then(res => {
        if (res.data.update) {
          setUpdate('');
          setValue('');
          dispatch(change_state());
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const TagDelete = async (id: string) => {
    try {
      await axios.delete('/api/tag', { params: { id: id } }).then(res => {
        if (res.data.delete) {
          setRemove('');
          dispatch(change_state());
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

      {hasMore
        ? tags.map((item, index) => (
            <div key={index}>
              {item.name === update ? (
                <input
                  type="text"
                  value={value}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(e.target.value);
                  }}
                />
              ) : (
                <div>{item.name}</div>
              )}

              {item.name === update ? (
                <button
                  onClick={() => {
                    TagUpdate(item._id);
                  }}
                >
                  확인
                </button>
              ) : (
                <button
                  onClick={() => {
                    setUpdate(item.name);
                    setValue(item.name);
                  }}
                >
                  수정
                </button>
              )}

              {item.name === remove ? (
                <button
                  onClick={() => {
                    TagDelete(item._id);
                  }}
                >
                  확인
                </button>
              ) : (
                <button
                  onClick={() => {
                    setRemove(item.name);
                  }}
                >
                  삭제
                </button>
              )}
            </div>
          ))
        : null}
    </div>
  );
}
