import axios from "axios";

// set base URL in config defaults with axios
export const API = axios.create({
  baseURL: "https://sleepy-reaches-53574.herokuapp.com/api/v1",
});

// integrate default header for auth
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
