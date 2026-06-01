import { create } from "zustand";

export const useAuthStore = create((set) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) =>
    set({ accessToken: token }),

  clearAccessToken: () =>
    set({ accessToken: null }),

  setUser: (user) =>
    set({ user }),
}));
