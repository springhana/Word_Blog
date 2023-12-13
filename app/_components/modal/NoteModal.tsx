'use client';

import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

import amys_1 from '@/public/image/default/amys-1.jpg';
import amys_2 from '@/public/image/default/amys-2.jpg';
import amys_3 from '@/public/image/default/amys-3.jpg';
import amys_4 from '@/public/image/default/amys-4.jpg';
import amys_5 from '@/public/image/default/amys-5.jpg';
import amys_6 from '@/public/image/default/amys-6.jpg';
import amys_7 from '@/public/image/default/amys-7.jpg';
import { change_state, onClose } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import ImageDrag from '../ImageDrag';

const amys = [amys_1, amys_2, amys_3, amys_4, amys_5, amys_6, amys_7];

export default function NoteModal() {
  const [noteName, setNoteName] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string | StaticImageData>(amys_1);

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
            : image,
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

      {amys.map((item, index) => (
        <div key={index}>
          <Image src={item} alt="배너" width={100} />
          <input
            type="radio"
            name="amys"
            checked={image === item}
            onChange={() => {
              setImage(item);
            }}
          />
        </div>
      ))}
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
