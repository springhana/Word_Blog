'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { useAppSelector } from '@/redux/hook';
import styles from '@/styles/Profile.module.css';

export default function SubscribeBtn({
  user,
  value,
}: {
  user: string;
  value?: string;
}) {
  const id = useAppSelector(state => state.idReducer.id);

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async () => {
      axios.post('/api/subscribe', { author: id, user: user });
    },
    onSuccess: () => {
      if (value === '구독') {
        toast.success('팔로워 성공');
      } else {
        toast.success('팔로워 해체');
      }
      queryClient.invalidateQueries({
        queryKey: [`subscribe-${id}`],
      });
    },
    onError: () => {
      toast.error('팔로워 에러');
    },
  });

  if (!id) {
    return null;
  }

  return (
    <div
      onClick={() => {
        mutate();
      }}
      className={styles.subscribe_btn}
    >
      {value}
    </div>
  );
}
