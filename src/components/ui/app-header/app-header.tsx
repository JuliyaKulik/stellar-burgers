import { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  isConstructorActive = false,
  isFeedActive = false,
  isProfileActive = false
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <a
          href='/'
          className={`${styles.link} ${isConstructorActive ? styles.link_active : ''}`}
        >
          <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2 mr-10'>Конструктор</p>
        </a>

        <a
          href='/feed'
          className={`${styles.link} ${isFeedActive ? styles.link_active : ''}`}
        >
          <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>Лента заказов</p>
        </a>
      </div>

      <div className={styles.logo}>
        <a href='/'>
          <Logo className='' />
        </a>
      </div>

      <div className={styles.link_position_last}>
        <a
          href='/profile'
          className={`${styles.link} ${isProfileActive ? styles.link_active : ''}`}
        >
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </a>
      </div>
    </nav>
  </header>
);
