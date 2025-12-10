<<<<<<< HEAD
<<<<<<< HEAD
=======
// services/store.ts
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======
>>>>>>> 98fff6f (на ревью)
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userReducer from './slices/userSlice';
import ingredientsReducer from './slices/ingredientsSlice';
<<<<<<< HEAD
import { burgerReducer } from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import userOrdersReducer from './slices/userOrdersSlice';
<<<<<<< HEAD

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: burgerReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  userOrders: userOrdersReducer
=======
import constructorReducer from './slices/constructorSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: constructorReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
=======

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructor: burgerReducer,
  feed: feedReducer,
  order: orderReducer,
  user: userReducer,
  userOrders: userOrdersReducer
>>>>>>> 98fff6f (на ревью)
});

export const store = configureStore({
  reducer: rootReducer,
<<<<<<< HEAD
=======
  devTools: process.env.NODE_ENV !== 'production',
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
