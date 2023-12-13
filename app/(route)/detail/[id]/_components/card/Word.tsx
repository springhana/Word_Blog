import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Like from '@/app/_components/card/Like';
import Likes from '@/app/_components/card/Likes';
import Memorize from '@/app/_components/card/Memorize';
import User from '@/app/_components/card/User';
import Setting from '@/app/_components/Setting';
import { useTag } from '@/hook/useTag';
import { CardType, TagType } from '@/types/word_blog';

export default function Word({ item }: { item: CardType }) {
  const router = useRouter();

  const { loading, error, tags, hasMore } = useTag(item.tag, 'one') as {
    loading: boolean;
    error: boolean;
    tags: TagType[];
    hasMore: boolean;
  };

  const Delete = async () => {
    try {
      await axios
        .delete(`/api/card`, { params: { id: item._id, author: item.author } })
        .then(res => {
          if (res.data.delete) {
            router.push('/');
          }
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <User id={item.author} />

      <div>{hasMore && !loading && !error && tags[0].name}</div>
      <div>{item.word}</div>
      <div>{item.meaning}</div>
      <div>{item.sentence}</div>
      <div>{item.date}</div>

      <div style={{ width: '200px' }}>
        {item.image === 'default' ? null : (
          <Image
            src={item.image}
            alt={item.image}
            width={10000}
            height={10000}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </div>

      <div>
        <Memorize memorize={item.memorize} id={item._id} />
        <Like id={item._id} />
        <Likes id={item._id} />
      </div>

      <Setting
        id={item._id}
        paper={item.paper}
        state={'card'}
        Delete={Delete}
      />
    </div>
  );
}
