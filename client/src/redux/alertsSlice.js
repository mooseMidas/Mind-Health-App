/* eslint-disable no-param-reassign */

// Redux slice for handling loading state and rendering loader icon
import { createSlice } from '@reduxjs/toolkit';

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState: {
    loading: false,
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

export const { showLoading, hideLoading } = alertsSlice.actions;
