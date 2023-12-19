import styles from '@/styles/Write.module.css';

import WriteContainer from './WriteContainer';

export default function WriteCard() {
  return (
    <div className={styles.write_ouuter}>
      <WriteContainer />
    </div>
  );
}
