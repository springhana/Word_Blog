'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { onClose } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import stylse from '@/styles/Card.module.css';
import { CardType } from '@/types/word_blog';
import { PostImage } from '@/utils/postImage';
import { WindowWidth } from '@/utils/windowWidth';

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
  const noteState = useAppSelector(state => state.noteReducer.select);

  const { windowWidth } = WindowWidth();

  const CardPost = async () => {
    const { url, name } = await PostImage(file || undefined, id);

    await axios.post('/api/post/card/word', {
      word: word,
      meaning: meaning,
      sentence: sentence,
      tag: tag,
      id: id,
      note: select,
      paper: paper,
      program: program === 1 ? 'word' : 'markdown',
      image:
        image && url && name
          ? url + '/' + id + '/' + 'card' + '/' + name
          : 'default',
    });
  };

  const EditWord = async () => {
    if (!card) {
      return;
    }

    const { url, name } = await PostImage(file || undefined, card.author);

    await axios.put('/api/card', {
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
        image && url && name
          ? url + '/' + card.author + '/' + 'card' + '/' + name
          : image,
    });
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: boolean) => {
      if (id) {
        EditWord();
      } else {
        CardPost();
      }
    },
    onSuccess: () => {
      if (card?._id) {
        queryClient.invalidateQueries({
          queryKey: [`card-detail-${card._id}`],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [`cards-${card?.tag ? card.tag : tag}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`cards-all`],
      });
      setWord('');
      setMeaning('');
      setSentence('');
      setFile(undefined);
      dispatch(onClose());
    },
  });

  const handleResizeHeight = (textarea: HTMLTextAreaElement) => {
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    if (card?._id) {
      setWord(card.word || '');
      setMeaning(card.meaning || '');
      setSentence(card.sentence || '');
      setImage(card.image || 'default');
    }
  }, [mutate]);

  return (
    <div className={stylse.write_card}>
      <ImageDrag
        image={image}
        setImage={setImage}
        setFile={setFile}
        imgsize={windowWidth <= 768 ? 80 : 150}
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
            mutate(true);
          } else {
            mutate(false);
          }
        }}
      >
        전송
      </button>
    </div>
  );
}
