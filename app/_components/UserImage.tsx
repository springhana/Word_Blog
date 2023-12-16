import Image, { StaticImageData } from 'next/image';

import defaut_img from '@/public/image/default.png';

export default function UserImage({
  image,
  size,
}: {
  image: StaticImageData | string;
  size: number;
}) {
  return (
    <div>
      {image === 'default' || !image ? (
        <Image
          src={defaut_img}
          alt="blabla Logo"
          width={10000}
          height={10000}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
          }}
          priority
        />
      ) : (
        <Image
          src={image}
          alt="profile image"
          width={10000}
          height={10000}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: '50%',
          }}
          priority
        />
      )}
    </div>
  );
}
