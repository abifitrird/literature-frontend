import axios from "axios";

// set base URL in config defaults with axios
export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// integrate default header for auth
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
