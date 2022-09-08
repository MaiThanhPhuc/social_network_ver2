import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_URL;

class UserService {
   async getNotification(userID, page, token) {
      const res = await axios.get(API_URL + `user/notification?userId=${userID}&page=${page}&size=5`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      return res.data.data;
   }
}

export default new UserService();
