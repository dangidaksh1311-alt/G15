import { create } from "zustand";

// The signed-in user is intentionally kept in memory only.
// Reloading or reopening the app returns to signup/login, while saved accounts and
// dashboard data remain in localStorage.
export const useAppStore = create((set) => ({
  user: null,
  notice: "",
  setUser: (user) => set({ user }),
  setNotice: (notice) => set({ notice }),
}));
