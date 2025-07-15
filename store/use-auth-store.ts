import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: string;
  email: string;
  name?: string;
  cover: string;
  onboardingComplete: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isInitialized: boolean;
  isLoading: boolean;
  setUser: (user: User) => Promise<void>;
  setToken: (token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isInitialized: false,
  isLoading: false,

  setUser: async (user) => {
    set({ user });
    try {
      await AsyncStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  },

  setToken: async (token) => {
    set({ token });
    try {
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },

  clearAuth: async () => {
    set({ user: null, token: null });
    try {
      await AsyncStorage.multiRemove(["user", "token"]);
    } catch (error) {
      console.error("Failed to clear auth:", error);
    }
  },

  initializeAuth: async () => {
    if (get().isInitialized) return;

    set({ isLoading: true });

    try {
      const [savedUser, savedToken] = await Promise.all([
        AsyncStorage.getItem("user"),
        AsyncStorage.getItem("token"),
      ]);

      set({
        user: savedUser ? JSON.parse(savedUser) : null,
        token: savedToken,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to initialize auth:", error);
      set({ isInitialized: true, isLoading: false });
    }
  },
}));

export default useAuthStore;
