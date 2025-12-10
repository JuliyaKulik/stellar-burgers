import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
<<<<<<< HEAD
<<<<<<< HEAD
import { TConstructorIngredient } from '@utils-types';
=======
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
import { TConstructorIngredient } from '@utils-types';
>>>>>>> 98fff6f (на ревью)
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 98fff6f (на ревью)
  const burgerConstructor = useSelector((state) => state.constructor);
  const ingredientsCounters = useMemo(() => {
    const counters: { [key: string]: number } = {};

    if (!burgerConstructor) {
      return counters;
    }

    const { bun, ingredients: constructorIngredients } = burgerConstructor;

    if (constructorIngredients && Array.isArray(constructorIngredients)) {
      constructorIngredients.forEach((ingredient: TConstructorIngredient) => {
        if (ingredient && ingredient._id) {
          if (!counters[ingredient._id]) {
            counters[ingredient._id] = 0;
          }
          counters[ingredient._id]++;
        }
      });
    }

    if (bun && bun._id) {
<<<<<<< HEAD
=======
  // Простые селекторы с дефолтными значениями
  const bun = useSelector((state) => state.constructor?.bun);
  const constructorIngredients = useSelector(
    (state) => state.constructor?.ingredients || []
  );

  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};

    // Счетчик для обычных ингредиентов
    constructorIngredients.forEach((item) => {
      const id = item._id;
      counters[id] = (counters[id] || 0) + 1;
    });

    // Счетчик для булки (всегда 2)
    if (bun) {
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
>>>>>>> 98fff6f (на ревью)
      counters[bun._id] = 2;
    }

    return counters;
  }, [bun, constructorIngredients]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
