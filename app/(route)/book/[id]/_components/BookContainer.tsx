'use client';
import { BsBarChart } from '@react-icons/all-files/bs/BsBarChart';
import { BsBarChartFill } from '@react-icons/all-files/bs/BsBarChartFill';
import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ImageDrag from '@/app/_components/ImageDrag';
import { useNote } from '@/hook/useNote';
import { setTitle } from '@/redux/features/headerSlice';
import { onOpen } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Book.module.css';
import { NoteType } from '@/types/word_blog';
import { PostImage } from '@/utils/postImage';

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
  const router = useRouter();

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

  const bookBackground = (index: number) => {
    if (index % 2 == 0) {
      return {
        background: "no-repeat center url('/image/book/book1.avif')",
        backgroundSize: 'contain',
      };
    } else {
      return {
        background: "no-repeat center url('/image/book/book2.avif')",
        backgroundSize: 'contain',
      };
    }
  };

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

      {!loading && !error && hasMore && toggle ? (
        <div className={styles.books_inner}>
          {note.map((item: NoteType, index: number) => (
            <div key={index} className={styles.book_item_container}>
              <div
                className={styles.book_item}
                key={index}
                style={bookBackground(index)}
              >
                {item.name === update ? (
                  <div className={styles.book_update}>
                    <div>
                      <ImageDrag
                        image={image}
                        setImage={setImage}
                        setFile={setFile}
                        imgsize={100}
                      />
                    </div>
                    <input
                      type="text"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setValue(e.target.value);
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div
                      onClick={() => {
                        router.push(`/book/${item._id}/note`);
                      }}
                    >
                      {item.image === 'default' || !item.image ? null : (
                        <Image
                          src={item.image}
                          alt={item.image}
                          width={10000}
                          height={10000}
                          className={styles.book_item_img}
                        />
                      )}
                    </div>

                    <span className={styles.book_title}>
                      {item.name} <span>{`( ${item.cardID.length} )`}</span>
                    </span>
                  </>
                )}
              </div>

              <div className={styles.book_btn}>
                {item.name === update ? (
                  <button
                    onClick={() => {
                      mutate({ id: item._id, type: false });
                    }}
                    className={styles.btn_ok}
                  >
                    확인
                  </button>
                ) : item.name === remove ? (
                  <button
                    onClick={() => {
                      setRemove('');
                    }}
                    className={styles.btn_cancel}
                  >
                    취소
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setUpdate(item.name);
                      setValue(item.name);
                      if (item.image) {
                        setImage(item.image);
                      }
                    }}
                    className={styles.btn_ok}
                  >
                    수정
                  </button>
                )}
                {item.name === remove ? (
                  <button
                    onClick={() => {
                      mutate({ id: item._id, type: true });
                    }}
                    className={styles.btn_ok}
                  >
                    확인
                  </button>
                ) : item.name === update ? (
                  <button
                    onClick={() => {
                      setUpdate('');
                    }}
                    className={styles.btn_cancel}
                  >
                    취소
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setRemove(item.name);
                    }}
                    className={styles.btn_ok}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        hasMore && <Chart note={note} />
      )}
    </div>
  );
}
