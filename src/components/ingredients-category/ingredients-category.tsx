import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useSelector } from '../../services/store';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
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
