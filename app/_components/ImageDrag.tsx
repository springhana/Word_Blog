import { MdDelete } from '@react-icons/all-files/md/MdDelete';
import Image, { StaticImageData } from 'next/image';
import { FileDrop } from 'react-file-drop';

import styles from '@/styles/Images.module.css';
import { compressImage } from '@/utils/compressImage ';

import ImageEdit from '../(route)/edit/profile/[id]/_components/ImageEdit';

export default function ImageDrag({
  image,
  setImage,
  setFile,
  imgsize,
}: {
  image: string | StaticImageData;
  setImage: (image: string | StaticImageData) => void;
  setFile: (file: File | undefined) => void;
  imgsize?: number;
}) {
  const DragImage = async (files: FileList) => {
    if (files[0].size >= 5000000) {
      alert('5MB 이상 파일은 업로드가 불가능합니다.');
    } else if (
      files[0].type == 'image/png' ||
      files[0].type == 'image/jpeg' ||
      files[0].type == 'image/jpg'
    ) {
      const resizeFile = await compressImage(files[0]);
      setFile(resizeFile);

      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        setImage(imageUrl);
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const resizeFile = await compressImage(file);
      setFile(resizeFile);
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
      onDrop={async (files: FileList | null) => {
        if (files != null) {
          DragImage(files);
        }
      }}
    >
      <div
        className={styles.image_pic}
        style={
          image
            ? {
                width: imgsize ? imgsize : '350px',
                height: imgsize ? imgsize : '350px',
              }
            : {
                width: imgsize ? imgsize : '350px',
                height: imgsize ? imgsize : '350px',
              }
        }
      >
        {image !== 'default' && image ? (
          <div className={styles.image}>
            <Image src={image} alt={'image'} width={1000} height={1000} />
            <div
              className={styles.image_delete}
              onClick={() => {
                setImage('default');
                setFile(undefined);
              }}
            >
              <MdDelete size={15} />
            </div>
          </div>
        ) : (
          <>
            <ImageEdit handleFileChange={handleFileChange} imgsize={imgsize} />
          </>
        )}
      </div>
    </FileDrop>
  );
}
