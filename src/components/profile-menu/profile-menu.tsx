// components/profile-menu/profile-menu.tsx
import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { ProfileMenuUI } from '@ui';
import { userLogout } from '../../services/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(userLogout());
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
