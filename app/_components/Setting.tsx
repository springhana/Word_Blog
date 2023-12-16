'use client';

import { IoEllipsisHorizontal } from '@react-icons/all-files/io5/IoEllipsisHorizontal';
import { ObjectId } from 'mongodb';

import { cardID_chage, onOpen } from '@/redux/features/cardSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Setting.module.css';

import DeleteModal from './modal/DeleteModal';
import SettingModal from './modal/SettingModal';

export default function Setting({
  id,
  state,
  Delete,
}: {
  id: string | ObjectId;
  state: string;
  Delete: (id?: string | ObjectId) => void;
}) {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.setting}>
      <div
        onClick={() => {
          dispatch(onOpen());
          dispatch(cardID_chage(id));
        }}
        className={styles.setting_btn}
        style={{}}
      >
        <IoEllipsisHorizontal size={20} />
      </div>

      <SettingModal id={id} state={state} />
      <DeleteModal id={id} state={state} Delete={Delete} />
    </div>
  );
}
