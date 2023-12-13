import dynamic from 'next/dynamic';

import NoteModal from '@/app/_components/modal/NoteModal';

const CardEdit = dynamic(
  () => import('./_components/CardEdit').then(mod => mod.default),
  { ssr: false }
);

export default function DetailEdit() {
  return (
    <div>
      <NoteModal />
      <CardEdit />
    </div>
  );
}
