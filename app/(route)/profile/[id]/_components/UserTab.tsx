import Link from 'next/link';

export default function UserTab({ url }: { url: string }) {
  const menu = ['following', 'followers', 'tags'];
  return (
    <>
      {menu.map((item, index) => (
        <div className={`tab ${url === item ? 'tab_active' : ''}`} key={index}>
          <Link href={item}>{item}</Link>
        </div>
      ))}
    </>
  );
}
