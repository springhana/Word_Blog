'use client';

import Image from 'next/image';

import { WindowWidth } from '@/utils/windowWidth';

import AddWordBtn from './AddWordBtn';

export default function Vedio() {
  const { windowWidth } = WindowWidth();

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
          src="/image/background/word_banner.avif"
          alt="word_blog_banner"
          fill
        />
      </div>
      {windowWidth < 764 && <AddWordBtn />}
    </div>
  );
}
