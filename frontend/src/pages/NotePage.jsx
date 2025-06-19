import React, { useState } from "react";
import { Check } from "lucide-react";
import { useNoteStore } from "../store/usenotestore";
import { Navigate, useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const NotePage = () => {
  const [NoteData, setNoteData] = useState({
    title: "",
    content: "", 
  });
  const [showConfetti, setShowConfetti ] = useState(false);
  const { width, height } = useWindowSize();

  const { createnote } = useNoteStore();
  const Navigate = useNavigate();

  const handlenote = async (e) => {
    e.preventDefault();
    await createnote(NoteData);
    toast.success("Note created succesfully");
    setShowConfetti(true);
    setTimeout(()=> {
      setShowConfetti(false);
      Navigate("/");
    }, 3000);
  }
  return (
    <div className="h-screen  flex flex-col">
      {showConfetti && <Confetti width={width} height={height} />}
      <header className="flex justify-between pr-6 pl-6 pt-4 pb-4">
        <div className="text-2xl p-2 ">Note</div>
        <div className="cursor-pointer flex pr-5 pl-5 gap-10">
          <div className="p-2 hover:scale-110 transition">
          <Check onClick={handlenote} size={30}/>
          </div>
        </div>
      </header>
      <textarea
        className="w-90 backdrop-blur-md bg-white/30 text-primary border border-white focus:outline-none text-3xl pt-4 pl-4"
        placeholder="Title"
        value={NoteData.title}
        onChange={(e) => setNoteData({ ...NoteData, title: e.target.value })}
      ></textarea>
      <div className="flex-1 flex flex-col">
      <textarea
        className=" content-textarea w-full backdrop-blur-md bg-white/30 text-primary border border-white focus:outline-none pt-4 pl-4"
        placeholder="Content"
        value={NoteData.content}
        onChange={(e) => setNoteData({ ...NoteData, content: e.target.value })}
        style={{ resize: "none", height: "100%" }}
      ></textarea>
      </div>
    </div>
  );
};

export default NotePage;
