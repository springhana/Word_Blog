'use client';

import { RiFilePaper2Line } from '@react-icons/all-files/ri/RiFilePaper2Line';

import { useTag } from '@/hook/useTag';
import { init_note } from '@/redux/features/noteSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { onOpen } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function AddWordBtn() {
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.idReducer.id);

  const { loading, error, tags, hasMore } = useTag(id, 'all');

  if (!id) {
    return null;
  }

  return (
    <div
      onClick={() => {
        dispatch(onOpen());

        if (!loading && !error && hasMore && tags[0]) {
          dispatch(tag_change({ id: tags[0]._id, name: tags[0].name }));
        } else {
          dispatch(tag_change({ id: '태그 추가', name: '태그 추가' }));
        }
        dispatch(init_note());
      }}
    >
      <RiFilePaper2Line />
      단어 추가
    </div>
  );
}
