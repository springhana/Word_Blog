'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { useComment } from '@/hook/useComment';
import { CommentsType } from '@/types/global';
import { CommentType } from '@/types/word_blog';

import CommentItem from './CommentItme';

function CommentContainer({ _id }: { _id: string }) {
  const [page, setPage] = useState<number>(1);

  const { loading, error, comments, hasMore } = useComment(_id, page) as {
    loading: boolean;
    error: boolean;
    comments: CommentsType;
    hasMore: boolean;
  };

  const observer: React.MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && hasMore) {
            setPage(page + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const memoizedComment = useMemo(() => {
    return comments.result.map((item: CommentType, index: number) => {
      if (
        comments.result.length === index + 1 &&
        page !== comments.totalPages
      ) {
        return (
          <div key={index} ref={lastElementRef} style={{ color: 'red' }}>
            <CommentItem item={item} />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <CommentItem item={item} />
          </div>
        );
      }
    });
  }, [comments.result, page]);

  return (
    <div>
      {loading ? '로딩중' : null}
      {hasMore && !error ? (
        <div>{memoizedComment}</div>
      ) : (
        <div className="search_result">댓글이 없습니다</div>
      )}
    </div>
  );
}

export default React.memo(CommentContainer);
