import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Функция для обновления ленты заказов
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
>>>>>>> 98fff6f (на ревью)
  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Загружаем заказы при монтировании компонента
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
>>>>>>> 98fff6f (на ревью)
  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

<<<<<<< HEAD
<<<<<<< HEAD
  if (isLoading && orders.length === 0) {
    return <Preloader />;
  }

  if (error) {
    return (
      <div className='text text_type_main-default mt-20'>
=======
  // Показываем прелоадер во время загрузки
  if (isLoading) {
=======
  if (isLoading && orders.length === 0) {
>>>>>>> 98fff6f (на ревью)
    return <Preloader />;
  }

  if (error) {
    return (
<<<<<<< HEAD
      <div>
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
      <div className='text text_type_main-default mt-20'>
>>>>>>> 98fff6f (на ревью)
        <h1>Ошибка загрузки ленты заказов</h1>
        <p>{error}</p>
        <button onClick={handleGetFeeds}>Повторить попытку</button>
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
