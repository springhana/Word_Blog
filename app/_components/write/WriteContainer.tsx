'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useCard } from '@/hook/useCard';
import { useNote } from '@/hook/useNote';
import markdown from '@/public/image/paper/markdown.png';
import { Init } from '@/redux/features/cardSlice';
import { select_note } from '@/redux/features/noteSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Write.module.css';
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
  const [program, setProgram] = useState(1);
  const [paper, setPaper] = useState('Paper1');
  const [currentIndex, setCurrentIndex] = useState(0);
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
    if (!loading && !error && hasMore && card._id) {
      dispatch(tag_change({ id: card.tag, name: card.tag }));
      dispatch(Init());

      note.map((item: NoteType) => {
        dispatch(select_note({ id: item._id, name: item.name }));
      });

      setPaper(card.paper);
      setProgram(
        card.program === 'word' ? 1 : card.program === 'markdown' ? 2 : 0
      );
      setCurrentIndex(3);
    }
  }, [hasMore]);

  useEffect(() => {
    if (!hasMore) {
      setProgram(1);
    }
  }, [tag]);

  return (
    <div className={styles.write}>
      {tag.id !== 'all' && tag.id !== '태그 추가' ? (
        <>
          {currentIndex === 0 && (
            <>
              <p>단어장 선택</p>
              <Note author={id} />
            </>
          )}
          {currentIndex === 1 && (
            <>
              <p>종이 선택</p>
              <ImagePaper paper={paper} setPaper={setPaper} />
            </>
          )}
          {currentIndex === 2 && (
            <>
              <p>종이 선택</p>
              <div className={styles.write_card}>
                <div
                  onClick={() => {
                    setProgram(1);
                  }}
                >
                  <span>기본 문법</span>
                  <div className={styles.write_card_word}></div>
                  <input type="radio" name="card" checked={program === 1} />
                </div>

                <div
                  onClick={() => {
                    setProgram(2);
                  }}
                >
                  <span>마크 다운</span>
                  <Image
                    src={markdown}
                    alt="마크다운"
                    width={10000}
                    height={10000}
                  />
                  <input type="radio" name="card" checked={program === 2} />
                </div>
              </div>
            </>
          )}
          {currentIndex === 3 && (
            <>
              <p>카드 작성</p>
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
            </>
          )}

          <button
            className={styles.prevBtn}
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
              }
            }}
            disabled={currentIndex <= 0}
          >
            이전
          </button>
          <button
            className={styles.nextBtn}
            onClick={() => {
              if (currentIndex < 3) {
                setCurrentIndex(currentIndex + 1);
              }
            }}
            disabled={currentIndex > 2}
          >
            다음
          </button>
        </>
      ) : (
        <TagAdd id={id} />
      )}
    </div>
  );
}
