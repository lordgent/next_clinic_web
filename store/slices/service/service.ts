import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE = 'http://apiclinic.l012d63n7.site:8181/api/user';

const ENDPOINTS = {
  services: `${API_BASE}/services`,
  serviceDetail: (name: string) => `${API_BASE}/service/${name}`,
  queue: (clinicId: string) => `${API_BASE}/clinic/queque/${clinicId}`,
};

interface Service {
  id: number;
  name: string;
  address: string;
  photo: string;
  price: string;
  clinic_id: string;
}

interface Queue {
  id: string;
  day: string;
  quota: number;
  available_date: string;
  open_time: string;
  close_time: string;

}

interface ServiceState {
  service: Service[];
  serviceDetail: Service | null;
  queue: Queue[];
  loadingService: boolean;
  loadingDetail: boolean;
  loadingQueue: boolean;
  errorService: string | null;
  errorDetail: string | null;
  errorQueue: string | null;
}

export const fetchService = createAsyncThunk('service/fetchService', async () => {
  const token = Cookies.get('token');
  const response = await fetch(ENDPOINTS.services, {
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

// Fetch Service Detail
export const fetchDetailService = createAsyncThunk('service/fetchDetailService', async (name: string) => {
  const token = Cookies.get('token');
  const response = await fetch(ENDPOINTS.serviceDetail(name), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch service details');

  const data = await response.json();
  return data.data || null;
});

export const fetchQueue = createAsyncThunk('service/fetchQueue', async (clinicId: string) => {
  const token = Cookies.get('token');
  const response = await fetch(ENDPOINTS.queue(clinicId), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Failed to fetch queue data');

  const data = await response.json();
  return data.data || [];
});

const initialState: ServiceState = {
  service: [],
  serviceDetail: null,
  queue: [],
  loadingService: false,
  loadingDetail: false,
  loadingQueue: false,
  errorService: null,
  errorDetail: null,
  errorQueue: null,
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchService.pending, (state) => {
        state.loadingService = true;
        state.errorService = null;
      })
      .addCase(fetchService.fulfilled, (state, action) => {
        state.loadingService = false;
        state.service = action.payload;
      })
      .addCase(fetchService.rejected, (state, action) => {
        state.loadingService = false;
        state.errorService = action.error.message || 'Failed to fetch services';
      })

      .addCase(fetchDetailService.pending, (state) => {
        state.loadingDetail = true;
        state.errorDetail = null;
      })
      .addCase(fetchDetailService.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.serviceDetail = action.payload;
      })
      .addCase(fetchDetailService.rejected, (state, action) => {
        state.loadingDetail = false;
        state.errorDetail = action.error.message || 'Failed to fetch service details';
      })

      // Fetch Queue
      .addCase(fetchQueue.pending, (state) => {
        state.loadingQueue = true;
        state.errorQueue = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loadingQueue = false;
        state.queue = action.payload;
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loadingQueue = false;
        state.errorQueue = action.error.message || 'Failed to fetch queue data';
      });
  },
});

export default serviceSlice.reducer;
