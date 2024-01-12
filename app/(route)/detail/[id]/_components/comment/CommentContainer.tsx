'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useComment } from '@/hook/useComment';
import { CommentsType } from '@/types/global';
import { CommentType } from '@/types/word_blog';

import CommentItem from './CommentItme';

function CommentContainer({ _id }: { _id: string }) {
  const [page, setPage] = useState<number>(1);

  const { loading, error, comments } = useComment(_id, page) as {
    loading: boolean;
    error: boolean;
    comments: CommentsType;
  };

  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !error) {
            setPage(page + 1);
          }
        },
        { threshold: 0.7 }
      );
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const memoizedComment = useMemo(() => {
    return comments.result.map((item: CommentType, index: number) => {
      if (
        comments.result.length === index + 1 &&
        page !== comments.totalPages
      ) {
        return (
          <div key={item._id} ref={lastElementRef}>
            <CommentItem item={item} />
          </div>
        );
      } else {
        return (
          <div key={item._id}>
            <CommentItem item={item} />
          </div>
        );
      }
    });
  }, [comments.result, page]);

  return (
    <div>
      {comments.result ? (
        <div>{memoizedComment}</div>
      ) : (
        <div className="search_result">댓글이 없습니다</div>
      )}
    </div>
  );
}

export default React.memo(CommentContainer);
