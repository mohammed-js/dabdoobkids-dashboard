import axios from "axios";

const instance = axios.create({
  // baseURL: "https://dabdoobkidz-api.onrender.com",
  // baseURL: "https://api.dabdoobkidz.com/",
  baseURL: "https://api.dabdoobkidz.com/",
});

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    if (localStorage.getItem("access_token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "access_token"
      )}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    // alert(error.message);
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Do something with response error
    alert(error.message);
    console.error("Response Error Interceptor:", error);
    return Promise.reject(error);
  }
);

export default instance;
