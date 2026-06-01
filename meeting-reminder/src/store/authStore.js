import { create } from "zustand";

export const useAuthStore = create(
  (set) => ({
    accessToken: null,
    setAccessToken: (token) =>
      set({
        accessToken: token,
      }),
    clearAccessToken: () =>
      set({
        accessToken: null,
      }),
    authExpired: false,

    setAuthExpired: () =>
      set({
        authExpired: true,
      }),
  }),
);