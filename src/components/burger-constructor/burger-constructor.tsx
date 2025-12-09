import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useAppDispatch, useSelector } from '../../services/store';
import { createOrder } from '../../services/slices/orderSlice';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { clearOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Берем данные из стора
  const bun = useSelector((state) => state.constructor.bun);
  const ingredients = useSelector((state) => state.constructor.ingredients);
  const user = useSelector((state) => state.user.user);
  const { order, isLoading: orderRequest } = useSelector(
    (state) => state.order
  );

  // Формируем объект constructorItems
  const constructorItems = {
    bun: bun || null,
    ingredients: ingredients || []
  };

  const onOrderClick = () => {
    if (!bun) {
      alert('Выберите булку!');
      return;
    }

    if (!ingredients || ingredients.length === 0) {
      alert('Добавьте ингредиенты!');
      return;
    }

    if (!user) {
      alert('Для оформления заказа необходимо авторизоваться');
      navigate('/login');
      return;
    }

    if (orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((item: TConstructorIngredient) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds)).then((action) => {
      if (createOrder.fulfilled.match(action)) {
        dispatch(clearConstructor());
      }
    });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients
      ? ingredients.reduce((s, v) => s + v.price, 0)
      : 0;
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
