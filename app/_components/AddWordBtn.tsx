'use client';

import { RiFilePaper2Line } from '@react-icons/all-files/ri/RiFilePaper2Line';

import { useTag } from '@/hook/useTag';
import { Init } from '@/redux/features/cardSlice';
import { init_note } from '@/redux/features/noteSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { onOpen } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Sidebar.module.css';

export default function AddWordBtn() {
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.idReducer.id);
  const tag = useAppSelector(state => state.tagReducer.tag);

  const { loading, error, tags, hasMore } = useTag(id, 'all');
  if (!id) {
    return null;
  }

  return (
    <div
      onClick={() => {
        dispatch(onOpen());

        if (!loading && !error && hasMore && tags[0]) {
          if (tag && tag.id !== 'all') {
            return;
          } else {
            dispatch(tag_change({ id: tags[0]._id, name: tags[0].name }));
          }
        } else {
          dispatch(tag_change({ id: '태그 추가', name: '태그 추가' }));
        }
        dispatch(Init());
        dispatch(init_note());
      }}
      className={styles.addBtn}
    >
      <RiFilePaper2Line />
      <span>단어 추가</span>
    </div>
  );
}
