import axios from "axios";

const API_BASE_URL = "http://localhost/MES-H5Api/api/"; // 改成指定api

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 設置超時 10 秒
  headers: {
    "Content-Type": "application/json",
  },
});

// 可選：添加請求攔截器 (自動附加 Token)
axiosInstance.interceptors.request.use(
  (config) => {
    const tokenKey = "WEYU54226552"; // 這裡的 TokenKey 是固定值

    config.headers.TokenKey = tokenKey; // 自動附加 TokenKey

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
