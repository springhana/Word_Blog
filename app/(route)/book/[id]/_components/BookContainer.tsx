'use client';
import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { useNote } from '@/hook/useNote';
import { change_state, onOpen } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const Chart = dynamic(() => import('./Chart').then(mod => mod.default), {
  ssr: false,
});

export default function BookContainer() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.noteReducer.Open);

  const [update, setUpdate] = useState('');
  const [remove, setRemove] = useState('');
  const [value, setValue] = useState('');
  const [toggle, setToggle] = useState(true);
  const { loading, error, note, hasMore } = useNote(id, 'user');

  const NoteUpdate = async (id: string) => {
    try {
      await axios.put('/api/note', { id: id, name: value }).then(res => {
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

  const NoteDelete = async (id: string) => {
    try {
      await axios.delete('/api/note', { params: { id: id } }).then(res => {
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
      <p>단어집</p>
      {!Open ? (
        <div
          onClick={() => {
            dispatch(onOpen());
          }}
        >
          <HiViewGridAdd />
          노트 추가
        </div>
      ) : null}

      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      {hasMore && toggle
        ? note.map((item, index) => (
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
                <>
                  <span style={{ cursor: 'pointer' }}>
                    <Link href={`/book/${item._id}/note`}>{item.name}</Link>
                  </span>
                  <span style={{ color: 'red' }}>{item.cardID.length}</span>
                </>
              )}

              {item.name === update ? (
                <button
                  onClick={() => {
                    NoteUpdate(item._id);
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
                    NoteDelete(item._id);
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
        : hasMore && <Chart note={note} />}

      <div
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        체인지
      </div>
    </div>
  );
}
