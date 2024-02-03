'use client';

import { AiFillSetting } from '@react-icons/all-files/ai/AiFillSetting';
import { AiOutlineSetting } from '@react-icons/all-files/ai/AiOutlineSetting';
import { FiBook } from '@react-icons/all-files/fi/FiBook';
import { FiBookOpen } from '@react-icons/all-files/fi/FiBookOpen';
import { RiUser3Fill } from '@react-icons/all-files/ri/RiUser3Fill';
import { RiUser3Line } from '@react-icons/all-files/ri/RiUser3Line';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { useUser } from '@/hook/useUser';
import { id_chage } from '@/redux/features/idSlice';
import { useAppDispatch } from '@/redux/hook';
import styles from '@/styles/Sidebar.module.css';
import { SessionType } from '@/types/global';

export default function SidebarServerItem({
  session,
}: {
  session: SessionType | null;
}) {
  const dispatch = useAppDispatch();
  const { user } = useUser(session ? session.user.email : '', 'email') as {
    user: string;
  };
  const pathname = usePathname();

  useEffect(() => {
    dispatch(id_chage(user));
  }, [user]);

  const item = [
    {
      icon: RiUser3Line,
      visited_icon: RiUser3Fill,
      label: '프로필',
      link: `/profile/${user ? user : ''}`,
    },
    {
      icon: FiBook,
      visited_icon: FiBookOpen,
      label: '단어장',
      link: `/book/${user ? user : ''}`,
    },
    {
      icon: AiOutlineSetting,
      visited_icon: AiFillSetting,
      label: '설정',
      link: `/setting/${user ? user : ''}`,
    },
  ];

  return (
    <>
      {item.map((item, index) => (
        <Link href={user ? item.link : '/login'} key={index}>
          <div
            className={
              pathname === item.link ? styles.item_active : styles.item
            }
          >
            <div className={styles.item_icon}>
              {pathname === item.link ? item.visited_icon() : item.icon()}
            </div>
            <div className={styles.item_label}>{item.label}</div>
            <div></div>
          </div>
        </Link>
      ))}
    </>
  );
}
