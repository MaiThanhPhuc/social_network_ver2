import axios from 'axios';
import authHeader from './auth-header';
const API_URL = process.env.REACT_APP_BASE_URL;

class UserService {
   async getPostHomePage(userID, page) {
      const response = await axios.get(API_URL + `post/homepage?userId=${userID}&page=${page}&size=10`, {
         headers: authHeader(),
      });

      return response.data.data;
   }

   async likePost(userId, postID) {
      var config = {
         method: 'post',
         url: API_URL + `post/like?userId=${userId}&postId=${postID}`,
         headers: authHeader(),
      };
      return await axios(config);
   }
   async getUser(userId) {
      const response = await axios.get(API_URL + `user?userId=${userId}`, {
         headers: authHeader(),
      });

      return response.data.data;
   }

   async getGuest(userId, guestID) {
      const response = await axios.get(API_URL + `user/personalPage?userId=${userId}&personalPageId=${guestID}`, {
         headers: authHeader(),
      });

      return response.data.data;
   }

   newPost(content, userId) {
      return axios.post(
         API_URL + 'post',
         { content, userId },
         {
            headers: authHeader(),
         },
      );
   }

   async getPostUser(userID, page) {
      const response = await axios.get(API_URL + `post/user?userId=${userID}&page=${page}&size=10`, {
         headers: authHeader(),
      });

      return response.data.data;
   }
   async getPostGuest(userID, page, guestID) {
      const response = await axios.get(API_URL + `post/user?userId=${userID}&guestId=${guestID}&page=${page}&size=10`, {
         headers: authHeader(),
      });

      return response.data.data;
   }

   async getComment(postID, page) {
      const res = await axios.get(API_URL + `comment/post?postId=${postID}&page=${page}&size=2`, {
         headers: authHeader(),
      });
      return res.data.data;
   }

   reportUser(userID) {
      return axios.put(API_URL + `report/user/${userID}`, {
         headers: authHeader(),
      });
   }

   followUser(userID, userFollowed) {
      return axios.post(API_URL + `user/follow?userId=${userID}&userFollowedId=${userFollowed}`, {
         headers: authHeader(),
      });
   }

   reportPost(postID) {
      return axios.put(API_URL + `report/post/${postID}`, {
         headers: authHeader(),
      });
   }

   updateUser(id, firstName, lastName, bio, address, birthDay) {
      return axios.put(
         API_URL + 'user',
         { id, firstName, lastName, bio, address, birthDay },
         { headers: authHeader() },
      );
   }

   async searchUser(keyword) {
      const res = await axios.get(API_URL + `user/search?keyword=${keyword}`, {
         headers: authHeader(),
      });
      return res.data.data;
   }

   async getNotification(userID, page) {
      const res = await axios.get(API_URL + `user/notification?userId=${userID}&page=${page}&size=5`, {
         headers: authHeader(),
      });
      return res.data.data;
   }

   sendCodeReset(email) {
      return axios.post(
         API_URL + `resetPassword`,
         { email },
         {
            headers: authHeader(),
         },
      );
   }
   resetPassword(token, password) {
      return axios.post(
         API_URL + `savePassword`,
         { token, password },
         {
            headers: authHeader(),
         },
      );
   }

   getFollower(userID) {
      const res = axios.get(API_URL + `user/follower?userId=${userID}`, {
         headers: authHeader(),
      });
      return res;
   }

   getFollowing(userID) {
      const res = axios.get(API_URL + `user/following?userId=${userID}`, {
         headers: authHeader(),
      });
      return res;
   }
   getConversation(userID) {
      const res = axios.get(API_URL + `message/conversations?userId=${userID}&page=0&size=10`, {
         headers: authHeader(),
      });
      return res;
   }

   async getPostID(userID, postID) {
      const response = await axios.get(API_URL + `post/?postId=${postID}&userId=${userID}`, {
         headers: authHeader(),
      });
      return response.data.data;
   }
}

export default new UserService();
