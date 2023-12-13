'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import { change_state, onClose } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import ImageDrag from '../ImageDrag';

export default function NoteModal() {
  const [noteName, setNoteName] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState('');

  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.noteReducer.Open);
  const id = useAppSelector(state => state.idReducer.id);

  useEffect(() => {
    dispatch(onClose());
  }, []);

  const PostNote = async () => {
    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${id}&state=note`)
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
      .post('/api/note', {
        id: id,
        name: noteName,
        image:
          image && fileurl && filename
            ? fileurl + '/' + id + '/' + 'note' + '/' + filename
            : 'default',
      })
      .then(res => {
        if (res.data.post) {
          dispatch(onClose());
          dispatch(change_state());
        }
      });
  };

  if (!Open) {
    return null;
  }

  return (
    <div style={{ border: '1px solid red' }}>
      <div
        onClick={() => {
          dispatch(onClose());
        }}
      >
        취소
      </div>
      <p>단어장 추가</p>
      <ImageDrag image={image} setImage={setImage} setFile={setFile} />
      <input
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setNoteName(e.target.value);
        }}
      />
      <button onClick={PostNote}>추가</button>
    </div>
  );
}
