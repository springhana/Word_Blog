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
          width={1000}
          height={1000}
          style={{ width: '100%', height: '100%' }}
          priority
        />
      ) : (
        <Image
          src={image}
          alt="profile image"
          width={1000}
          height={1000}
          style={{ width: '100%', height: '100%' }}
          priority
        />
      )}
    </>
  );
}
