import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const STORAGE_KEY = "user_session";

export type UserSession = {
  email?: string;
  password?: string;
};

export type AuthStore = {
  user?: UserSession;
  setUser: (data: Partial<UserSession>) => Promise<void>;
  clearUser: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: undefined,
  setUser: async (data) => {
    set({ user: data });
    await SecureStore.setItemAsync(STORAGE_KEY, JSON.stringify(data));
  },
  clearUser: async () => {
    set({ user: undefined });
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  },
  loadUserFromStorage: async () => {
    const stored = await SecureStore.getItemAsync(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as UserSession;
      set({ user: parsed });
    }
  },
}));
