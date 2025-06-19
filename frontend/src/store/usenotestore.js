import { axiosInstance } from "../lib/axios";
import { create } from "zustand";


export const useNoteStore = create((set, get) => ({
    Notes: [],
    isNoteloading: false,
    selectednotedata : null,
    selectednote : null,
    summarized: null,
    issummarizing: false,

    getnote: async () => {
        set({isNoteloading: true});
        try{
            const res = await axiosInstance.get("/notes/getnote")
            set({ Notes : res.data});
        }catch(err){
            console.log("Error loading notes:" , err);

        }finally{
            set({isNoteloading: false});
        }
    },

    getselectednote: async () => {
        const { selectednote } = get();
         if (!selectednote) {
        console.log("No selectednote set!");
         }
        try{
            const res = await axiosInstance.get(`/notes/getselectednote/${selectednote._id}`);
            set({ selectednotedata: res.data});
        }catch(err){
            console.log("Error loading note: ", err);
        }
    },

    createnote: async (data) => {
        const { Notes } = get();
        try{
            const res = await axiosInstance.post("/notes/create/", data);
            set({ Notes: [...Notes, res.data]});
        }catch(err){
            console.log("Error creating Note: ", err);
        }
    },

    updatenote: async (data) => {
        const { selectednote } = get();
        try{
            const res = await axiosInstance.put(`/notes/updatenote/${selectednote._id}`, data);
        }catch(err){
            console.log("Error updating note: ", err);
        }
    },

    deletenote: async () => {
        const { selectednote } = get();
        try{
            const res = await axiosInstance.delete(`/notes/deletenote/${selectednote._id}`)
        }catch(err){
            console.log("Error deleting note: ", err);
        }
    },

    summarizenote: async (data) => {
        const { selectednote } = get();
        set({ issummarizing: true });
        try{
            const res = await axiosInstance.get(`notes/summarize/${selectednote._id}`, data);
            set({summarized: res.data});
            console.log(res.data)
        }catch(err){
            console.log("Error summarizing note: ", err);
        }finally{
            set({ issummarizing: false});
        };
    },

    setselectednote : (selectednote) => set({ selectednote })
}));