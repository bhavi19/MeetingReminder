import axios from "axios";
import { useAuthStore } from "../store/authStore";

const httpClient = axios.create({
  timeout: 10000,
});

// Centralized auth handling: any API call that comes back unauthorized
// clears the stored token and resets auth state, which makes <App /> fall
// back to the connect (setup) screen.
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      useAuthStore.getState().clearAccessToken();
    }

    return Promise.reject(error);
  }
);

export default httpClient;
