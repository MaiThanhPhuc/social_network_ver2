import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'user',
   initialState: {
      user: {
         user: null,
         isFetching: false,
         error: false,
      },
   },

   reducers: {
      getUserStart: (state) => {
         state.user.isFetching = true;
      },
      getUserSucces: (state, action) => {
         state.user.isFetching = false;
         state.user.user = action.payload;
         state.user.error = false;
      },
      getUserFailed: (state) => {
         state.user.isFetching = false;
         state.user.error = true;
      },
   },
});

export const { getUserStart, getUserSucces, getUserFailed } = userSlice.actions;
export default userSlice.reducer;
