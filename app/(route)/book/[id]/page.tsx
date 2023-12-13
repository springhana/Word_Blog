import { getServerSession } from 'next-auth';

import Login from '@/app/_components/Login';
import NoteModal from '@/app/_components/modal/NoteModal';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SessionType } from '@/types/global';

import BookContainer from './_components/BookContainer';

export default async function Book() {
  const session: SessionType | null = await getServerSession(authOptions);
  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <NoteModal />
      <BookContainer />
    </div>
  );
}
