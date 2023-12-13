import Image from 'next/image';

import Paper1 from '@/public/image/paper/paper1.png';
import Paper2 from '@/public/image/paper/paper2.png';

export default function ImagePaper({
  paper,
  setPaper,
}: {
  paper: string;
  setPaper: (paper: string) => void;
}) {
  const papers = [
    Paper1,
    Paper2,
    // Paper3,
    // Paper4,
    // Paper5,
    // Paper6,
    // Paper7,
    // Paper8,
  ];
  return (
    <div>
      {papers.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            onChange={() => {
              setPaper('Paper' + (index + 1));
            }}
            checked={'Paper' + (index + 1) === paper}
          />
          <Image src={item} alt="종이" width={350} />
        </div>
      ))}
    </div>
  );
}
