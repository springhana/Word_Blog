import Link from 'next/link';

export default function UserTab({ url }: { url: string }) {
  return (
    <>
      <div className={`tab ${url === 'following' ? 'tab_active' : ''}`}>
        <Link href={'following'}>following</Link>
      </div>
      <div className={`tab ${url === 'followers' ? 'tab_active' : ''}`}>
        <Link href={'followers'}>followers</Link>
      </div>
      <div className={`tab ${url === 'tags' ? 'tab_active' : ''}`}>
        <Link href={'tags'}>tags</Link>
      </div>
    </>
  );
}
