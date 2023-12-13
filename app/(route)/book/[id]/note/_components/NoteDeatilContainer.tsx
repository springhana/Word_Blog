'use client';

import { usePathname, useRouter } from 'next/navigation';

import CardDetail from '@/app/_components/card/CardDetail';
import MemoTab from '@/app/_components/MemoTab';
import { useNote } from '@/hook/useNote';

export default function NoteDeatilContainer() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;
  const router = useRouter();

  const { loading, error, note, hasMore } = useNote(id, 'note');
  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

      <div
        onClick={() => {
          router.back();
        }}
      >
        뒤로가기
      </div>

      {hasMore ? (
        <>
          <MemoTab />
          <div>{note[0].name}</div>
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
