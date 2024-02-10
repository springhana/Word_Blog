import Image, { StaticImageData } from 'next/image';

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
          src={'/image/user/default.avif'}
          alt="blabla Logo"
          width={size}
          height={size}
          style={{
            borderRadius: '50%',
            border: '3px solid white',
          }}
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VA8AAmkBc7YFeIIAAAAASUVORK5CYII="
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
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VA8AAmkBc7YFeIIAAAAASUVORK5CYII="
        />
      )}
    </div>
  );
}
