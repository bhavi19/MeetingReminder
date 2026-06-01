import axios from "axios";
import { useAuthStore } from "../store/authStore";

const httpClient = axios.create({
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      useAuthStore.getState().clearSession();
    }

    return Promise.reject(error);
  }
);

export default httpClient;
