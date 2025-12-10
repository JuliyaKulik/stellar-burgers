import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';

export const BurgerConstructor: FC = () => {
<<<<<<< HEAD
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = {
    bun: {
      price: 0
    },
    ingredients: []
  };

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
=======
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const constructorState = useSelector((state) => state.constructor);
  const bun = constructorState?.bun || null;
  const ingredients = constructorState?.ingredients || [];

  const { isLoading: orderRequest, currentOrder: orderModalData } = useSelector(
    (state) => state.order
  );

  const user = useSelector((state) => state.user.user);

  const constructorItems = {
    bun,
    ingredients
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', { state: { from: '/' } });
      return;
    }

    if (!bun) {
      alert('Выберите булку!');
      return;
    }

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
        dispatch(clearIngredients());
      })
      .catch((error) => {
        console.error('Не удалось создать заказ:', error);
      });
>>>>>>> 98fff6f (на ревью)
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

<<<<<<< HEAD
  return null;
=======
  const price = useMemo(() => {
    const bunPrice = bun ? bun.price * 2 : 0;
    const ingredientsPrice = ingredients.reduce(
      (sum: number, item: TConstructorIngredient) => {
        if (!item || typeof item.price !== 'number') {
          return sum;
        }
        return sum + item.price;
      },
      0
    );
    return bunPrice + ingredientsPrice;
  }, [bun, ingredients]);
>>>>>>> 98fff6f (на ревью)

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
