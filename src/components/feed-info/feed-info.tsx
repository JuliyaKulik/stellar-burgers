import { FC } from 'react';
import { TOrdersData } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
  // Берем переменные из стора
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
>>>>>>> 98fff6f (на ревью)
  const { orders, total, totalToday } = useSelector((state) => state.feed);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const feed: TOrdersData = {
    orders,
    total,
    totalToday
  };

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
