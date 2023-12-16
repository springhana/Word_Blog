'use client';

import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import {
  onClose,
  onClose_delete,
  onOpen_delete,
} from '@/redux/features/cardSlice';
import { onOpen, writeEditID_change } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Setting.module.css';

export default function SettingModal({
  id,
  state,
}: {
  id: string | ObjectId;
  state: string;
}) {
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.cardReducer);

  useEffect(() => {
    dispatch(onClose());
    dispatch(onClose_delete());
  }, []);

  if (!Open.Open) {
    return null;
  }

  if (id !== Open.id) {
    return null;
  }

  return (
    <div className={styles.setting_modal}>
      <div
        className={styles.setting_modal_background}
        onClick={() => {
          dispatch(onClose());
        }}
      ></div>

      <div className={styles.setting_item_container}>
        <div
          className={styles.setting_item}
          onClick={() => {
            dispatch(onClose());
          }}
        >
          닫기
        </div>
        {state === 'card' ? (
          <div
            className={styles.setting_item}
            onClick={() => {
              dispatch(onClose());
              dispatch(writeEditID_change(id));
              dispatch(onOpen());
            }}
          >
            수정
          </div>
        ) : null}
        <div
          className={styles.setting_item}
          onClick={() => {
            dispatch(onOpen_delete());
          }}
        >
          삭제
        </div>
      </div>
    </div>
  );
}
