import { useQuery } from '@tanstack/react-query';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

// import { commentID_change } from '@/redux/features/commentSlice';
// import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CommentsType } from '@/types/global';
import { CommentType } from '@/types/word_blog';

export const useComment = (cardID: string, page: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<CommentsType>({
    result: [],
    totalPages: 1,
    currentPage: 1,
  });

  // const dispatch = useAppDispatch();
  // const state = useAppSelector(state => state.commentReducer.state);
  // const _id = useAppSelector(state => state.commentReducer.id);

  useEffect(() => {
    setComments({
      result: [],
      totalPages: 1,
      currentPage: 1,
    });
  }, [cardID]);

  const { refetch } = useQuery({
    gcTime: 1000 * 6000,
    staleTime: 1000 * 6000,
    queryKey: [`comments-${cardID}`],
    queryFn: async () => {
      try {
        setError(false);
        setLoading(true);

        const source = axios.CancelToken.source();
        const cancel: CancelTokenSource = source;

        const response = await axios
          .get('/api/comment', {
            params: { cardID: cardID, page: page, state: 'all' },
            cancelToken: source.token,
          })
          .then(res => {
            if (res.data) {
              const comment = {
                result: [
                  ...new Set([
                    ...comments.result,
                    ...res.data.result.map((item: CommentType) => item),
                  ]),
                ],
                totalPages: res.data.totalPages,
                currentPage: res.data.currentPage,
              };
              return comment;
            }

            if (cancel) {
              cancel.cancel('Request canceled');
            }
          });

        if (response) {
          setComments(response);
          setLoading(false);
        }

        return response;
      } catch (error) {
        setError(true);
        console.error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [page]);

  // useEffect(() => {
  //   const source = axios.CancelToken.source();
  //   const cancel: CancelTokenSource = source;

  //   const fetchData = async () => {
  //     try {
  //       await axios
  //         .get('/api/comment', {
  //           params: { _id: _id, state: 'one' },
  //           cancelToken: source.token,
  //         })
  //         .then(res => {
  //           if (res.data) {
  //             const comment = {
  //               result: [...new Set([res.data, ...comments.result])],
  //               totalPages: comments.totalPages,
  //               currentPage: comments.currentPage,
  //             };
  //             setComments(comment);
  //           }
  //         });
  //     } catch (e) {
  //       if (axios.isCancel(e)) return;
  //       setError(true);
  //     } finally {
  //       setLoading(false);
  //       dispatch(commentID_change(''));
  //     }
  //   };
  //   if (_id) {
  //     setError(false);
  //     setLoading(true);
  //     fetchData();
  //   }
  //   return () => {
  //     if (cancel) {
  //       cancel.cancel('Request canceled');
  //     }
  //   };
  // }, [state]);

  return { loading, error, comments };
};
