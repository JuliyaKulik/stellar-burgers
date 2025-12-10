import { FC, ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
<<<<<<< HEAD
<<<<<<< HEAD
import { Preloader } from '../ui/preloader';
=======
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
import { Preloader } from '../ui/preloader';
>>>>>>> 98fff6f (на ревью)

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

export const ProtectedRoute: FC<TProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
<<<<<<< HEAD
<<<<<<< HEAD
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
=======
  const user = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
=======
>>>>>>> 98fff6f (на ревью)
  const location = useLocation();
  const { user, isAuthChecked } = useSelector((state) => state.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
<<<<<<< HEAD
    const from = location.state?.from?.pathname || '/';
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
    const from = location.state?.from || { pathname: '/' };
>>>>>>> 98fff6f (на ревью)
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
