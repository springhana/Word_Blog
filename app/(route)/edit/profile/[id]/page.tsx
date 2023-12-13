import dynamic from 'next/dynamic';

const UserEdit = dynamic(
  () => import('./_components/UserEdit').then(mod => mod.default),
  { ssr: false }
);

export default function ProfileEdit() {
  return (
    <div>
      <UserEdit />
    </div>
  );
}
