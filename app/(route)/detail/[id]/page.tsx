import dynamic from 'next/dynamic';

const CardDetail = dynamic(
  () => import('../../../_components/card/CardDetail').then(mod => mod.default),
  { ssr: false }
);

const Comment = dynamic(
  () => import('./_components/comment/Comment').then(mod => mod.default),
  { ssr: false }
);

export default async function Detail() {
  return (
    <div>
      <CardDetail />
      <Comment />
    </div>
  );
}
