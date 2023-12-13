import dynamic from 'next/dynamic';

const Tag = dynamic(
  () => import('@/app/_components/Tag').then(mod => mod.default),
  { ssr: false }
);

const WriteCard = dynamic(
  () => import('@/app/_components/write/WriteCard').then(mod => mod.default),
  { ssr: false }
);

export default function AddWord() {
  return (
    <div>
      <Tag />
      <WriteCard />
    </div>
  );
}
