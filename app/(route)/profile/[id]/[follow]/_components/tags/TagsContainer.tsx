'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useTag } from '@/hook/useTag';
import { setTitle } from '@/redux/features/headerSlice';
import { change_state } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';
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

  useEffect(() => {
    dispatch(setTitle('tags'));
  }, []);

  const TagUpdate = async (tagId: string) => {
    try {
      await axios
        .put('/api/tag', { id: id, name: value, tagId: tagId })
        .then(res => {
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

  const TagDelete = async (userId: string) => {
    try {
      await axios
        .delete('/api/tag', { params: { id: id, userId: userId } })
        .then(res => {
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
      {!loading && !error && hasMore
        ? tags.map((item, index) => (
            <div key={index} className={styles.tag_item}>
              {item.name === update ? (
                <>
                  <input
                    type="text"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setValue(e.target.value);
                    }}
                    className={styles.tag_input}
                  />
                </>
              ) : (
                <div className={styles.tag_name}>{item.name}</div>
              )}
              <div className={styles.btn}>
                {item.name === update ? (
                  <button
                    onClick={() => {
                      TagUpdate(item._id);
                    }}
                    className={styles.btn_ok}
                  >
                    확인
                  </button>
                ) : item.name === remove ? (
                  <button
                    onClick={() => {
                      setRemove('');
                    }}
                    className={styles.btn_cancel}
                  >
                    취소
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUpdate(item.name);
                      setValue(item.name);
                    }}
                    className={styles.btn_ok}
                  >
                    수정
                  </button>
                )}

                {item.name === remove ? (
                  <button
                    onClick={() => {
                      TagDelete(item._id);
                    }}
                    className={styles.btn_ok}
                  >
                    확인
                  </button>
                ) : item.name === update ? (
                  <button
                    onClick={() => {
                      setUpdate('');
                    }}
                    className={styles.btn_cancel}
                  >
                    취소
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setRemove(item.name);
                    }}
                    className={styles.btn_ok}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
