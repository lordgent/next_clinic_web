import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import serviceReducers from './slices/service/service'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    services: serviceReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
