import Image from 'next/image';

export default function Vedio() {
  return (
    <div>
      <Image
        src={'/image/clip/clip.avif'}
        alt="clip"
        className="clip"
        width={50}
        height={64.5}
      />
      <div className="word_blog_banner">
        <Image
          src="/image/background/word_banner2.avif"
          alt="word_blog_banner"
          fill
        />
      </div>
    </div>
  );
}
