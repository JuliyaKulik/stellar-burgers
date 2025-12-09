import { FeedUI } from '@ui-pages';
import { FC, useEffect, useCallback } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedSlice';
import { Preloader } from '@ui';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const { orders, isLoading, error } = useSelector((state) => state.feed);

  // Функция для обновления ленты заказов
  const handleGetFeeds = useCallback(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  // Загружаем заказы при монтировании компонента
  useEffect(() => {
    handleGetFeeds();
  }, [handleGetFeeds]);

  // Показываем прелоадер во время загрузки
  if (isLoading) {
    return <Preloader />;
  }

  // Если есть ошибка
  if (error) {
    return (
      <div>
        <h1>Ошибка загрузки ленты заказов</h1>
        <p>{error}</p>
        <button onClick={handleGetFeeds}>Повторить попытку</button>
      </div>
    );
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
