import { ObjectId } from 'mongodb';

import { useNote } from '@/hook/useNote';
import { NoteType } from '@/types/word_blog';

export default function CardNote({ id }: { id: string | ObjectId }) {
  const { loading, error, note, hasMore } = useNote(id, 'card') as {
    loading: boolean;
    error: boolean;
    note: NoteType[];
    hasMore: boolean;
  };

  return (
    <div>
      {hasMore
        ? note?.map((item, index) => <div key={index}>{item.name}</div>)
        : null}
    </div>
  );
}
