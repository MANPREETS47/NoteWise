import { Button } from "@mui/material";
import { NotebookPen } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNoteStore } from "../store/usenotestore";

const HomePage = () => {
  const { Notes, getnote, setselectednote } = useNoteStore();
  const Navigate = useNavigate();

  useEffect(() => {
    getnote();
  }, []);

  // const handleclick = () => {
  //   Navigate(`/updatenote/${note._id}`);
  // };

  return (
    <div className="min-h-screen">
      <div className="fixed bottom-8 right-8 z-10 rounded-full p-3 group overflow-hidden">
        <span className="absolute inset-0 bg-blue-500 rounded-full -z-10 transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"></span>
        <Link className="cursor-pointer relative z-10" to="/notes">
          <NotebookPen className="text-[#F43F5E]" size={50} />
        </Link>
      </div>
      <div
        className="
  grid 
    grid-cols-2 
    sm:grid-cols-2 
    md:grid-cols-3 
    xl:flex xl:flex-row xl:flex-wrap 
    gap-4 sm:gap-6 md:gap-10 xl:gap-20 
    pr-2 sm:pr-4 md:pr-10 
    overflow-auto 
    h-[90vh] w-full content-textarea
"
      >
        {Notes.map((note) => (
          <div
            key={note._id}
            className="shadow-xl 
        w-full 
        max-w-[180px] 
        h-48 
        border 
        rounded-2xl 
        overflow-hidden 
        p-4 
        cursor-pointer 
        bg-[#FFFFFF] 
        hover:scale-105 
        transition 
        shrink-0 
        break-words md:m-5"
            onClick={() => {
              setselectednote(note);
              Navigate(`/updatenote`);
            }}
          >
            <h1 className="text-2xl">{note.title}</h1>
            <p className="">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
