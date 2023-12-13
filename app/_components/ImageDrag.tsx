import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';
import { FileDrop } from 'react-file-drop';

import ImageEdit from '../(route)/edit/profile/[id]/_components/ImageEdit';

export default function ImageDrag({
  image,
  setImage,
  setFile,
}: {
  image: string | StaticImageData;
  setImage: (image: string | StaticImageData) => void;
  setFile: (file: File | undefined) => void;
}) {
  const [boardColor, setBoardColor] = useState(false);

  const DragImage = (files: FileList) => {
    if (files[0].size >= 5000000) {
      alert('5MB 이상 파일은 업로드가 불가능합니다.');
    } else if (
      files[0].type == 'image/png' ||
      files[0].type == 'image/jpeg' ||
      files[0].type == 'image/jpg'
    ) {
      setFile(files[0]);

      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        setImage(imageUrl);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      setFile(file);
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          setImage(e.target.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <FileDrop
      onDragOver={() => {
        setBoardColor(true);
      }}
      onDragLeave={() => {
        setBoardColor(false);
      }}
      onDrop={async (files: FileList | null) => {
        if (files != null) {
          DragImage(files);
        }
      }}
    >
      <div
        style={
          image
            ? {
                width: '350px',
                border: '1px solid red',
                position: 'relative',
              }
            : {
                width: '350px',
                height: '350px',
                border: '1px solid red',
                position: 'relative',
              }
        }
      >
        드래그
        {image !== 'default' && image ? (
          <div>
            <Image
              src={image}
              alt={'image'}
              width={10000}
              height={10000}
              style={{ width: '100%', height: '100%' }}
            />
            <button
              onClick={() => {
                setImage('default');
                setFile(undefined);
              }}
            >
              삭제
            </button>
          </div>
        ) : (
          <ImageEdit handleFileChange={handleFileChange} />
        )}
      </div>
    </FileDrop>
  );
}
