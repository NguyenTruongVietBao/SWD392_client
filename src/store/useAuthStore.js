import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { toast } from "react-toastify";
import axiosInstance from "../lib/axiosInstance";

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
            const res = await axiosInstance.post(`/accounts/login`, data);
            set((state) => {
              state.user = res.data;
              state.token = res.data.token;
            });
            return res.data;
          } catch (error) {
            console.log("error in login", error.message);
            toast.error(error.message);
          } finally {
            set({ isLoggingIn: false });
          }
        },

        logout: () => {
          set((state) => {
            state.user = null;
            state.token = null;
          });
        },

        registerAdvertiser: async (data) => {
          set({ isLoggingIn: true });
          try {
            const res = await axiosInstance.post(
              `/accounts/register/advertiser`,
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
            const res = await axiosInstance.post(
              `/accounts/register/publisher`,
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
