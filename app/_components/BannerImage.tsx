import Image, { StaticImageData } from 'next/image';

export default function BannerImage({
  image,
}: {
  image: StaticImageData | string;
}) {
  return (
    <>
      {image === 'default' || !image ? (
        <Image
          src={'/image/user/banner_default.avif'}
          alt="bannerImage"
          fill
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VA8AAmkBc7YFeIIAAAAASUVORK5CYII="
          priority
        />
      ) : (
        <Image
          src={image}
          alt="profile image"
          fill
          placeholder="blur"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8VA8AAmkBc7YFeIIAAAAASUVORK5CYII="
          priority
        />
      )}
    </>
  );
}
