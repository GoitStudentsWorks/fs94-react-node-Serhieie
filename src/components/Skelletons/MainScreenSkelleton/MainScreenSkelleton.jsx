import styles from './MainScreenSkelleton.module.scss';
import clsx from 'clsx';
import { useMedia } from '../../../hooks/useMedia.js';
import { ColumnListSkelleton } from './ColumnListSkelleton/ColumnListSkelleton.jsx';
import { AddButtonSkelleton } from './AddButtonSkelleton/AddButtonSkelleton.jsx';
import { useAuth } from '../../../hooks/useAuth.js';
import { useSelector } from 'react-redux';
import {
  selectBoardsState,
  selectCardsState,
} from '../../../redux/tasks/tasksSelectors.js';
import { useIsPopUpOpen } from '../../../hooks/useIsPopUpOpen.js';

export const MainScreenSkelleton = () => {
  const { theme } = useAuth();
  const { active } = useSelector(selectBoardsState);
  const { items } = useSelector(selectCardsState);
  const isFilterShow = items.length > 0;
  const { isSidebarOpen } = useIsPopUpOpen();
  const { isDesktop } = useMedia();

  return (
    <div className={styles.wrapper}>
      <div
        style={{
          backgroundImage: `url(${active ? active.background : ''})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        className={clsx(styles.mainScreen, {
          [styles.mainScreenDark]: theme === 'dark',
          [styles.mainScreenLight]: theme === 'light',
          [styles.mainScreenViolet]: theme === 'violet',
          [styles.mainScreenSidebarOpen]: isSidebarOpen && !isDesktop,
        })}
      >
        <div className={styles.mainScreenHead}>
          <div className={styles.headTitle}></div>
          {isFilterShow && <div className={styles.headFilter}></div>}
        </div>
        <div className={styles.mainContent}>
          <ColumnListSkelleton data={active} />
          <AddButtonSkelleton column={true} />
        </div>
      </div>
    </div>
  );
};
