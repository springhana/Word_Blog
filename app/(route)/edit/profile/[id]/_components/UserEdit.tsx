'use client';

import { IoArrowBack } from '@react-icons/all-files/io5/IoArrowBack';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { CSSProperties, useEffect, useState } from 'react';

import BannerImage from '@/app/_components/BannerImage';
import ImageEditModal from '@/app/_components/modal/ImageEditModal';
import UserImage from '@/app/_components/UserImage';
import { useUser } from '@/hook/useUser';
import { onOpen } from '@/redux/features/imageSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Edit.module.css';
import { UsersType } from '@/types/word_blog_user';

import ImageEdit from './ImageEdit';

export default function UserEdit() {
  const dispatch = useAppDispatch();
  let pathname = usePathname();
  pathname = pathname?.split('/')[3] as string;
  const router = useRouter();
  const { loading, error, user, hasMore } = useUser(pathname, 'id') as {
    loading: boolean;
    error: boolean;
    user: UsersType;
    hasMore: boolean;
  };
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [image, setImage] = useState<StaticImageData | string>('');
  const [bannerImage, setBannerImage] = useState<StaticImageData | string>('');
  const [fileName, setFileName] = useState('');
  const [bannerFileName, setBannerFileName] = useState('');
  const [self_Intro, setSelf_Intro] = useState('');

  useEffect(() => {
    setPage(1);

    if (!loading) {
      setName(user.name);
      setImage(user.image);
      setBannerImage(
        !user.bannerImage || user.bannerImage === 'default'
          ? 'default'
          : user.bannerImage
      );
      setSelf_Intro(user.intro ? user.intro : '');
    }
  }, [loading, pathname]);

  const UpdateUser = async () => {
    try {
      await axios
        .put('/api/update/profile', {
          _id: pathname,
          name: name,
          intro: self_Intro,
        })
        .then(res => {
          if (res.data.update) {
            router.push(`/profile/${pathname}`);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const ImageEvent = (image: StaticImageData | string, type: string) => {
    if (type === 'image') {
      setImage(image);
    } else if (type === 'bannerImage') {
      setBannerImage(image);
    }
  };

  const CurrentTarget = (now: number): CSSProperties | undefined => {
    if (page === now) {
      return { zIndex: 11, position: 'relative' };
    } else {
      return { position: 'relative' };
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();

      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target && e.target.result) {
          if (page === 2) {
            setImage(e.target.result as string);
            setFileName(encodeURIComponent(new Date() + file.name));
          } else if (page === 3) {
            setBannerImage(e.target.result as string);
            setBannerFileName(encodeURIComponent(new Date() + file.name));
          }
          dispatch(onOpen());
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.edit}>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}

      <div
        className="back"
        onClick={() => {
          router.back();
        }}
      >
        <IoArrowBack />
        <span>뒤로가기</span>
      </div>

      {hasMore ? (
        <div className={styles.edit_modal}>
          <div className={styles.edit_modal_back}>
            {page > 1 ? (
              <span
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1);
                  }
                }}
                className={styles.edit_modal_btn_prev}
              >
                이전으로
              </span>
            ) : null}
            {page < 4 ? (
              <span
                onClick={() => {
                  if (page < 4) {
                    setPage(page + 1);
                  }
                }}
                className={styles.edit_modal_btn_next}
              >
                다음으로
              </span>
            ) : (
              <span onClick={UpdateUser} className={styles.edit_modal_btn_next}>
                저장하기
              </span>
            )}
          </div>

          <div style={CurrentTarget(3)} className={styles.edit_banner}>
            {page === 3 ? (
              <>
                <ImageEdit handleFileChange={handleFileChange} />
                <ImageEditModal
                  image={bannerImage as string}
                  fileName={bannerFileName}
                  ImageEvent={ImageEvent}
                  aspects={16 / 8}
                  id={pathname}
                  type="bannerImage"
                />
              </>
            ) : null}
            <BannerImage image={bannerImage} />
          </div>

          <div style={CurrentTarget(2)} className={styles.edit_img}>
            {page === 2 ? (
              <>
                <ImageEdit handleFileChange={handleFileChange} />
                <ImageEditModal
                  image={image as string}
                  fileName={fileName}
                  ImageEvent={ImageEvent}
                  aspects={1 / 1.01}
                  id={pathname}
                  type="image"
                />
              </>
            ) : null}
            <UserImage image={image} size={100} />
          </div>

          <div className={styles.edit_user}>
            <div style={CurrentTarget(1)}>
              <input
                type="text"
                value={name}
                placeholder="이름"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setName(e.target.value);
                }}
                className={styles.name}
              />
            </div>
            <div style={CurrentTarget(4)}>
              <input
                type="text"
                value={self_Intro}
                placeholder="자기소개"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSelf_Intro(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
