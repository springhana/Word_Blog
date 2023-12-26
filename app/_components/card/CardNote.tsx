'use clinet';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

import { useNote } from '@/hook/useNote';
import { NoteType } from '@/types/word_blog';
import { BtnNext, BtnPrev, TransitionEnd } from '@/utils/infiniteCarousel';

export default function CardNote({ id }: { id: string | ObjectId }) {
  const router = useRouter();
  const ref_all = useRef<HTMLDivElement>(null);
  const ref_one = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  const { loading, error, note, hasMore } = useNote(id, 'card') as {
    loading: boolean;
    error: boolean;
    note: NoteType[];
    hasMore: boolean;
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
        note.length
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
        note.length
      );
    }
  };

  return (
    <>
      <button onClick={handlePrevSlide}>
        <IoIosArrowBack size={20} />
      </button>
      <button onClick={handleNextSlide}>
        <IoIosArrowForward size={20} />
      </button>
      <span ref={ref_all} onTransitionEnd={handleTransitionEnd}>
        {!loading && !error && hasMore && note.length > 0 && (
          <>
            <div>
              <div>
                {note[note.length - 1].image ? (
                  <Image
                    src={note[note.length - 1].image}
                    alt={note[note.length - 1].image}
                    width={100}
                    height={100}
                  />
                ) : null}
                {note[note.length - 1].name}
              </div>
            </div>
            {note?.map((item, index) => (
              <div key={index} ref={ref_one}>
                <div
                  onClick={() => {
                    router.push(`/book/${item._id}/note`);
                  }}
                >
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.image}
                      width={100}
                      height={100}
                    />
                  ) : null}
                  {item.name}
                </div>
              </div>
            ))}
            <div>
              <div>
                {note[0].image ? (
                  <Image
                    src={note[0].image}
                    alt={note[0].image}
                    width={100}
                    height={100}
                  />
                ) : null}
                {note[0].name}
              </div>
            </div>
          </>
        )}
      </span>
    </>
  );
}
