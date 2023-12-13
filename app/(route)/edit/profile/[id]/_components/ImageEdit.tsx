'use client';

import { FaCameraRetro } from '@react-icons/all-files/fa/FaCameraRetro';
import { useRef } from 'react';

export default function ImageEdit({
  handleFileChange,
}: {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const imageInput = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        border: '1px solid red',
      }}
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
      <FaCameraRetro />
    </div>
  );
}
