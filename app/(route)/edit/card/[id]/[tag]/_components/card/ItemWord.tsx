import ImageDrag from '@/app/_components/ImageDrag';

export default function ItemWord({
  setWord,
  setMeaning,
  setSentence,
  setImage,
  setFile,
  value,
  meaning,
  sentence,
  image,
}: {
  setWord: (value: string) => void;
  setMeaning: (value: string) => void;
  setSentence: (value: string) => void;
  setImage: (value: string) => void;
  setFile: (file: File | undefined) => void;
  value: string;
  meaning: string;
  sentence: string;
  image: string;
}) {
  return (
    <div>
      <div>
        <h5>단어</h5>
        <input
          type="text"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setWord(e.target.value);
          }}
        />
      </div>
      <div>
        <h5>뜻</h5>
        <input
          type="text"
          value={meaning}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setMeaning(e.target.value);
          }}
        />
      </div>
      <div>
        <h5>문장</h5>
        <input
          type="text"
          value={sentence}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSentence(e.target.value);
          }}
        />
      </div>

      <ImageDrag image={image} setImage={setImage} setFile={setFile} />
    </div>
  );
}
