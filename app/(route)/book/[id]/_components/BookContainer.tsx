'use client';
import { BsBarChart } from '@react-icons/all-files/bs/BsBarChart';
import { BsBarChartFill } from '@react-icons/all-files/bs/BsBarChartFill';
import { HiViewGridAdd } from '@react-icons/all-files/hi/HiViewGridAdd';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import ImageDrag from '@/app/_components/ImageDrag';
import NoteModal from '@/app/_components/modal/NoteModal';
import { useNote } from '@/hook/useNote';
import { setTitle } from '@/redux/features/headerSlice';
import { change_state, onOpen } from '@/redux/features/noteSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Book.module.css';

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
            return await fetch(res.data.url, {
              method: 'POST',
              body: formData,
            });
          })
          .then(res => {
            fileurl = res.url;
          });
      }

      await axios
        .put('/api/note', {
          id: id,
          name: value,
          image:
            image && fileurl && filename
              ? fileurl + '/' + id + '/' + 'note' + '/' + filename
              : image,
        })
        .then(res => {
          if (res.data.update) {
            setUpdate('');
            setValue('');
            dispatch(change_state());
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  const NoteDelete = async (id: string) => {
    try {
      await axios.delete('/api/note', { params: { id: id } }).then(res => {
        if (res.data.delete) {
          setRemove('');
          dispatch(change_state());
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const bookBackground = (index: number) => {
    if (index % 2 == 0) {
      return {
        background: "no-repeat center url('/image/book/book1.png')",
        backgroundSize: 'contain',
      };
    } else {
      return {
        background: "no-repeat center url('/image/book/book2.png')",
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
          {note.map((item, index) => (
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
                      NoteUpdate(item._id);
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
                      NoteDelete(item._id);
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
