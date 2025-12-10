// components/burger-constructor/burger-constructor.tsx
import { FC, useMemo } from 'react';
import { useAppDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { createOrder, clearOrder } from '../../services/slices/orderSlice';
import { clearIngredients } from '../../services/slices/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Используем constructor, а не burgerConstructor
  // ДОБАВЛЯЕМ ЗАЩИТУ ОТ undefined
  const constructorState = useSelector((state) => state.constructor);

  // Извлекаем данные с защитой
  const bun = constructorState?.bun || null;
  const ingredients = constructorState?.ingredients || []; // ВАЖНО: || []

  const { isLoading: orderRequest, currentOrder: orderModalData } = useSelector(
    (state) => state.order
  );

  const user = useSelector((state) => state.user.user);

  const constructorItems = {
    bun,
    ingredients // Теперь это всегда массив (пустой или с элементами)
  };

  const onOrderClick = () => {
    // Проверяем авторизацию через наличие user
    if (!user) {
      navigate('/login');
      return;
    }

    if (!bun) {
      alert('Выберите булку!');
      return;
    }

    // ingredients теперь всегда массив, проверяем длину
    if (ingredients.length === 0) {
      alert('Добавьте начинку!');
      return;
    }

    if (orderRequest) return;

    const ingredientIds = [
      bun._id,
      ...ingredients.map((ing: TConstructorIngredient) => ing._id),
      bun._id
    ];

    dispatch(createOrder(ingredientIds))
      .unwrap()
      .then(() => {
        // Очищаем конструктор после успешного заказа
        dispatch(clearIngredients());
      })
      .catch((error) => {
        console.error('Failed to create order:', error);
      });
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;

    // ingredients теперь всегда массив (благодаря || [] выше)
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => {
        // Добавляем дополнительную проверку на случай проблем
        if (!item || typeof item.price !== 'number') {
          return sum;
        }
        return sum + item.price;
      },
      0
    );

    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
