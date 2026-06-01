import axios from "axios";
import { clearSession } from "../shared/storage.js";

const httpClient = axios.create({
  timeout: 10000,
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401 || status === 403) {
      await clearSession();
    }

    return Promise.reject(error);
  }
);

export default httpClient;
