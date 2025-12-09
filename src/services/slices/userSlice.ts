<<<<<<< HEAD
=======
// services/slices/userSlice.ts
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getUserApi,
  updateUserApi,
  logoutApi,
  loginUserApi,
  registerUserApi
} from '@api';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie, getCookie } from '../../utils/cookie';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: null
};

<<<<<<< HEAD
=======
// Export thunks
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
export const userRegister = createAsyncThunk('user/register', registerUserApi);
export const userLogin = createAsyncThunk('user/login', loginUserApi);
export const userLogout = createAsyncThunk('user/logout', logoutApi);
export const getUser = createAsyncThunk('user/get', getUserApi);
export const userUpdate = createAsyncThunk('user/update', updateUserApi);

export const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    try {
      const accessToken = getCookie('accessToken');

<<<<<<< HEAD
=======
      // Если нет токена, сразу возвращаем null
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      if (!accessToken) {
        return null;
      }

<<<<<<< HEAD
      const response = await getUserApi();

=======
      const response = await getUserApi(); // Добавьте await!

      // Если API вернул ошибку, очищаем токен
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      if (!response.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        return null;
      }

      return response.user;
    } catch (error) {
      console.error('Auth check failed:', error);
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return null;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
<<<<<<< HEAD
=======
      // Check User Auth
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.isAuthChecked = true;
=======
        state.isAuthChecked = true; // Добавляем эту строку!
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
        state.user = action.payload;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.isAuthChecked = true;
        state.user = null;
      })

=======
        state.isAuthChecked = true; // ВАЖНО: даже при ошибке устанавливаем true
        state.user = null;
      })

      // Login - используем userLogin (а не loginUser)
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
<<<<<<< HEAD
          localStorage.setItem('refreshToken', action.payload.refreshToken);
=======
          setCookie('refreshToken', action.payload.refreshToken);
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.error = action.error.message || 'Ошибка входа';
      })

=======
        state.error = action.error.message || 'Login failed';
      })

      // Register - используем userRegister (а не registerUser)
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
<<<<<<< HEAD
          localStorage.setItem('refreshToken', action.payload.refreshToken);
=======
          setCookie('accessToken', action.payload.accessToken);
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.error = action.error.message || 'Ошибка регистрации';
      })

=======
        state.error = action.error.message || 'Registration failed';
      })

      // Update User - используем userUpdate (а не updateUser)
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(userUpdate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(userUpdate.rejected, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.error = action.error.message || 'Ошибка обновления';
      })

      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
        state.error = null;
=======
        state.error = action.error.message || 'Update failed';
      })

      // Logout - используем userLogout (а не logoutUser)
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
<<<<<<< HEAD
        state.isAuthChecked = true;
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка выхода';
      })

=======
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      })

      // Get User
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
        }
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        state.error =
          action.error.message || 'Не удалось получить пользователя';
=======
        state.error = action.error.message || 'Get user failed';
>>>>>>> ec94571 (отображаются компоненты, не работает кнопка добавить)
      });
  }
});

export const { setAuthChecked, setUser, clearError } = userSlice.actions;
export default userSlice.reducer;
