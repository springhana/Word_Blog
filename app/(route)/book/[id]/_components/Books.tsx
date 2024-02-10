'use client';

import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import ImageDrag from '@/app/_components/ImageDrag';
import { SkeletonNote } from '@/app/_components/loading/skeleton/SkeletonNote';
import styles from '@/styles/Book.module.css';
import { NoteType } from '@/types/word_blog';

interface IBooksProps {
  loading: boolean;
  error: boolean;
  note: NoteType[];
  update: string;
  setUpdate: (update: string) => void;
  remove: string;
  setRemove: (remove: string) => void;
  value: string;
  setValue: (value: string) => void;
  image: string | StaticImageData;
  setImage: (image: string | StaticImageData) => void;
  setFile: (file: File | undefined) => void;
  mutate: ({ id, type }: { id: string; type: boolean }) => void;
}

export const Books = ({
  loading,
  error,
  note,
  update,
  setUpdate,
  remove,
  setRemove,
  value,
  setValue,
  image,
  setImage,
  setFile,
  mutate,
}: IBooksProps) => {
  const router = useRouter();

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

  if (loading) {
    return note?.map(item => <SkeletonNote key={item._id} />);
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
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
  );
};
