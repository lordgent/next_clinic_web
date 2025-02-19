import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE = 'http://185.170.198.166:8000/api/user';

const ENDPOINTS = {
  transactionUser: `${API_BASE}/transaction-all`,
  transactionUserCek: `${API_BASE}/transaction-cek`,
};


interface Booking {
    id: string;
    available_date: string | null;
    quota: number;
    clinic_id: string;
    created_at: string;
    updated_at: string;
    day: string;
    open_time: string;
    close_time: string;
}

interface Clinic {
    id: string;
    name: string;
    address: string;
    phone: string;
    price: string;
    photo: string;
    user_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
}

interface Transaction {
    id: string;
    admin_fee: string;
    transaction_code: string;
    user_id: string;
    booking_id: string;
    clinic_id: string;
    created_at: string;
    updated_at: string;
    status: string;
    no_antrian: string;
    booking: Booking;
    clinic: Clinic;
}


export const fetchUserTransaction = createAsyncThunk('transcation/user', async () => {
    const token = Cookies.get('token');
    const response = await fetch(ENDPOINTS.transactionUser, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
});



if (!response.ok) throw new Error('Failed to fetch services');

const data = await response.json();
return data.data || [];
});

export const fetchCekTransaction = createAsyncThunk('transcation/user-cek-transaction', async (clinicId: string) => {
  const token = Cookies.get('token');
  const response = await fetch(ENDPOINTS.transactionUserCek, {
    method: 'POST',
    body: JSON.stringify({
      "clinic_id": clinicId
    }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
});

if (!response.ok) throw new Error('Failed to fetch services');

const data = await response.json();
return data.data;
});

interface TransactionState {
    transactions: Transaction[];
    loadingTransactionAll: boolean;
    errorTransactionAll: string | null;
    cekTransaction: boolean;
    loadingTransactionCek: boolean;
    errorTransactionCek: string | null;
}
  

const initialState: TransactionState = {
    transactions: [],
    loadingTransactionAll: false,
    errorTransactionAll: "",
    cekTransaction: false,
    loadingTransactionCek: false,
    errorTransactionCek: ""
  };
  

  const transactionSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        // Fetch Service
        .addCase(fetchUserTransaction.pending, (state) => {
          state.loadingTransactionAll = true;
          state.errorTransactionAll = null;
        })
        .addCase(fetchUserTransaction.fulfilled, (state, action) => {
          state.loadingTransactionAll = false;
          state.transactions = action.payload;
        })
        .addCase(fetchUserTransaction.rejected, (state, action) => {
          state.loadingTransactionAll = false;
          state.errorTransactionAll = action.error.message || 'Failed to fetch transactions';
        })
        
        //  Cek transaction
        .addCase(fetchCekTransaction.pending, (state) => {
          state.loadingTransactionCek = true;
          state.errorTransactionCek = null;
        })
        .addCase(fetchCekTransaction.fulfilled, (state, action) => {
          state.loadingTransactionCek = false;
          state.cekTransaction = action.payload;
        })
        .addCase(fetchCekTransaction.rejected, (state, action) => {
          state.loadingTransactionCek = false;
          state.errorTransactionCek = action.error.message || 'Failed to fetch cek transactions';
        });
    },
  });
  
  export default transactionSlice.reducer;
  