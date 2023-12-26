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
          width={size}
          height={size}
          style={{
            borderRadius: '50%',
            border: '3px solid white',
          }}
          priority
        />
      ) : (
        <Image
          src={image}
          alt="profile image"
          width={size}
          height={size}
          style={{
            borderRadius: '50%',
            border: '3px solid white',
          }}
          priority
        />
      )}
    </div>
  );
}
