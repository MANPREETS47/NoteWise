import React, { useEffect, useState } from "react";
import { Check, Copy, Loader2, Trash2 } from "lucide-react";
import { useNoteStore } from "../store/usenotestore";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Volume2 } from "lucide-react";

const UpdateNotePage = () => {
  const [NoteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  const [Visible, setVisible] = useState(false);

  const {
    updatenote,
    deletenote,
    getselectednote,
    selectednotedata,
    summarizenote,
    issummarizing,
    summarized,
  } = useNoteStore();
  const Navigate = useNavigate();

  useEffect(() => {
    getselectednote();
  }, [getselectednote]);


  useEffect(() => {
    if (selectednotedata && selectednotedata.title) {
      setNoteData({
        title: selectednotedata.title,
        content: selectednotedata.content,
      });
    }
  }, [selectednotedata]);

  const handlenote = async (e) => {
    e.preventDefault();
    await updatenote(NoteData);
    toast.success("Note updated succesfully");
    Navigate("/");
  };
  const handlenote2 = async (e) => {
    e.preventDefault();
    await deletenote();
    toast.success("Note deleted succesfully");
    Navigate("/");
  };
  const handlenote3 = async (e) => {
    e.preventDefault();
    await summarizenote(NoteData);
  };
  const speakText = (text) => {
    if (!text) {
      toast.error("Nothing to read.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1; // Optional: control speed (0.1 to 10)
    utterance.pitch = 1; // Optional: control pitch (0 to 2)
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="relative h-screen  flex flex-col">
      <header className="flex justify-between pr-6 pl-6 pt-4 pb-4">
        <div className="text-2xl p-2 ">Note</div>
        <div className="cursor-pointer flex pr-5 pl-5 gap-10">
          <div>
            <button
            onClick={(e) => {
              handlenote3(e);
              setVisible(true);
            }}
            disabled={issummarizing}
            data-twe-ripple-init
            className="flex items-center justify-center w-32 shadow-xl transition hover:scale-110 bg-[#4F46E5] p-2 rounded-xl"
          >
            {issummarizing ? <Loader2 /> : "Summarize"}
            </button>
          </div>
          <div className="md:flex fixed z-50 bottom-4 right-4 flex bg-blue-500 rounded-full px-5">
          <div className="p-2 hover:scale-110 transition">
            <Trash2 onClick={handlenote2} size={30} />
          </div>
          <div className="p-2 hover:scale-110 transition">
            <Check onClick={handlenote} size={30} />
          </div>
          <button
            className="p-2 hover:scale-110 transition"
            onClick={() => speakText(NoteData.content)}
            title="Read Note"
          >
            <Volume2 size={24} />
          </button>
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
          onChange={(e) =>
            setNoteData({ ...NoteData, content: e.target.value })
          }
          style={{ resize: "none", height: "100%" }}
          onClick={() => 
            setVisible(false)}
        ></textarea>
      </div>
      { Visible && summarized?.summary && (
      <div className="bg-white h-[70vh] w-[40vh] absolute top-28 right-20 rounded-3xl shadow-xl overflow-auto content-textarea">
        <div className="p-5 text-2xl flex justify-between">
          <p>Summary</p>
          <Copy className="cursor-pointer"  onClick={() => {
          navigator.clipboard.writeText(summarized.summary);
          toast.success("Summary copied!");
        }}></Copy>
        </div>
        <div className="p-5">
          <p>{summarized?.summary}</p>
        </div>
      </div>
  )}
    </div>
  );
};

export default UpdateNotePage;
