import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
