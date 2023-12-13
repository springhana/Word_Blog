import { ObjectId } from 'mongodb';
import { useEffect } from 'react';

import { onClose, onClose_delete } from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

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
    <div
      style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
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
          dispatch(onClose_delete());
        }}
      ></div>
      <div
        style={{
          zIndex: '21',
          width: '200px',
          height: '200px',
          background: 'yellow',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
        }}
      >
        <div
          onClick={() => {
            dispatch(onClose_delete());
          }}
        >
          취소
        </div>

        <div
          onClick={() => {
            if (state === 'card') {
              Delete();
            } else if (state === 'comment') {
              Delete(id);
            }
          }}
        >
          삭제
        </div>
      </div>
    </div>
  );
}
