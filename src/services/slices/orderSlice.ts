<<<<<<< HEAD
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { RootState } from '../store';

interface OrderState {
  currentOrder: TOrder | null;
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orderNumber: null,
  isLoading: false,
=======
// services/slices/orderSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

interface IOrderState {
  order: TOrder | null;
  userOrders: TOrder[]; // Добавляем историю заказов
  isLoading: boolean;
  isOrdersLoading: boolean; // Отдельный флаг загрузки заказов
  error: string | null;
}

const initialState: IOrderState = {
  order: null,
  userOrders: [],
  isLoading: false,
  isOrdersLoading: false,
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
<<<<<<< HEAD
  async (ingredients: string[], { getState }) => {
    const state = getState() as RootState;

    const { bun, ingredients: constructorIngredients } = state.constructor;

    if (!bun) {
      throw new Error('Выберите булку для заказа');
    }

    if (constructorIngredients.length === 0) {
      throw new Error('Добавьте начинку для заказа');
    }

    const data = await orderBurgerApi(ingredients);

    if (!data.success) {
      throw new Error('Не удалось создать заказ');
    }

    return data;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (orderNumber: number) => {
    const data = await getOrderByNumberApi(orderNumber);

    if (!data.success) {
      throw new Error('Ошибка загрузки');
    }

    return data.orders[0];
  }
=======
  orderBurgerApi
);
export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  getOrderByNumberApi
);

// Добавляем thunk для получения заказов пользователя
export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  getOrdersApi
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
<<<<<<< HEAD
      state.currentOrder = null;
      state.orderNumber = null;
      state.error = null;
=======
      state.order = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    clearUserOrders: (state) => {
      state.userOrders = [];
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
    }
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
=======
      // Создание заказа
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.currentOrder = action.payload.order;
        state.orderNumber = action.payload.order.number;
=======
        if (action.payload.success) {
          state.order = action.payload.order;
          // Добавляем новый заказ в историю
          state.userOrders.unshift(action.payload.order);
        }
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось создать заказ';
      })

<<<<<<< HEAD
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки';
=======
      // Получение заказа по номеру
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success && action.payload.orders.length > 0) {
          state.order = action.payload.orders[0];
        }
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось загрузить заказ';
      })

      // Получение истории заказов пользователя
      .addCase(fetchUserOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        // getOrdersApi возвращает TOrder[]
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error =
          action.error.message || 'Не удалось загрузить историю заказов';
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      });
  }
});

<<<<<<< HEAD
export const { clearOrder } = orderSlice.actions;
=======
export const { clearOrder, clearOrderError, clearUserOrders } =
  orderSlice.actions;
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
export default orderSlice.reducer;
