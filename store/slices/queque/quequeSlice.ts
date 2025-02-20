import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const API_BASE = 'http://apiclinic.l012d63n7.site:8181/api/admin';

const ENDPOINTS = {
  currentQueue: (clinicId: string) => `${API_BASE}/current-queque/${clinicId}`,
  activeQueue: (clinicId: string) => `${API_BASE}/active-queque/${clinicId}`,
};

interface Queue {
  id: string;
  queue_number: string;
  patient_name: string;
  status: string;
}

interface QueueState {
  currentQueue: Queue | null;
  activeQueue: Queue[];
  loadingCurrent: boolean;
  loadingActive: boolean;
  errorCurrent: string | null;
  errorActive: string | null;
}

// Fetch Current Queue
export const fetchCurrentQueue = createAsyncThunk(
  'queue/fetchCurrentQueue',
  async (clinicId: string) => {
    const token = Cookies.get('token');
    const response = await fetch(ENDPOINTS.currentQueue(clinicId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch current queue');

    const data = await response.json();
    return data.data || null;
  }
);

// Fetch Active Queue
export const fetchActiveQueue = createAsyncThunk(
  'queue/fetchActiveQueue',
  async (clinicId: string) => {
    const token = Cookies.get('token');
    const response = await fetch(ENDPOINTS.activeQueue(clinicId), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch active queue');

    const data = await response.json();
    return data.data || [];
  }
);

const initialState: QueueState = {
  currentQueue: null,
  activeQueue: [],
  loadingCurrent: false,
  loadingActive: false,
  errorCurrent: null,
  errorActive: null,
};

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Current Queue
      .addCase(fetchCurrentQueue.pending, (state) => {
        state.loadingCurrent = true;
        state.errorCurrent = null;
      })
      .addCase(fetchCurrentQueue.fulfilled, (state, action) => {
        state.loadingCurrent = false;
        state.currentQueue = action.payload;
      })
      .addCase(fetchCurrentQueue.rejected, (state, action) => {
        state.loadingCurrent = false;
        state.errorCurrent = action.error.message || 'Failed to fetch current queue';
      })

      // Fetch Active Queue
      .addCase(fetchActiveQueue.pending, (state) => {
        state.loadingActive = true;
        state.errorActive = null;
      })
      .addCase(fetchActiveQueue.fulfilled, (state, action) => {
        state.loadingActive = false;
        state.activeQueue = action.payload;
      })
      .addCase(fetchActiveQueue.rejected, (state, action) => {
        state.loadingActive = false;
        state.errorActive = action.error.message || 'Failed to fetch active queue';
      });
  },
});

export default queueSlice.reducer;
