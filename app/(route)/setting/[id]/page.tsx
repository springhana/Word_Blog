import dynamic from 'next/dynamic';
import { getServerSession } from 'next-auth';

import Login from '@/app/_components/Loading/Login';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SessionType } from '@/types/global';

const SettingContainer = dynamic(
  () => import('./_components/SettingContainer').then(mod => mod.default),
  { ssr: false }
);

export default async function Setting() {
  const session: SessionType | null = await getServerSession(authOptions);

  if (!session) {
    return <Login />;
  }
  return (
    <div>
      <SettingContainer />
    </div>
  );
}
