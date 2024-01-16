'use client';

import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';

import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import { ObjectId } from 'mongodb';
import { usePathname, useRouter } from 'next/navigation';

import Md from '@/app/(route)/detail/[id]/_components/card/Md';
import Word from '@/app/(route)/detail/[id]/_components/card/Word';
import { useCard } from '@/hook/useCard';
import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/CardDetail.module.css';
import { CardType } from '@/types/word_blog';

import CardNote from './CardNote';
import MdItem from './markdown/MdItem';
import WordItem from './word/WordItem';

export default function CardDetail({ id }: { id?: string | ObjectId }) {
  const memorize = useAppSelector(state => state.cardReducer.memorize);
  const pathname = usePathname();
  const _id = pathname?.split('/')[2] as string;
  const router = useRouter();
  const { loading, error, card } = useCard(id ? id : _id) as {
    loading: boolean;
    error: boolean;
    card: CardType;
  };

  return (
    <div>
      {!id && (
        <div
          className="back"
          onClick={() => {
            router.back();
          }}
          style={{ borderBottom: '2px solid #dae1e2' }}
        >
          <IoArrowBack />
          <span>뒤로가기</span>
        </div>
      )}

      {error && loading ? null : (
        <div className={styles.card}>
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
          {!id ? (
            <div className={styles.note}>
              <CardNote id={card._id as string | ObjectId} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
