'use client';

import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';
import Image from 'next/image';

import { useNote } from '@/hook/useNote';
import { delete_note, onOpen, select_note } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Note.module.css';
import { NoteType } from '@/types/word_blog';

import NoteModal from './modal/NoteModal';

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

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>Loading</div>;
  }

  return (
    <div className={styles.note}>
      <div className={styles.note_add}>
        {!Open ? (
          <div
            className={styles.note_add_btn}
            onClick={() => {
              dispatch(onOpen());
            }}
          >
            <HiViewGridAdd />
            노트 추가
          </div>
        ) : null}
        <div className={styles.note_modal}>
          <NoteModal />
        </div>
      </div>

      <div className={styles.note_inner}>
        {hasMore
          ? note.map((item: NoteType, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    selectNote(item.name, item._id);
                  }}
                  className={styles.note_item}
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
                  {item.image ||
                  item.image !== 'default' ||
                  item.image !== null ? (
                    <Image
                      src={item.image}
                      alt={item.image}
                      width={60}
                      height={60}
                    />
                  ) : null}

                  {item.name}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
