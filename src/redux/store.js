import { configureStore } from '@reduxjs/toolkit';
import authReduces from './Slice/authSlice';
import userReduces from './Slice/userSlice';
import searchReduces from './Slice/searchSlice';
import notiSlice from './Slice/notiSlice';
export default configureStore({
   reducer: {
      auth: authReduces,
      user: userReduces,
      search: searchReduces,
      notification: notiSlice,
   },
});
