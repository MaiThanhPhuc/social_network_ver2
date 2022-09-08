import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
   name: 'search',
   initialState: {
      search: {
         result: null,
         isFetching: false,
         error: false,
      },
   },

   reducers: {
      getSearchStart: (state) => {
         state.search.isFetching = true;
      },
      getSearchSuccess: (state, action) => {
         state.search.isFetching = false;
         state.search.result = action.payload;
         state.search.error = false;
      },
      getSearchClear: (state) => {
         state.search.isFetching = false;
         state.search.result = null;
         state.search.error = false;
      },
      getSearchFailed: (state) => {
         state.search.isFetching = false;
         state.search.error = true;
      },
   },
});

export const { getSearchStart, getSearchSuccess, getSearchFailed, getSearchClear } = searchSlice.actions;
export default searchSlice.reducer;
