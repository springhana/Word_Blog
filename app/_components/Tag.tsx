'use client';

import { HiHashtag } from '@react-icons/all-files/hi/HiHashtag';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoPricetagOutline } from '@react-icons/all-files/io5/IoPricetagOutline';
import { IoPricetagSharp } from '@react-icons/all-files/io5/IoPricetagSharp';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useTag } from '@/hook/useTag';
import { Init } from '@/redux/features/cardSlice';
import { page_init } from '@/redux/features/pageSlice';
import { tag_change } from '@/redux/features/tagSlice';
import { onOpen } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Sidebar.module.css';
import { WindowWidth } from '@/utils/windowWidth';

export default function Tag() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const tagRef = useRef<HTMLDivElement>(null);
  const tagBtnRef = useRef<HTMLDivElement>(null);

  const tag = useAppSelector(state => state.tagReducer.tag);
  const id = useAppSelector(state => state.idReducer.id);
  const { loading, error, tags, hasMore } = useTag(id, 'all');
  const [toggle, setToggle] = useState(0);

  const { windowWidth } = WindowWidth();

  useEffect(() => {
    dispatch(tag_change({ id: 'all', name: 'all' }));
  }, []);

  const TagSlide = () => {
    if (
      tagRef.current &&
      tagBtnRef.current &&
      toggle === 0 &&
      windowWidth <= 1024
    ) {
      tagRef.current.style.right = '0';
      tagBtnRef.current.style.left = '0';
      tagBtnRef.current.style.backgroundColor = '#ffd645';
      setToggle(1);
    } else if (
      tagRef.current &&
      tagBtnRef.current &&
      toggle === 1 &&
      windowWidth <= 1024
    ) {
      if (windowWidth <= 764) {
        tagRef.current.style.right = '-100%';
      } else {
        tagRef.current.style.right = '-50%';
      }
      tagBtnRef.current.style.left = '-60px';
      tagBtnRef.current.style.backgroundColor = '#fb6072';
      setToggle(0);
    }
  };

  return (
    <div className={styles.tag}>
      <div className={styles.tag_inner} ref={tagRef}>
        {windowWidth <= 1024 ? (
          <div onClick={TagSlide} className={styles.tagBtn} ref={tagBtnRef}>
            {toggle === 0 ? (
              <>
                <HiHashtag size={25} />
              </>
            ) : (
              <IoClose size={25} />
            )}
          </div>
        ) : null}

        <div
          onClick={() => {
            dispatch(Init());
            dispatch(tag_change({ id: '태그 추가', name: '태그 추가' }));
            dispatch(onOpen());
          }}
          className={`${styles.hash_tag} ${styles.hash_add} ${
            tag.id === '태그 추가' ? styles.hash_active : ''
          }`}
        >
          {tag.id === '태그 추가' ? (
            <>
              <IoPricetagSharp />
              <span>태그 추가</span>
            </>
          ) : (
            <>
              <IoPricetagOutline />
              <span>태그 추가</span>
            </>
          )}
        </div>

        {pathname?.split('/')[1] === 'add' ? null : (
          <div
            onClick={() => {
              dispatch(Init());
              dispatch(tag_change({ id: 'all', name: 'all' }));
              dispatch(page_init());
              TagSlide();
            }}
            className={`${styles.hash_tag} ${
              tag.id === 'all' ? styles.hash_active : ''
            }`}
          >
            <HiHashtag />
            <span>all</span>
          </div>
        )}
        <div className={styles.tag_container}>
          {!loading && !error && hasMore
            ? tags.map((item: { _id: string; name: string }, index: number) => (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(Init());
                    dispatch(tag_change({ id: item._id, name: item.name }));
                    dispatch(page_init());
                    TagSlide();
                  }}
                  className={`${styles.hash_tag} ${
                    tag.id === item._id ? styles.hash_active : ''
                  }`}
                >
                  <HiHashtag />
                  <span>{item.name}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
