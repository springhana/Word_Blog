'use client';

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FileDrop } from 'react-file-drop';

import { state_change } from '@/redux/features/cardSlice';
import {
  onClose,
  writeEditID_change,
  writeid_change,
  writetag_change,
} from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { CardType } from '@/types/word_blog';

import ImageDrag from '../../ImageDrag';
import MarkdownEditor from './MarkdownEditor';

export default function MarkdownPaper({
  tag,
  id,
  program,
  paper,
  card,
}: {
  tag: string;
  id: string;
  program: number;
  paper: string;
  card?: CardType;
}) {
  const [md, setMd] = useState<string | undefined>('');
  const [title, setTitle] = useState<string>('제목');
  const [boardColor, setBoardColor] = useState(false);
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const pathname = usePathname();
  const router = useRouter();
  const noteState = useAppSelector(state => state.noteReducer.select);

  useEffect(() => {
    if (card) {
      setTitle(card.title || '');
      setMd(card.md || '');
      setImage(card.image || 'default');
    }
  }, []);

  const PostCard = async () => {
    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${id}&state=card`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, { method: 'POST', body: formData });
        })
        .then(res => {
          fileurl = res.url;
        });
    }

    await axios
      .post('/api/post/card/markdown', {
        md: md,
        title: title,
        tag: tag,
        id: id,
        note: select,
        paper: paper,
        program: program === 1 ? 'word' : 'markdown',
        image:
          image && fileurl && filename
            ? fileurl + '/' + id + '/' + 'card' + '/' + filename
            : imageUrl
              ? imageUrl
              : 'default',
      })
      .then(res => {
        if (res.data.post) {
          setMd('');
          setTitle('제목');
          dispatch(writeid_change(res.data.id));
          dispatch(writetag_change('CS'));
          dispatch(onClose());
          dispatch(writeEditID_change(''));
        }
      });
  };

  const EditMd = async () => {
    if (!card) {
      return;
    }

    let filename;
    let fileurl;
    if (file) {
      filename = encodeURIComponent(new Date() + file.name);
      await axios
        .post(`/api/post/image?file=${filename}&id=${card.author}&state=card`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, { method: 'POST', body: formData });
        })
        .then(res => {
          fileurl = res.url;
        });
    }

    await axios
      .put('/api/card', {
        word: '',
        meaning: '',
        sentence: '',
        author: card.author,
        id: card._id,
        md: md,
        title: title,
        memorize: card.memorize,
        date: card.date,
        note: noteState,
        paper: card.paper,
        program: program === 1 ? 'word' : 'markdown',
        image:
          image && fileurl && filename
            ? fileurl + '/' + card.author + '/' + 'card' + '/' + filename
            : image,
      })
      .then(res => {
        if (res.data.update) {
          dispatch(onClose());
          dispatch(writeEditID_change(''));
          dispatch(state_change());
          router.push(`/detail/${card._id}`);
        }
      });
  };

  const DragImage = async (files: FileList) => {
    const filename = encodeURIComponent(files[0].name); // 인코딩해서 글자깨짐 방지
    if (files[0].size >= 5000000) {
      alert('5MB 이상 파일은 업로드가 불가능합니다.');
    } else if (
      files[0].type == 'image/png' ||
      files[0].type == 'image/jpeg' ||
      files[0].type == 'image/jpg'
    ) {
      const file = files[0];
      await axios
        .post(`/api/post/image?file=${filename}&id=${id}&state=card`)
        .then(async res => {
          const formData = new FormData();
          Object.entries({ ...res.data.fields, file }).forEach(
            ([key, value]) => {
              formData.append(key, value as string | Blob);
            }
          );
          return await fetch(res.data.url, {
            method: 'POST',
            body: formData,
          });
        })
        .then(res => {
          let newMd = '';
          if (typeof md !== 'undefined') {
            newMd =
              md +
              '\n\n ![' +
              filename +
              `](${res.url}/` +
              id +
              '/card/' +
              filename +
              ')';
            setImageUrl(res.url + '/' + id + '/card/' + filename);
          } else {
            newMd =
              '\n\n ![' +
              filename +
              `](${res.url}/` +
              id +
              '/card/' +
              +filename +
              ')';
          }

          setMd(newMd);
        });
    } else {
      alert('png, jpg, jpeg 파일이 아닙니다.');
    }
    setBoardColor(false);
  };

  return (
    <div>
      <ImageDrag image={image} setImage={setImage} setFile={setFile} />

      <button
        onClick={() => {
          if (card?._id) {
            EditMd();
          } else {
            PostCard();
          }
        }}
      >
        포스트
      </button>
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        눈
      </button>
      <input
        type="text"
        style={{ fontSize: '2.125rem' }}
        value={title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <FileDrop
        onDragOver={() => {
          setBoardColor(true);
        }}
        onDragLeave={() => {
          setBoardColor(false);
        }}
        onDrop={async (files: FileList | null) => {
          if (files != null) {
            DragImage(files);
          }
        }}
      >
        <div style={{ padding: '10px' }}>
          {show ? (
            <MarkdownEditor
              value={md}
              onChange={setMd}
              preview="preview"
              height={400}
              style={
                boardColor
                  ? { backgroundColor: '#adb5bd' }
                  : { backgroundColor: 'none' }
              }
            />
          ) : (
            <MarkdownEditor
              value={md}
              onChange={setMd}
              height={400}
              style={
                boardColor
                  ? { backgroundColor: '#adb5bd' }
                  : { backgroundColor: 'none' }
              }
            />
          )}
        </div>
      </FileDrop>
    </div>
  );
}
