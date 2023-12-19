import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';
import Image from 'next/image';
import { useRef, useState } from 'react';

import Paper1 from '@/public/image/paper/paper1.png';
import Paper2 from '@/public/image/paper/paper2.png';
import Paper3 from '@/public/image/paper/paper3.png';
import Paper4 from '@/public/image/paper/paper4.png';
import Paper5 from '@/public/image/paper/paper5.png';
import Paper6 from '@/public/image/paper/paper6.png';
import styles from '@/styles/Write.module.css';
import { BtnNext, BtnPrev, TransitionEnd } from '@/utils/infiniteCarousel';

export default function ImagePaper({
  paper,
  setPaper,
}: {
  paper: string;
  setPaper: (paper: string) => void;
}) {
  const papers = [Paper1, Paper2, Paper3, Paper4, Paper5, Paper6];

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
            width={10000}
            height={10000}
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
            <Image src={item} alt="종이" width={10000} height={10000} />
            <input
              type="radio"
              name="paper"
              checked={'Paper' + (index + 1) === paper}
            />
          </div>
        ))}
        <div>
          <Image src={papers[0]} alt="종이" width={10000} height={10000} />
          <input type="radio" name="paper" />
        </div>
      </div>
    </div>
  );
}
