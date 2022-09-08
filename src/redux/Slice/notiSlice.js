import { createSlice } from '@reduxjs/toolkit';

export const notificationSlice = createSlice({
   name: 'notification',
   initialState: {
      notification: {
         result: null,
         isFetching: false,
         error: false,
      },
   },
   reducers: {
      getNotificationStart: (state) => {
         state.notification.isFetching = true;
      },
      getNotificationSuccess: (state, action) => {
         state.notification.isFetching = false;
         state.notification.result = action.payload;
         state.notification.error = false;
      },
      getNotificationFailed: (state) => {
         state.notification.isFetching = false;
         state.notification.error = true;
      },
   },
});

export const { getNotificationStart, getNotificationSuccess, getNotificationFailed } = notificationSlice.actions;
export default notificationSlice.reducer;
