'use client';

import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { IoAdd } from '@react-icons/all-files/io5/IoAdd';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';

import { onClose } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Note.module.css';
import { BtnNext, BtnPrev, TransitionEnd } from '@/utils/infiniteCarousel';
import { PostImage } from '@/utils/postImage';

import ImageDrag from '../ImageDrag';

const amys = [
  '/image/default/amys-1.avif',
  '/image/default/amys-2.avif',
  '/image/default/amys-3.avif',
  '/image/default/amys-4.avif',
  '/image/default/amys-5.avif',
];

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
    const { url, name } = await PostImage(file || undefined, id, 'note');

    await axios
      .post('/api/note', {
        id: id,
        name: noteName,
        image:
          image && url && name
            ? url + '/' + id + '/' + 'note' + '/' + name
            : image,
      })
      .then(res => {
        if (res.data.post) {
        }
      });
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      PostNote();
    },
    onSuccess: () => {
      dispatch(onClose());
      toast.success('노트 성공');
      queryClient.invalidateQueries({ queryKey: [`note-${id}`] });
    },
    onError: () => {
      toast.error('노트 에러');
    },
  });

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
          <div
            onClick={() => {
              mutate();
            }}
          >
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
