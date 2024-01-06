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
      <video autoPlay muted loop className="home_vedio">
        <source src="video/homeBanner1.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
