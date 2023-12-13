import axios, { CancelTokenSource } from 'axios';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';

import { useAppSelector } from '@/redux/hook';
import { NoteType } from '@/types/word_blog';

export const useNote = (_id: string | ObjectId, state: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [note, setNote] = useState<NoteType[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const noteState = useAppSelector(state => state.noteReducer.state);

  useEffect(() => {
    setNote([]);
  }, [_id]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const source = axios.CancelToken.source();
    const cancel: CancelTokenSource = source;

    const fetchData = async () => {
      try {
        await axios
          .get('/api/note', {
            params: { _id: _id, state: state },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              setNote(res.data);
              setHasMore(res.data);
              setLoading(false);
            }
          });
      } catch (e) {
        if (axios.isCancel(e)) return;
        setError(true);
      }
    };
    fetchData();

    return () => {
      if (cancel) {
        cancel.cancel('Request canceled');
      }
    };
  }, [_id, noteState]);

  return { loading, error, note, hasMore };
};
