import axios from "axios";

const apiToken = axios.create({
  baseURL: "https://m3p-backend-squad3-3vsm.onrender.com",
});

apiToken.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = ` Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiToken;