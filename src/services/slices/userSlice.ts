// services/slices/userSlice.ts
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

// Export thunks
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

      // Если нет токена, сразу возвращаем null
      if (!accessToken) {
        return null;
      }

      const response = await getUserApi(); // Добавьте await!

      // Если API вернул ошибку, очищаем токен
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
      // Check User Auth
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true; // Добавляем эту строку!
        state.user = action.payload;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true; // ВАЖНО: даже при ошибке устанавливаем true
        state.user = null;
      })

      // Login - используем userLogin (а не loginUser)
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
          setCookie('refreshToken', action.payload.refreshToken);
        }
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Login failed';
      })

      // Register - используем userRegister (а не registerUser)
      .addCase(userRegister.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          setCookie('accessToken', action.payload.accessToken);
          setCookie('accessToken', action.payload.accessToken);
        }
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Registration failed';
      })

      // Update User - используем userUpdate (а не updateUser)
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
        state.error = action.error.message || 'Update failed';
      })

      // Logout - используем userLogout (а не logoutUser)
      .addCase(userLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Logout failed';
      })

      // Get User
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
        state.error = action.error.message || 'Get user failed';
      });
  }
});

export const { setAuthChecked, setUser, clearError } = userSlice.actions;
export default userSlice.reducer;
