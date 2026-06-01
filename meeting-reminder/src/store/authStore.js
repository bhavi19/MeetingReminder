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
    setUser: (user) =>
      set({
        user,
      }),
    authExpired: false,

    setAuthExpired: () =>
      set({
        authExpired: true,
      }),
  }),
);