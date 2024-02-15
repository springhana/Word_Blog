'use client';

import { FaEye } from '@react-icons/all-files/fa/FaEye';
import { FaEyeSlash } from '@react-icons/all-files/fa/FaEyeSlash';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { toast } from 'react-toastify';

import { onClose } from '@/redux/features/writeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import stylse from '@/styles/Card.module.css';
import { CardType } from '@/types/word_blog';
import { PostImage } from '@/utils/postImage';
import { WindowWidth } from '@/utils/windowWidth';

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
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<string | StaticImageData>('');
  const [file, setFile] = useState<File | undefined>(undefined);

  const dispatch = useAppDispatch();
  const select = useAppSelector(state => state.noteReducer.select);
  const router = useRouter();
  const noteState = useAppSelector(state => state.noteReducer.select);

  const ref_md = useRef<HTMLDivElement>(null);

  const { windowWidth } = WindowWidth();

  useEffect(() => {
    if (card?._id) {
      setTitle(card.title || '');
      setMd(card.md || '');
      setImage(card.image || 'default');
    }
  }, []);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (isId: boolean) => {
      if (isId) {
        if (!card) {
          return;
        }
        const { url, name } = await PostImage(file || undefined, id, 'card');

        await axios.put('/api/card', {
          word: '',
          meaning: '',
          sentence: '',
          author: card.author,
          id: card._id,
          md: md,
          title: title,
          memorize: card.memorize,
          note: noteState,
          paper: card.paper,
          program: program === 1 ? 'word' : 'markdown',
          image:
            image && url && name
              ? url + '/' + card.author + '/' + 'card' + '/' + name
              : image,
        });
      } else {
        const { url, name } = await PostImage(file || undefined, id, 'card');

        await axios.post('/api/post/card/markdown', {
          md: md,
          title: title,
          tag: tag,
          id: id,
          note: select,
          paper: paper,
          program: program === 1 ? 'word' : 'markdown',
          image:
            image && url && name
              ? url + '/' + id + '/' + 'card' + '/' + name
              : imageUrl
                ? imageUrl
                : 'default',
        });
      }
    },
    onSuccess: () => {
      if (card?._id) {
        queryClient.invalidateQueries({
          queryKey: [`card-detail-${card._id}`],
        });
      }
      queryClient.invalidateQueries({
        queryKey: [`cards-${card?.tag ? card.tag : tag}`],
      });
      queryClient.invalidateQueries({
        queryKey: [`cards-all`],
      });
      setMd('');
      setTitle('제목');
      dispatch(onClose());
      toast.success('카드 작성 성공');
    },
    onError: () => {
      toast.error('프로필 수정 에러');
    },
  });

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
              '![' +
              filename +
              `](${res.url}/` +
              id +
              '/card/' +
              filename +
              ')';
            setImageUrl(res.url + '/' + id + '/card/' + filename);
            setImage(res.url + '/' + id + '/card/' + filename);
          } else {
            newMd =
              '![' +
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
  };

  const ShowVisible = () => {
    if (ref_md.current) {
      if (!show) {
        ref_md.current.style.right = '100%';
        setShow(true);
      } else {
        ref_md.current.style.right = '0';
        setShow(false);
      }
    }
  };

  return (
    <div className={stylse.write_card}>
      <ImageDrag
        image={image}
        setImage={setImage}
        setFile={setFile}
        imgsize={windowWidth <= 768 ? 80 : 150}
      />
      <button className={stylse.write_card_eye} onClick={ShowVisible}>
        {!show ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </button>

      <div className={stylse.write_card_post}>
        <input
          className={stylse.write_card_title}
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
          placeholder="제목"
        />
      </div>

      <FileDrop
        onDrop={async (files: FileList | null) => {
          if (files != null) {
            DragImage(files);
          }
        }}
      >
        <div className={stylse.write_card_md}>
          <div className={stylse.write_card_md_inner} ref={ref_md}>
            <MarkdownEditor
              value={md}
              onChange={setMd}
              height={windowWidth <= 768 ? 125 : 250}
            />
          </div>
        </div>
      </FileDrop>

      <button
        className={stylse.write_card_btn}
        onClick={() => {
          if (card?._id) {
            mutate(true);
          } else {
            mutate(false);
          }
        }}
      >
        포스트
      </button>
    </div>
  );
}
