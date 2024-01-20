'use client';
import useData from '@/hook/useData';
import styles from '@/styles/UserSetting.module.css';
import { UsersType } from '@/types/word_blog_user';

export default function Mydata({ user }: { user: UsersType }) {
  const { loading, error, data, hasMore } = useData(user._id);

  if (loading) {
    return <div>Loading</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  return (
    <div className={styles.mydata}>
      <div>
        <span>이메일: </span>
        {user.email}
      </div>
      <div>
        <span>이름: </span>
        {user.name}
      </div>
      {hasMore && (
        <>
          <div>
            <span>카드 수: </span>
            {data.card}개
          </div>
          <div>
            <span>댓글 수: </span>
            {data.comment}개
          </div>
          <div>
            <span>좋아요 수: </span>
            {data.like}개
          </div>
          <div>
            <span>단어장 수: </span>
            {data.note}개
          </div>
        </>
      )}
    </div>
  );
}
