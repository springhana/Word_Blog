'use client';

import { BsBarChart } from '@react-icons/all-files/bs/BsBarChart';
import { BsBarChartFill } from '@react-icons/all-files/bs/BsBarChartFill';
import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useNote } from '@/hook/useNote';
import { setTitle } from '@/redux/features/headerSlice';
import { onOpen } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Book.module.css';
import { PostImage } from '@/utils/postImage';

import { Books } from './Books';

const NoteModal = dynamic(
  () => import('@/app/_components/modal/NoteModal').then(mod => mod.default),
  { ssr: false }
);

const Chart = dynamic(() => import('./Chart').then(mod => mod.default), {
  ssr: false,
});

export default function BookContainer() {
  const pathname = usePathname();
  const id = pathname?.split('/')[2] as string;
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.noteReducer.Open);
  const write_open = useAppSelector(state => state.writeReducer.Open);

  const [update, setUpdate] = useState('');
  const [remove, setRemove] = useState('');
  const [value, setValue] = useState('');
  const [toggle, setToggle] = useState(true);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [image, setImage] = useState<string | StaticImageData>('');

  const { loading, error, note, hasMore } = useNote(id, 'user');
  useEffect(() => {
    dispatch(setTitle('book'));
  }, []);

  const NoteUpdate = async (id: string) => {
    try {
      const { url, name } = await PostImage(file || undefined, id, 'note');

      await axios.put('/api/note', {
        id: id,
        name: value,
        image:
          image && url && name
            ? url + '/' + id + '/' + 'note' + '/' + name
            : image,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const NoteDelete = async (id: string) => {
    try {
      await axios.delete('/api/note', { params: { id: id } });
    } catch (error) {
      console.error(error);
    }
  };
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async ({ id, type }: { id: string; type: boolean }) => {
      if (type) {
        NoteDelete(id);
      } else {
        NoteUpdate(id);
      }
    },
    onSuccess: () => {
      setUpdate('');
      setValue('');
      setRemove('');
      toast.success('노트 성공');
      queryClient.invalidateQueries({ queryKey: [`note-${id}`] });
    },
    onError: () => {
      toast.error('노트 에러');
    },
  });

  return (
    <div className={styles.book_container}>
      <div className={styles.book_change}>
        <div
          onClick={() => {
            if (toggle) {
              setToggle(false);
            } else {
              setToggle(true);
            }
          }}
          className={styles.change_btn}
        >
          {toggle ? <BsBarChart size={20} /> : <BsBarChartFill size={20} />}
        </div>
      </div>
      <div className={styles.book_add}>
        {!Open ? (
          <div
            onClick={() => {
              dispatch(onOpen());
            }}
          >
            <HiViewGridAdd />
            노트 추가
          </div>
        ) : null}
      </div>

      {write_open ? null : <NoteModal />}

      {hasMore && toggle ? (
        <Books
          loading={loading}
          error={error}
          note={note}
          update={update}
          setUpdate={setUpdate}
          remove={remove}
          setRemove={setRemove}
          value={value}
          setValue={setValue}
          image={image}
          setImage={setImage}
          setFile={setFile}
          mutate={mutate}
        />
      ) : (
        hasMore && <Chart note={note} />
      )}
    </div>
  );
}
