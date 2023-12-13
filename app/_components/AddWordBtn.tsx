'use client';

import { RiFilePaper2Line } from '@react-icons/all-files/ri/RiFilePaper2Line';
import { useRouter } from 'next/navigation';

import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function AddWordBtn() {
  const dispatch = useAppDispatch();
  const id = useAppSelector(state => state.idReducer.id);
  const router = useRouter();

  if (!id) {
    return null;
  }

  return (
    <div
      onClick={() => {
        router.push(`/add`);
        dispatch(tag_change('태그 추가'));
      }}
    >
      <RiFilePaper2Line />
      단어 추가
    </div>
  );
}
