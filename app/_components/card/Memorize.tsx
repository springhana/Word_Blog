'use client';

import { GiBookmark } from '@react-icons/all-files/gi/GiBookmark';
import { GiBookmarklet } from '@react-icons/all-files/gi/GiBookmarklet';
import axios from 'axios';
import { ObjectId } from 'mongodb';
import { useState } from 'react';

export default function Memorize({
  memorize,
  id,
}: {
  memorize: boolean;
  id: string | ObjectId;
}) {
  const [memori, setMemori] = useState(memorize);

  const MemorizeEvent = async () => {
    try {
      await axios.put('/api/update/memorize', { id: id }).then(res => {
        if (res.data.update) {
          setMemori(res.data.memorize);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div onClick={MemorizeEvent}>
      {memori ? (
        <div>
          <GiBookmark />
          외웠어요
        </div>
      ) : (
        <div>
          <GiBookmarklet />
          못외웠어요
        </div>
      )}
    </div>
  );
}
