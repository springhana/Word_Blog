import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import { onClose, onClose_delete } from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import styles from '@/styles/Setting.module.css';

export default function DeleteModal({
  id,
  state,
  Delete,
}: {
  id: string | ObjectId;
  state: string;
  Delete: (id?: string | ObjectId) => void;
}) {
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.cardReducer);

  useEffect(() => {
    dispatch(onClose());
  }, [Open.Open_delete]);

  if (!Open.Open_delete) {
    return null;
  }

  if (id !== Open.id) {
    return null;
  }

  return (
    <div className="modal">
      <div
        className="modal_background"
        onClick={() => {
          dispatch(onClose_delete());
        }}
      ></div>
      <div className={styles.setting_modal_delete}>
        <p className={styles.setting_modal_delete_title}>카드를 삭제할까요?</p>
        <div>
          이 동작은 취소할 수 없으며 내 프로필에서 완전히 삭제되며, 검색
          결과에서도 삭제됩니다.
        </div>

        <div className={styles.setting_modal_delete_btn}>
          <div
            onClick={() => {
              if (state === 'card') {
                Delete();
              } else if (state === 'comment') {
                Delete(id);
              }
              dispatch(onClose_delete());
            }}
          >
            삭제
          </div>
          <div
            onClick={() => {
              dispatch(onClose_delete());
            }}
          >
            취소
          </div>
        </div>
      </div>
    </div>
  );
}
