import 'react-image-crop/dist/ReactCrop.css';

import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import React, { useRef, useState } from 'react';
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from 'react-image-crop';

import { onClose } from '@/redux/features/imageSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Images.module.css';
import { canvasPreview } from '@/utils/crop/canvasPreview';
import { useDebounceEffect } from '@/utils/crop/useDebounceEffect';

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function ImageCrop({
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
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(aspects);

  const dispatch = useAppDispatch();

  const fetchData = async (file: File) => {
    try {
      await axios
        .post(`/api/post/image?file=${fileName}&id=${id}&state=user`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, {
            method: 'POST',
            body: formData,
          });
        })
        .then(async res => {
          if (res) {
            if (type === 'image') {
              return await axios.put('/api/update/profile', {
                _id: id,
                image: res.url + '/' + id + '/' + 'user' + '/' + fileName,
              });
            } else if (type === 'bannerImage') {
              return await axios.put('/api/update/profile', {
                _id: id,
                bannerImage: res.url + '/' + id + '/' + 'user' + '/' + fileName,
              });
            }
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context');
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    );

    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    });
    const file = new File([blob], fileName, { type: 'image/png' });

    ImageEvent(URL.createObjectURL(blob), type);

    fetchData(file);
    dispatch(onClose());
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  return (
    <div>
      <div className={styles.image_crop_setting}>
        <div>
          <label htmlFor="scale-input">Scale: </label>
          <input
            id="scale-input"
            type="number"
            step="0.1"
            value={scale}
            disabled={!image}
            onChange={e => setScale(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!image}
            onChange={e =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
      </div>

      {!!image && (
        <ReactCrop
          crop={crop}
          onChange={percentCrop => setCrop(percentCrop)}
          onComplete={c => setCompletedCrop(c)}
          aspect={aspect}
          minHeight={100}
        >
          <Image
            ref={imgRef}
            alt="Crop me"
            src={image}
            width={1000}
            height={1000}
            style={{
              transform: `scale(${scale}) rotate(${rotate}deg)`,
            }}
            className={styles.image_crop_img}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}

      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                display: 'none',
              }}
            />
          </div>
          <div className={styles.image_crop_btn}>
            <button onClick={onDownloadCropClick}>확인</button>
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(ImageCrop);
