'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { writeid_change, writetag_change } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import ImageDrag from '../../ImageDrag';

export default function WordPaper({
  tag,
  id,
  paper,
}: {
  tag: string;
  id: string;
  paper: string;
}) {
  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sentence, setSentence] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState('');

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const pathname = usePathname();
  const router = useRouter();

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
          if (pathname && pathname.split('/')[1] == 'add') {
            router.push('/');
            dispatch(writetag_change('all'));
          }
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

      <button onClick={CardPost}>전송</button>
    </div>
  );
}
