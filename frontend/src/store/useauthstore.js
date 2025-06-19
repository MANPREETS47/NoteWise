import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authuser: null,
  islogingin: false,
  issigningup: false,
  ischeckingauth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/checkauth");
      set({ authuser: res.data });
    } catch (error) {
      console.error("Error checking auth", error);
    } finally {
      set({ ischeckingauth: false });
    }
  },

  login: async (data) => {
    set({ islogingin: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authuser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Enter valid credentials");
      console.error("Error loging in", error);
    } finally {
      set({ islogingin: false });
    }
  },

  signup: async (data) => {
    set({ issigningup: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authuser: res.data });
      toast.success("Signed up successfully");
    } catch (error) {
      console.error("Error signing up", error);
    } finally {
      set({ issigninup: false });
    }
  },
  logout: async () => {
    try{
        await axiosInstance.post("/auth/logout");
        set({ authuser: null});
        toast.success("Logged Out successfully")
    }catch(error){
        console.error("Error loging out", error)
    }finally{
        console.log("Bye Bye")
    }
  }
}));
