import { FC, memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
<<<<<<< HEAD
import { TConstructorIngredient } from '../../utils/types';
import { addBun, addIngredient } from '../../services/slices/constructorSlice';
=======
import {
  addBun,
  addIngredient
} from '../../services/slices/constructorSlice';
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleClick = () => {
      navigate(`/ingredients/${ingredient._id}`, {
        state: { background: location }
      });
    };

    const handleAdd = () => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98fff6f (на ревью)
      const constructorIngredient: TConstructorIngredient = {
        ...ingredient,
        id: `${ingredient._id}-${Date.now()}-${Math.random().toString(36).slice(2)}`
      };

      if (ingredient.type === 'bun') {
        dispatch(addBun(constructorIngredient));
      } else {
        dispatch(addIngredient(constructorIngredient));
=======
      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredient));
      } else {
        dispatch(addIngredient(ingredient));
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
        onClick={handleClick}
      />
    );
  }
);
