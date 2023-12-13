import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { BiSearchAlt } from '@react-icons/all-files/bi/BiSearchAlt';
import { IoHome } from '@react-icons/all-files/io5/IoHome';
import { IoHomeOutline } from '@react-icons/all-files/io5/IoHomeOutline';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import styles from '@/styles/Sidebar.module.css';
import { SessionType } from '@/types/global';

import AddWordBtn from '../AddWordBtn';
import LoginBtn from './_btn/LoginBtn';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import SidebarServerItem from './SidebarServerItem';

export default async function Sidebar() {
  const session: SessionType | null = await getServerSession(authOptions);
  const items = [
    {
      icon: IoHomeOutline,
      visited_icon: IoHome,
      label: '홈',
      link: '/',
    },

    {
      icon: BiSearch,
      visited_icon: BiSearchAlt,
      label: '검색',
      link: '/search',
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_inner}>
        <SidebarLogo />
        <div>
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon()}
              visited_icon={item.visited_icon()}
              label={item.label}
              link={item.link}
            />
          ))}
        </div>
        <SidebarServerItem session={session} />
        <LoginBtn session={session} />
        <AddWordBtn />
      </div>
    </div>
  );
}
