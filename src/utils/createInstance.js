import axios from 'axios';
import { loginSuccess } from '~/redux/Slice/authSlice';
import jwtDecode from 'jwt-decode';

const refreshToken = async () => {
   try {
      const res = await axios.post('https://socialnetwork999.herokuapp.com/api/refreshToken', {});
      return res.data;
   } catch (error) {
      console.log(error);
   }
};

export const createAxios = (user, dispatch) => {
   const newInstance = axios.create();
   newInstance.interceptors.request.use(
      async (config) => {
         let date = new Date();
         const decodedToken = jwtDecode(user?.access_token);
         if (decodedToken.exp < date.getTime()) {
            const data = await refreshToken();
            const refreshUser = {
               ...user,
               access_token: data.access_token,
            };
            dispatch(loginSuccess(refreshUser));
            config.headers['Authorization'] = 'Bearer ' + data.access_token;
         }
         return config;
      },
      (err) => {
         return Promise.reject(err);
      },
   );
   return newInstance;
};
