'use client';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoAdd } from '@react-icons/all-files/io5/IoAdd';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';

import amys_1 from '@/public/image/default/amys-1.jpg';
import amys_2 from '@/public/image/default/amys-2.jpg';
import amys_3 from '@/public/image/default/amys-3.jpg';
import amys_4 from '@/public/image/default/amys-4.jpg';
import amys_5 from '@/public/image/default/amys-5.jpg';
import amys_6 from '@/public/image/default/amys-6.jpg';
import amys_7 from '@/public/image/default/amys-7.jpg';
import { change_state, onClose } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Note.module.css';
import { BtnNext, BtnPrev, TransitionEnd } from '@/utils/infiniteCarousel';

import ImageDrag from '../ImageDrag';

const amys = [amys_1, amys_2, amys_3, amys_4, amys_5, amys_6, amys_7];

export default function NoteModal() {
  const [noteName, setNoteName] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string | StaticImageData>('');
  const [currentIndex, setCurrentIndex] = useState(1);

  const ref_all = useRef<HTMLDivElement>(null);
  const ref_one = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.noteReducer.Open);
  const id = useAppSelector(state => state.idReducer.id);

  useEffect(() => {
    dispatch(onClose());
  }, []);

  const PostNote = async () => {
    const radnum = Math.floor(Math.random() * 7);
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
            : amys[radnum],
      })
      .then(res => {
        if (res.data.post) {
          dispatch(onClose());
          dispatch(change_state());
        }
      });
  };

  const handlePrevSlide = () => {
    if (ref_all.current && ref_one.current) {
      BtnPrev(ref_all.current, ref_one.current, currentIndex, setCurrentIndex);
    }
  };

  const handleNextSlide = () => {
    if (ref_all.current && ref_one.current) {
      BtnNext(
        ref_all.current,
        ref_one.current,
        currentIndex,
        setCurrentIndex,
        amys.length
      );
    }
  };

  const handleTransitionEnd = () => {
    if (ref_all.current && ref_one.current) {
      TransitionEnd(
        ref_all.current,
        ref_one.current,
        currentIndex,
        setCurrentIndex,
        amys.length
      );
    }
  };

  if (!Open) {
    return null;
  }

  return (
    <div className={styles.note_modal}>
      <button onClick={handlePrevSlide}>
        <IoIosArrowBack size={20} />
      </button>
      <button onClick={handleNextSlide}>
        <IoIosArrowForward size={20} />
      </button>

      <div
        className={styles.note_default_image}
        ref={ref_all}
        onTransitionEnd={handleTransitionEnd}
      >
        <div>
          <Image
            src={amys[amys.length - 1]}
            alt="배너"
            width={80}
            height={80}
          />
          <input type="radio" name="amys" />
        </div>
        {amys.map((item, index) => {
          if (index === 4) {
            return (
              <div key={index} ref={ref_one}>
                <ImageDrag
                  image={image}
                  setImage={setImage}
                  setFile={setFile}
                  imgsize={100}
                />
              </div>
            );
          } else {
            return (
              <div
                key={index}
                onClick={() => {
                  setImage(item);
                }}
              >
                <Image src={item} alt="배너" width={80} height={80} />
                <input type="radio" name="amys" checked={image === item} />
              </div>
            );
          }
        })}
        <div>
          <Image src={amys[0]} alt="배너" width={80} height={80} />
          <input type="radio" name="amys" />
        </div>
      </div>

      <div className={styles.note_input}>
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNoteName(e.target.value);
          }}
        />
        <div className={styles.note_input_btn}>
          <div onClick={PostNote}>
            <IoAdd size={25} />
          </div>
          <div
            onClick={() => {
              dispatch(onClose());
            }}
          >
            <IoClose size={25} />
          </div>
        </div>
      </div>
    </div>
  );
}
