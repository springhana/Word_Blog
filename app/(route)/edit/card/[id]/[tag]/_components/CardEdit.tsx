'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Note from '@/app/_components/Note';
import { useCard } from '@/hook/useCard';
import { useNote } from '@/hook/useNote';
import { select_note } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardType, NoteType } from '@/types/word_blog';

import ItemMd from './card/ItemMd';
import ItemWord from './card/ItemWord';

export default function CardEdit() {
  const pathname = usePathname();
  const _id = pathname?.split('/')[3] as string;
  const tag = pathname?.split('/')[4] as string;
  const { loading, error, card } = useCard(_id) as {
    loading: boolean;
    error: boolean;
    card: CardType;
  };
  const { note, hasMore } = useNote(card._id, 'card') as {
    note: NoteType[];
    hasMore: boolean;
  };

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const [md, setMd] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const noteState = useAppSelector(state => state.noteReducer.select);

  useEffect(() => {
    setImage(card.image || 'defalut');
  }, [loading]);

  const EditWord = async () => {
    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${card.author}&state=card`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, { method: 'POST', body: formData });
        })
        .then(res => {
          fileurl = res.url;
        });
    }

    await axios
      .put('/api/card', {
        author: card.author,
        id: card._id,
        word: word,
        meaning: meaning,
        sentence: sentence,
        memorize: card.memorize,
        date: card.date,
        note: noteState,
        paper: card.paper,
        image:
          image && fileurl && filename
            ? fileurl + '/' + card.author + '/' + 'card' + '/' + filename
            : 'default',
      })
      .then(res => {
        if (res.data.update) {
          router.back();
        }
      });
  };

  const EditMd = async () => {
    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${card.author}&state=card`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, { method: 'POST', body: formData });
        })
        .then(res => {
          fileurl = res.url;
        });
    }

    await axios
      .put('/api/card', {
        author: card.author,
        id: _id,
        md: md,
        title: title,
        memorize: card.memorize,
        date: card.date,
        note: noteState,
        paper: card.paper,
        image:
          image && fileurl && filename
            ? fileurl + '/' + card.author + '/' + 'card' + '/' + filename
            : 'default',
      })
      .then(res => {
        if (res.data.update) {
          router.back();
        }
      });
  };

  useEffect(() => {
    if (tag === 'markdown') {
      setTitle(card.title || '');
      setMd(card.md || '');
    } else {
      setWord(card.word || '');
      setMeaning(card.meaning || '');
      setSentence(card.sentence || '');
    }
    setImage(card.image || 'default');
  }, [card.word, card.meaning, card.md, tag]);

  useEffect(() => {
    note.map((item: NoteType) => {
      dispatch(select_note({ id: item._id, name: item.name }));
    });
  }, [hasMore]);

  if (error) {
    return <div>에러남</div>;
  }

  return (
    <div>
      {loading ? (
        '로딩중'
      ) : (
        <div>
          {card.paper === 'markdown' ? (
            <ItemMd
              md={md}
              title={title}
              image={image}
              setMd={setMd}
              setTitle={setTitle}
              setImage={setImage}
              setFile={setFile}
            />
          ) : (
            <ItemWord
              setWord={setWord}
              setMeaning={setMeaning}
              setSentence={setSentence}
              setImage={setImage}
              setFile={setFile}
              value={word}
              meaning={meaning}
              sentence={sentence}
              image={image}
            />
          )}
          <div>{card.date}</div>
          <div>{card.memorize ? '외웠음' : '아직 못외었음'}</div>
          <Note author={card.author} />
          <button
            onClick={() => {
              if (card.paper === 'markdown') {
                EditMd();
              } else {
                EditWord();
              }
            }}
          >
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
