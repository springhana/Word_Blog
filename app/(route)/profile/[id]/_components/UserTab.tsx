import Link from 'next/link';

export default function UserTab() {
  return (
    <div>
      <Link href={'following'}>following</Link>
      <br />
      <Link href={'followers'}>followers</Link>
      <br />
      <Link href={'tags'}>tags</Link>
    </div>
  );
}
