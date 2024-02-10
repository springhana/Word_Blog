'use client';

import { FaCameraRetro } from '@react-icons/all-files/fa/FaCameraRetro';
import { useRef, useState } from 'react';

import { Loader } from '@/app/_components/loading/Loader';
import stylse from '@/styles/Images.module.css';

export default function ImageEdit({
  handleFileChange,
  imgsize,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imgsize?: number;
}) {
  const imageInput = useRef<HTMLInputElement>(null);
  const [isFile, setIsFile] = useState(false);
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
        onChange={e => {
          handleFileChange(e);
          setIsFile(true);
        }}
        style={{ display: 'none' }}
      />
      {isFile ? (
        <Loader />
      ) : (
        <>
          <span>{imgsize && `${imgsize} x ${imgsize}`}</span>
          <FaCameraRetro size={20} />
        </>
      )}
    </div>
  );
}
