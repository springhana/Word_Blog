'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

import { useCard } from '@/hook/useCard';
import { useNote } from '@/hook/useNote';
import { select_note } from '@/redux/features/noteSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardType, NoteType } from '@/types/word_blog';

import ImagePaper from './ImagePaper';
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
  const [program, setProgram] = useState(0);
  const [paper, setPaper] = useState('');

  const dispatch = useAppDispatch();
  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);

  const editId = useAppSelector(state => state.writeReducer.editId);
  const { loading, error, card } = useCard(editId) as {
    loading: boolean;
    error: boolean;
    card: CardType;
  };
  const { note, hasMore } = useNote(editId, 'card') as {
    note: NoteType[];
    hasMore: boolean;
  };

  useEffect(() => {
    if (hasMore) {
      dispatch(tag_change({ id: card.tag, name: card.tag }));

      note.map((item: NoteType) => {
        dispatch(select_note({ id: item._id, name: item.name }));
      });

      setPaper(card.paper);
      setProgram(
        card.program === 'word' ? 1 : card.program === 'markdown' ? 2 : 0
      );
    }
  }, [hasMore]);

  useEffect(() => {
    if (!hasMore) {
      setProgram(0);
    }
  }, [tag]);

  return (
    <div>
      {tag.id !== 'all' && tag.id !== '태그 추가' ? (
        <div>
          <ImagePaper paper={paper} setPaper={setPaper} />
          <Note author={id} />

          {program <= 0 ? (
            <div>
              <div
                onClick={() => {
                  setProgram(1);
                }}
              >
                단어 카드
              </div>
              <div
                onClick={() => {
                  setProgram(2);
                }}
              >
                마크 다운 카드
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                setProgram(0);
              }}
            >
              뒤로가기
            </button>
          )}

          {program === 1 ? (
            <WordPaper
              tag={tag.id}
              id={id}
              program={program}
              paper={paper}
              card={card}
            />
          ) : null}
          {program === 2 ? (
            <MarkdownPaper
              tag={tag.id}
              id={id}
              program={program}
              paper={paper}
              card={card}
            />
          ) : null}
        </div>
      ) : null}
      {tag.id === '태그 추가' ? <TagAdd id={id} /> : null}
    </div>
  );
}
