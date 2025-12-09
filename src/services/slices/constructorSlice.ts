<<<<<<< HEAD
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TBurgerConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      bun: action.payload
    }),
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => ({
      ...state,
      ingredients: [...(state.ingredients || []), action.payload]
    }),
    removeIngredient: (state, action: PayloadAction<string>) => ({
      ...state,
      ingredients: (state.ingredients || []).filter(
        (item) => item.id !== action.payload
      )
    }),
=======
// constructorSlice.ts
import { createSlice, PayloadAction, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createOrder } from './orderSlice';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
  totalPrice: number;
}

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
  totalPrice: 0
};

const calculateTotalPrice = (
  bun: TIngredient | null,
  ingredients: TConstructorIngredient[]
) => {
  const bunPrice = bun ? bun.price * 2 : 0;
  const ingredientsPrice = ingredients.reduce(
    (sum, item) => sum + item.price,
    0
  );
  return bunPrice + ingredientsPrice;
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
      state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.ingredients.push(action.payload);
        state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
      state.totalPrice = calculateTotalPrice(state.bun, state.ingredients);
    },
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
<<<<<<< HEAD
      const ingredients = [...(state.ingredients || [])];

      if (
        fromIndex >= 0 &&
        fromIndex < ingredients.length &&
        toIndex >= 0 &&
        toIndex < ingredients.length
      ) {
        const [movedItem] = ingredients.splice(fromIndex, 1);
        ingredients.splice(toIndex, 0, movedItem);
      }

      return {
        ...state,
        ingredients
      };
    },
    clearIngredients: () => initialState
  }
});

export const burgerReducer = constructorSlice.reducer;
=======
      const ingredients = [...state.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, (state) => {
      state.bun = null;
      state.ingredients = [];
      state.totalPrice = 0;
    });
  }
});

>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
export const {
  addBun,
  addIngredient,
  removeIngredient,
<<<<<<< HEAD
  clearIngredients,
  moveIngredient
} = constructorSlice.actions;
=======
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
