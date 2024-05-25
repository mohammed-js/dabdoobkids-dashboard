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

// import axios from "axios";
// import { notifySuccess, logout, refire } from "./generalUtils";
// const baseURL = "https://api.linnaea.ai/api";
// const instance = axios.create({
//   baseURL,
// });

// instance.interceptors.request.use(
//   (config) => {
//     if (sessionStorage.getItem("linnaea_access_token")) {
//       config.headers.Authorization = `Bearer ${sessionStorage.getItem(
//         "linnaea_access_token"
//       )}`;
//       return config;
//     }
//     if (localStorage.getItem("linnaea_access_token")) {
//       config.headers.Authorization = `Bearer ${localStorage.getItem(
//         "linnaea_access_token"
//       )}`;
//       return config;
//     }
//     return config;
//   }
//   // (error) => {
//   //   // Do something with request error
//   //   // alert(error.message);
//   //   console.error("Request Error Interceptor:", error);
//   //   return Promise.reject(error);
//   // }
// );

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // unauthorized
//     if (error.response.status === 401) {
//       refire(error);
//       return;
//     }
//     return Promise.reject(error.response.data);
//     // return error;
//   }
// );

// export default instance;

//* refire the request
// export const refire = (error) => {
//   const baseURL = error.config.baseURL;
//   const endpoint = error.config.url;
//   const method = error.config.method;
//   const url = baseURL + endpoint;
//   const refresh_token = localStorage.getItem("linnaea_refresh_token");
//   axios
//     .post(`${baseURL}/auth/tokens/refresh`, {
//       refresh: refresh_token,
//     })
//     .then(function (response) {
//       const newAccessToken = response.data.access;
//       localStorage.setItem("linnaea_access_token", newAccessToken);
//       const headers = {
//         Authorization: `Bearer ${newAccessToken}`,
//         "Content-Type": "application/json",
//       };
//       axios[method](url, { headers })
//         .then((response) => {
//           console.log("Response:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     })
//     .catch(function (error) {
//       logout();
//     });
// };
