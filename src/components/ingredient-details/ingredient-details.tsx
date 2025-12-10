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
=======
>>>>>>> 98fff6f (на ревью)
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
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  }

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
