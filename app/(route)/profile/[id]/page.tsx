import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SessionType } from '@/types/global';

import ProfileContainer from './_components/ProfileContainer';
import ProfileTabs from './_components/ProfileTabs';

export default async function Profile() {
  const session: SessionType | null = await getServerSession(authOptions);

  return (
    <div>
      <ProfileContainer session={session} />
      <ProfileTabs />
    </div>
  );
}
