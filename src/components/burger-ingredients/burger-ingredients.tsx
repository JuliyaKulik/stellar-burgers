import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
<<<<<<< HEAD
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
<<<<<<< HEAD
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const buns = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type === 'bun'),
=======
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';

export const BurgerIngredients: FC = () => {
  // Получаем массив ингредиентов из состояния
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  // Теперь TypeScript знает, что ingredients - это TIngredient[]
=======
  const ingredients = useSelector((state) => state.ingredients.ingredients);

>>>>>>> 98fff6f (на ревью)
  const buns = useMemo(
    () => ingredients.filter((item) => item.type === 'bun'),
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
    [ingredients]
  );

  const mains = useMemo(
<<<<<<< HEAD
    () => ingredients.filter((item: TIngredient) => item.type === 'main'),
=======
    () => ingredients.filter((item) => item.type === 'main'),
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
    [ingredients]
  );

  const sauces = useMemo(
<<<<<<< HEAD
    () => ingredients.filter((item: TIngredient) => item.type === 'sauce'),
=======
    () => ingredients.filter((item) => item.type === 'sauce'),
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
    [ingredients]
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun') {
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'main') {
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (tab === 'sauce') {
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
