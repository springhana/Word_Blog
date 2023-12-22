'use client';

import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import CardDetail from '@/app/_components/card/CardDetail';
import MemoTab from '@/app/_components/MemoTab';
import { useNote } from '@/hook/useNote';
import { setTitle } from '@/redux/features/headerSlice';
import { useAppDispatch } from '@/redux/hook';

export default function NoteDeatilContainer() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, error, note, hasMore } = useNote(id, 'note');

  useEffect(() => {
    if (!loading && !error && hasMore) {
      dispatch(setTitle(note[0].name));
    }
  }, [hasMore]);

  return (
    <div>
      <div
        className="back"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
        <span>뒤로가기</span>
      </div>
      {!loading && !error && hasMore ? (
        <>
          <div className="memoTab">
            <MemoTab />
          </div>

          {note[0].cardID.map((item, index) => (
            <div key={index}>
              <CardDetail id={item} />
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
}
