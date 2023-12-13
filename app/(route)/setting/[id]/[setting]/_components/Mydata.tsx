'use client';
import useData from '@/hook/useData';
import { UsersType } from '@/types/word_blog_user';

export default function Mydata({ user }: { user: UsersType }) {
  const { loading, error, data, hasMore } = useData(user._id);

  return (
    <div>
      {loading ? '로딩중' : null}
      {error ? '에러' : null}
      <div>이메일: {user.email}</div>
      <div>이름: {user.name}</div>
      {hasMore && (
        <>
          <div>카드수 {data.card}</div>
          <div>댓글수 {data.comment}</div>
          <div>좋아요 수 {data.like}</div>
          <div>단어장 수 {data.note}</div>
        </>
      )}
    </div>
  );
}
