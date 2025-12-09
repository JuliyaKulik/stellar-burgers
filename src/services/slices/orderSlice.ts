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
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
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
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    clearUserOrders: (state) => {
      state.userOrders = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Создание заказа
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.order = action.payload.order;
          // Добавляем новый заказ в историю
          state.userOrders.unshift(action.payload.order);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Не удалось создать заказ';
      })

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
      });
  }
});

export const { clearOrder, clearOrderError, clearUserOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
