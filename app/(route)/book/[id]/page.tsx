import { getServerSession } from 'next-auth';

import Login from '@/app/_components/loading/Login';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/Book.module.css';
import { SessionType } from '@/types/global';

import BookContainer from './_components/BookContainer';

export default async function Book() {
  const session: SessionType | null = await getServerSession(authOptions);
  if (!session) {
    return <Login />;
  }
  return (
    <div className={styles.book}>
      <BookContainer />
    </div>
  );
}
