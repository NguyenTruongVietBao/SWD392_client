import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { immer } from "zustand/middleware/immer";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const useAuthStore = create(
  persist(
    immer(
      (set) => ({
        isLoggingIn: false,
        user: null,
        token: null,

        login: async (data) => {
          set({ isLoggingIn: true });
          try {
            console.log("email password useAuthStore", data);
            const res = await axios.post(`${BASE_URL}/accounts/login`, data);
            console.log("res.data in useAuthStore", res.data);
            set((state) => {
              state.user = res.data;
              state.token = res.data.token;
            });
            return res.data;
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },
        logout: () =>
          set((state) => {
            state.user = null;
            state.token = null;
          }),

        registerAdvertiser: async (data) => {
          set({ isLoggingIn: true });
          try {
            const res = await axios.post(
              `${BASE_URL}/accounts/register/advertiser`,
              data
            );
            return res.data;
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },

        registerPublisher: async (data) => {
          set({ isLoggingIn: true });
          try {
            const res = await axios.post(
              `${BASE_URL}/accounts/register/publisher`,
              data
            );
            return res.data;
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },
      }),
      {
        name: "auth-storage",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useAuthStore;
