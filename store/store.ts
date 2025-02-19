import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './slices/categorySlice';
import serviceReducers from './slices/service/service'
import transactionReducers from '../store/slices/transcation/transactionSlice'
import serviceInfoReducers from '../store/slices/service-info/serviceInfoSlice'
import quequeReducers from '../store/slices/queque/quequeSlice'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    services: serviceReducers,
    transaction: transactionReducers,
    serviceInfo: serviceInfoReducers,
    queque: quequeReducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
