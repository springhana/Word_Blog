import Image from 'next/image';

import Clip from '@/public/image/clip.png';

export default function Vedio() {
  return (
    <div>
      <Image src={Clip} alt="clip" className="clip" />
      <video autoPlay muted loop className="home_vedio">
        <source src="video/homeBanner1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
