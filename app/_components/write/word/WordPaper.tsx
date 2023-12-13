'use client';

import axios from 'axios';
import { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { state_change } from '@/redux/features/cardSlice';
import {
  onClose,
  writeEditID_change,
  writeid_change,
  writetag_change,
} from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardType } from '@/types/word_blog';

import ImageDrag from '../../ImageDrag';

export default function WordPaper({
  tag,
  id,
  program,
  paper,
  card,
}: {
  tag: string;
  id: string;
  program: number;
  paper: string;
  card?: CardType;
}) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string | StaticImageData>('');

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const pathname = usePathname();
  const router = useRouter();
  const noteState = useAppSelector(state => state.noteReducer.select);

  useEffect(() => {
    if (card) {
      setWord(card.word || '');
      setMeaning(card.meaning || '');
      setSentence(card.sentence || '');
      setImage(card.image || 'default');
    }
  }, []);

  const CardPost = async () => {
    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${id}&state=card`)
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
      .post('/api/post/card/word', {
        word: word,
        meaning: meaning,
        sentence: sentence,
        tag: tag,
        id: id,
        note: select,
        paper: paper,
        program: program === 1 ? 'word' : 'markdown',
        image:
          image && fileurl && filename
            ? fileurl + '/' + id + '/' + 'card' + '/' + filename
            : 'default',
      })
      .then(res => {
        if (res.data.post) {
          setWord('');
          setMeaning('');
          setSentence('');
          dispatch(writeid_change(res.data.id));
          dispatch(writetag_change(tag));
          dispatch(onClose());
          dispatch(writeEditID_change(''));
        }
      });
  };

  const EditWord = async () => {
    if (!card) {
      return;
    }
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
        program: program === 1 ? 'word' : 'markdown',
        md: '',
        title: '',
        image:
          image && fileurl && filename
            ? fileurl + '/' + card.author + '/' + 'card' + '/' + filename
            : image,
      })
      .then(res => {
        if (res.data.update) {
          dispatch(onClose());
          dispatch(writeEditID_change(''));
          dispatch(state_change());
          router.push(`/detail/${card._id}`);
        }
      });
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div>
          <h5>단어</h5>
          <input
            type="text"
            value={word}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setWord(e.target.value);
            }}
          />
        </div>
        <div>
          <h5>뜻</h5>
          <input
            type="text"
            value={meaning}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMeaning(e.target.value);
            }}
          />
        </div>
        <div>
          <h5>문장</h5>
          <input
            type="text"
            value={sentence}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setSentence(e.target.value);
            }}
          />
        </div>
      </div>

      <ImageDrag image={image} setImage={setImage} setFile={setFile} />

      <button
        onClick={() => {
          if (card?._id) {
            EditWord();
          } else {
            CardPost();
          }
        }}
      >
        전송
      </button>
    </div>
  );
}
