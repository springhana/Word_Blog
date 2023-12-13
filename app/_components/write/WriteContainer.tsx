'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { init_note } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import TagAdd from './tag/TagAdd';

const WordPaper = dynamic(
  () => import('./word/WordPaper').then(mod => mod.default),
  { ssr: false }
);

const MarkdownPaper = dynamic(
  () => import('./markdown/MarkdownPaper').then(mod => mod.default),
  { ssr: false }
);

const Note = dynamic(() => import('../Note').then(mod => mod.default), {
  ssr: false,
});

export default function WriteContainer() {
  const [paper, setPaper] = useState(0);

  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);

  useEffect(() => {
    dispatch(init_note());
    setPaper(0);
  }, [tag]);

  return (
    <div>
      {tag !== 'all' && tag !== '태그 추가' ? (
        <div>
          <Note author={id} />

          {paper <= 0 ? (
            <div>
              <div
                onClick={() => {
                  setPaper(1);
                }}
              >
                단어 카드
              </div>
              <div
                onClick={() => {
                  setPaper(2);
                }}
              >
                마크 다운 카드
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setPaper(0);
              }}
            >
              뒤로가기
            </button>
          )}

          {paper === 1 ? <WordPaper tag={tag} id={id} paper={'word'} /> : null}
          {paper === 2 ? (
            <MarkdownPaper tag={tag} id={id} paper={'markdown'} />
          ) : null}
        </div>
      ) : null}
      {tag === '태그 추가' ? <TagAdd id={id} /> : null}
    </div>
  );
}
