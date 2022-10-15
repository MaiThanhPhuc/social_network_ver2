import axios from "axios";

const API_URL = "https://socialnetwork999.herokuapp.com/api/";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "login", {
      email,
      password,
    });
  }

  logout() {
    localStorage.clear();
  }
  register(firstName, lastName, email, birthDay, gender, password) {
    return axios.post(API_URL + "register", {
      firstName,
      lastName,
      email,
      birthDay,
      gender,
      password,
    });
  }
  getCurrentUSer() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
