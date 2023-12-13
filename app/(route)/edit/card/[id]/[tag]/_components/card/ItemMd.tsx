import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

import dynamic from 'next/dynamic';

import ImageDrag from '@/app/_components/ImageDrag';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then(mod => mod.default),
  { ssr: false }
);
export default function ItemMd({
  md,
  title,
  image,
  setMd,
  setTitle,
  setImage,
  setFile,
}: {
  md: string;
  title: string;
  image: string;
  setMd: (value: string) => void;
  setTitle: (value: string) => void;
  setImage: (value: string) => void;
  setFile: (file: File | undefined) => void;
}) {
  return (
    <div>
      <div>
        <ImageDrag image={image} setImage={setImage} setFile={setFile} />

        <h5>제목</h5>
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
      </div>

      <MDEditor
        value={md}
        onChange={value => {
          setMd(value || '');
        }}
        height={'80vh'}
      />
    </div>
  );
}
