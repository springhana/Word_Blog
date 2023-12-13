'use client';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

import { ObjectId } from 'mongodb';
import { usePathname } from 'next/navigation';

import Md from '@/app/(route)/detail/[id]/_components/card/Md';
import Word from '@/app/(route)/detail/[id]/_components/card/Word';
import { useCard } from '@/hook/useCard';
import { useAppSelector } from '@/redux/hook';
import { CardType } from '@/types/word_blog';

import CardNote from './CardNote';
import MdItem from './markdown/MdItem';
import WordItem from './word/WordItem';

export default function CardDetail({ id }: { id?: string | ObjectId }) {
  const memorize = useAppSelector(state => state.cardReducer.memorize);
  const pathname = usePathname();
  const _id = pathname?.split('/')[2] as string;

  const { loading, error, card } = useCard(id ? id : _id) as {
    loading: boolean;
    error: boolean;
    card: CardType;
  };

  return (
    <div>
      {error ? '에러' : null}
      {loading ? (
        '로딩중'
      ) : (
        <div style={{ position: 'relative' }}>
          {id ? (
            card.program === 'word' ? (
              <WordItem item={card} memorize={memorize} />
            ) : (
              <MdItem item={card} memorize={memorize} />
            )
          ) : card.program === 'word' ? (
            <Word item={card} />
          ) : (
            <Md item={card} />
          )}
          {!id ? <CardNote id={card._id as string | ObjectId} /> : null}
        </div>
      )}
    </div>
  );
}
