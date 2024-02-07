'use client';

import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';

import styles from '@/styles/Sidebar.module.css';
import { WindowWidth } from '@/utils/windowWidth';
export const SidebarMove = () => {
  const { windowWidth } = WindowWidth();

  if (windowWidth > 768) {
    return null;
  }

  return (
    <button className={styles.sidebar_move}>
      <MdArrowDropDown size={25} />
    </button>
  );
};
