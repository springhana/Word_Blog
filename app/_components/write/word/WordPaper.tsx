'use client';

import axios from 'axios';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { state_change } from '@/redux/features/cardSlice';
import {
  onClose,
  writeEditID_change,
  writeid_change,
  writetag_change,
} from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import stylse from '@/styles/Card.module.css';
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

  const ref_word = useRef<HTMLTextAreaElement>(null);
  const ref_meaning = useRef<HTMLTextAreaElement>(null);
  const ref_sentence = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const router = useRouter();
  const noteState = useAppSelector(state => state.noteReducer.select);

  useEffect(() => {
    if (card?._id) {
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

  const handleResizeHeight = (textarea: HTMLTextAreaElement) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  return (
    <div className={stylse.write_card}>
      <ImageDrag
        image={image}
        setImage={setImage}
        setFile={setFile}
        imgsize={150}
      />

      <div className={stylse.write_card_info}>
        <div>
          <textarea
            ref={ref_word}
            value={word}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (ref_word.current) {
                handleResizeHeight(ref_word.current);
              }
              setWord(e.target.value);
            }}
            placeholder="뜻"
            rows={1}
          />
        </div>
        <div>
          <textarea
            ref={ref_meaning}
            value={meaning}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (ref_meaning.current) {
                handleResizeHeight(ref_meaning.current);
              }
              setMeaning(e.target.value);
            }}
            placeholder="단어"
            rows={1}
          />
        </div>
        <div>
          <textarea
            ref={ref_sentence}
            value={sentence}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              if (ref_sentence.current) {
                handleResizeHeight(ref_sentence.current);
              }
              setSentence(e.target.value);
            }}
            placeholder="문장"
            rows={1}
          />
        </div>
      </div>

      <button
        className={stylse.post_btn}
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
