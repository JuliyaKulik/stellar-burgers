import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

<<<<<<< HEAD
=======
  // Функция для обновления ленты заказов
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

<<<<<<< HEAD
=======
  // Загружаем заказы при монтировании компонента
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

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
    return <Preloader />;
  }

  // Если есть ошибка
  if (error) {
    return (
      <div>
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
        <h1>Ошибка загрузки ленты заказов</h1>
        <p>{error}</p>
        <button onClick={handleGetFeeds}>Повторить попытку</button>
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
