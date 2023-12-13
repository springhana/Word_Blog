'use client';

import { StaticImageData } from 'next/image';
import React, { useEffect } from 'react';

import { onClose } from '@/redux/features/imageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

import ImageCrop from '../ImageCrop';

function ImageEditModal({
  image,
  fileName,
  ImageEvent,
  aspects,
  id,
  type,
}: {
  image: string;
  fileName: string;
  ImageEvent: (image: StaticImageData | string, type: string) => void;
  aspects: number;
  id: string;
  type: string;
}) {
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.imageReducer.Open);

  useEffect(() => {
    dispatch(onClose());
  }, []);

  if (!Open) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid red',
          alignItems: 'center',
          background: 'black',
          opacity: 0.7,
        }}
        onClick={() => {
          dispatch(onClose());
        }}
      ></div>
      <div style={{ color: 'white', zIndex: 21 }}>
        <ImageCrop
          image={image}
          fileName={fileName}
          ImageEvent={ImageEvent}
          aspects={aspects}
          id={id}
          type={type}
        />
      </div>
    </div>
  );
}

export default React.memo(ImageEditModal);
