'use client';

import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';

import { useNote } from '@/hook/useNote';
import { delete_note, onOpen, select_note } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { NoteType } from '@/types/word_blog';

export default function Note({ author }: { author: string }) {
  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const Open = useAppSelector(state => state.noteReducer.Open);
  const tag = useAppSelector(state => state.tagReducer.tag);
  const { loading, error, note, hasMore } = useNote(author, 'user');

  const selectNote = (name: string, id: string) => {
    if (
      select.some(
        selectItme => selectItme.id === id && selectItme.name === name
      )
    ) {
      dispatch(delete_note({ id: id, name: name }));
    } else {
      dispatch(select_note({ id: id, name: name }));
    }
  };

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

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

      {hasMore
        ? note.map((item: NoteType, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  selectNote(item.name, item._id);
                }}
                style={
                  select.some(
                    selectItme =>
                      selectItme.id === item._id &&
                      selectItme.name === item.name
                  )
                    ? { color: 'red' }
                    : { color: 'black' }
                }
              >
                {item.name}
              </div>
            );
          })
        : null}
    </div>
  );
}
