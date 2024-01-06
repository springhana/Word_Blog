import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import Image from 'next/image';
import { useRef, useState } from 'react';

import styles from '@/styles/Write.module.css';
import { BtnNext, BtnPrev, TransitionEnd } from '@/utils/infiniteCarousel';

export default function ImagePaper({
  paper,
  setPaper,
}: {
  paper: string;
  setPaper: (paper: string) => void;
}) {
  const papers = [
    '/image/paper/paper1.avif',
    '/image/paper/paper2.avif',
    '/image/paper/paper3.avif',
    '/image/paper/paper4.avif',
    '/image/paper/paper5.avif',
    '/image/paper/paper6.avif',
  ];

  const [currentIndex, setCurrentIndex] = useState(1);

  const ref_all = useRef<HTMLDivElement>(null);
  const ref_one = useRef<HTMLDivElement>(null);

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
        papers.length
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
        papers.length
      );
    }
  };
  return (
    <div className={styles.write_paper}>
      <button onClick={handlePrevSlide}>
        <IoIosArrowBack size={20} />
      </button>
      <button onClick={handleNextSlide}>
        <IoIosArrowForward size={20} />
      </button>

      <div
        ref={ref_all}
        onTransitionEnd={handleTransitionEnd}
        className={styles.write_paper_inner}
      >
        <div>
          <Image
            src={papers[papers.length - 1]}
            alt="종이"
            width={310}
            height={235}
          />
          <input type="radio" name="paper" />
        </div>
        {papers.map((item, index) => (
          <div
            key={index}
            ref={ref_one}
            onClick={() => {
              setPaper('Paper' + (index + 1));
            }}
          >
            <Image src={item} alt="종이" width={310} height={235} />
            <input
              type="radio"
              name="paper"
              checked={'Paper' + (index + 1) === paper}
            />
          </div>
        ))}
        <div>
          <Image src={papers[0]} alt="종이" width={310} height={235} />
          <input type="radio" name="paper" />
        </div>
      </div>
    </div>
  );
}
