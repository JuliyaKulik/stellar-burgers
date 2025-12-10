import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { useLocation } from 'react-router-dom';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.user.user);
  const location = useLocation();

  const isConstructorActive = location.pathname === '/';
  const isFeedActive = location.pathname === '/feed';
  const isProfileActive = location.pathname.startsWith('/profile');

  return (
    <AppHeaderUI
      userName={user?.name || ''}
      isConstructorActive={isConstructorActive}
      isFeedActive={isFeedActive}
      isProfileActive={isProfileActive}
    />
  );
};
