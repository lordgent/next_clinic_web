import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE = 'http://185.170.198.166:8000/api/user';

export const fetchServiceInfo = createAsyncThunk(
  'service-info/fetchServiceInfo', 
  async (clinicId: string) => {
    const token = Cookies.get('token');
    const response = await fetch(`${API_BASE}/service-info/${clinicId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch services');

    const data = await response.json();
    return data.data || [];
  }
);

interface ServiceState {
  serviceInfo: any;
  loadingServiceInfo: boolean;
  errorService: string | null;
}

const initialState: ServiceState = {
  serviceInfo: [],
  loadingServiceInfo: false,
  errorService: "",
};

const serviceInfoSlice = createSlice({
  name: 'service-info',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Service
      .addCase(fetchServiceInfo.pending, (state) => {
        state.loadingServiceInfo = true;
        state.errorService = null;
      })
      .addCase(fetchServiceInfo.fulfilled, (state, action) => {
        state.loadingServiceInfo = false;
        state.serviceInfo = action.payload;
      })
      .addCase(fetchServiceInfo.rejected, (state, action) => {
        state.loadingServiceInfo = false;
        state.errorService = action.error.message || 'Failed to fetch services';
      });
  },
});

export default serviceInfoSlice.reducer;
