'use client';

import { FaCameraRetro } from '@react-icons/all-files/fa/FaCameraRetro';
import { useRef } from 'react';

import stylse from '@/styles/Images.module.css';

export default function ImageEdit({
  handleFileChange,
  imgsize,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgsize?: number;
}) {
  const imageInput = useRef<HTMLInputElement>(null);

  return (
    <div
      className={stylse.image_edit}
      onClick={() => {
        if (imageInput.current) {
          imageInput.current.click();
        }
      }}
    >
      <input
        ref={imageInput}
        type="file"
        name="profile"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <span>{imgsize && `${imgsize} x ${imgsize}`}</span>
      <FaCameraRetro size={25} />
    </div>
  );
}
