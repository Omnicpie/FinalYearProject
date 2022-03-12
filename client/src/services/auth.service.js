import axios from "axios";

const API_URL = "https://eshopapi.ryananderson.uk/api/auth/";

class AuthService {
  login(display_name, password) {
    return axios
      .post(API_URL + "signin", {
        display_name,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(display_name, email, password) {
    return axios.post(API_URL + "signup", {
      display_name,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
