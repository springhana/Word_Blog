'use client';

import { StaticImageData } from 'next/image';
import React, { useEffect } from 'react';

import { onClose } from '@/redux/features/imageSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Images.module.css';

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
    <div className={styles.image_edit_modal}>
      <div
        className={styles.image_edit_modal_back}
        onClick={() => {
          dispatch(onClose());
        }}
      ></div>
      <div className={styles.image_crop}>
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
