import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
<<<<<<< HEAD
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!ingredientData) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 className='text text_type_main-large mb-4'>Ингредиент не найден</h2>
        <p className='text text_type_main-medium'>ID: {id}</p>
      </div>
    );
=======

  // Получаем данные из стора
  const { ingredients, isLoading } = useSelector((state) => state.ingredients);

  // Находим ингредиент по ID из URL
  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === id
  );

  // Загружаем ингредиенты при монтировании, если их нет
  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(fetchIngredients());
    }
  }, [dispatch, ingredients.length]);

  // Показываем прелоадер во время загрузки
  if (isLoading) {
    return <Preloader />;
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  }

  // Если ингредиент не найден после загрузки
  if (!ingredientData) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2 className='text text_type_main-large mb-4'>Ингредиент не найден</h2>
        <p className='text text_type_main-medium'>ID: {id}</p>
      </div>
    );
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
