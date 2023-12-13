import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SessionType } from '@/types/global';

import NoteModal from '../modal/NoteModal';
import WriteContainer from './WriteContainer';

export default async function WriteCard() {
  const session: SessionType | null = await getServerSession(authOptions);

  if (!session) {
    return <div>로그인 해줘</div>;
  }

  return (
    <div>
      <NoteModal />
      <WriteContainer />
    </div>
  );
}
