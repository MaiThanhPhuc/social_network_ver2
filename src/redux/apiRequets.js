import axios from 'axios';
import {
   loginFailed,
   loginStart,
   loginSuccess,
   registerFailed,
   registerStart,
   registerSuccess,
   logoutStart,
   logoutSuccess,
   logoutFailed,
} from './Slice/authSlice';
import { getUserFailed, getUserStart, getUserSucces } from './Slice/userSlice';
import { getSearchStart, getSearchSuccess, getSearchFailed } from './Slice/searchSlice';
import { getNotificationFailed, getNotificationStart, getNotificationSuccess } from './Slice/notiSlice';

const API_URL = process.env.REACT_APP_BASE_URL;

export const loginUser = async (user, dispatch, navigate) => {
   dispatch(loginStart());
   try {
      const res = await axios.post(API_URL + 'login', user);
      dispatch(loginSuccess(res.data));
      navigate('/');
   } catch (error) {
      dispatch(loginFailed());
   }
};
export const logOut = async (dispatch, navigate) => {
   dispatch(logoutStart());
   try {
      dispatch(logoutSuccess());
      navigate('/login');
   } catch (error) {
      dispatch(logoutFailed());
   }
};

export const registerUser = async (user, dispatch, navigate) => {
   dispatch(registerStart());
   try {
      await axios.post(API_URL + '/api/register', user);
      dispatch(registerSuccess());
      navigate('/login');
   } catch (error) {
      dispatch(registerFailed());
   }
};

export const getUser = async (accessToken, dispatch, userId) => {
   dispatch(getUserStart());
   try {
      const res = await axios.get(API_URL + `user?userId=${userId}`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      dispatch(getUserSucces(res.data));
   } catch (error) {
      dispatch(getUserFailed());
   }
};

export const searchUser = async (accessToken, dispatch, keyword) => {
   dispatch(getSearchStart());
   try {
      const res = await axios.get(API_URL + `user/search?keyword=${keyword}`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      dispatch(getSearchSuccess(res.data));
   } catch (error) {
      dispatch(getSearchFailed());
   }
};

export const getNotification = async (accessToken, dispatch, userID, page) => {
   dispatch(getNotificationStart());
   try {
      const res = await axios.get(API_URL + `user/notification?userId=${userID}&page=${page}&size=5`, {
         headers: {
            Authorization: `Bearer ${accessToken}`,
         },
      });
      dispatch(getNotificationSuccess(res.data));
   } catch (error) {
      dispatch(getNotificationFailed());
   }
};
