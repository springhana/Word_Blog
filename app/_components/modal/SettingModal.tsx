'use client';

import { ObjectId } from 'mongodb';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import {
  onClose,
  onClose_delete,
  onOpen_delete,
} from '@/redux/features/cardSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

export default function SettingModal({
  id,
  state,
  paper,
}: {
  id: string | ObjectId;
  state: string;
  paper?: string;
}) {
  const dispatch = useAppDispatch();
  const Open = useAppSelector(state => state.cardReducer);
  const router = useRouter();

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
    <div
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '90px',
        height: '90px',
        background: 'red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'fixed',
          left: '0',
          top: '0',
          width: '100%',
          height: '100%',
          border: '1px solid red',
        }}
        onClick={() => {
          dispatch(onClose());
        }}
      ></div>

      <div style={{ cursor: 'pointer', zIndex: '10' }}>
        <div
          style={{ height: '30px', width: '90px', textAlign: 'center' }}
          onClick={() => {
            dispatch(onClose());
          }}
        >
          닫기
        </div>
        {state === 'card' ? (
          <div
            style={{ height: '30px', width: '90px', textAlign: 'center' }}
            onClick={() => router.push(`/edit/card/${id}/${paper}`)}
          >
            수정
          </div>
        ) : null}
        <div
          style={{ height: '30px', width: '90px', textAlign: 'center' }}
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
