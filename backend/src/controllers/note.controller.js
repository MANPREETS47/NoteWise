import Note from '../models/note.model.js';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const createnote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    try{
        const newnote = new Note({
            title,
            content,
            userId,
        });
        await newnote.save();
        return res.status(201).json(newnote)
    }catch (error) {
        console.error("Error creating note:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getnotes = async (req, res) => {
    try{
        const loggedInUser = req.user._id;
        const notes = await Note.find({ userId: loggedInUser});
        return res.status(200).json(notes);
    }catch (error) {
        console.error("Error fetching notes:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getselectednote = async (req, res) => {
    try{
        const noteId = req.params.id;
        const note = await Note.findById(noteId);
        return res.status(200).json(note);
    }catch(err){
        console.log("Error fetching note: ", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const deletenote = async (req, res) => {
    const noteId = req.params.id;
    const userId = req.user._id;
    try{
        const del = await Note.findOneAndDelete({_id:noteId, userId})
        if (!del) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json({ message: "Note deleted successfully" });
    }catch (error) {
        console.error("Error deleting note:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updatenote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;
    const noteId = req.params.id;
    try{
        const updatednote = await Note.findOneAndUpdate({
            _id: noteId, userId
        }, {
            title,
            content
        }, {
            new: true // Return the updated document
        })
        if (!updatednote) {
            return res.status(404).json({ message: "Note not found" });
        }
        return res.status(200).json(updatednote);
    }catch (error) {
        console.error("Error updating note:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const summarizenote = async (req, res) => {
  const noteId = req.params.id;
  const apikey = process.env.GOOGLE_API_KEY;
  if(!apikey){
    return res.status(500).json({ message: "Missing Google API key "});
  }
  const genAI = new GoogleGenerativeAI(apikey);
  try{
    const note = await Note.findById(noteId);
    if(!note){
        return res.status(404).json({ message: "Note not found "});
    }
    if(!note.content || note.content.trim() === ""){
        return res.status(400).json({ message: "Note content is empty"});
    }
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(`Summarize this note:\n\n${note.content}`);
    const response =  result.response;
    const summary = response.text();

    return res.status(200).json({
        original: note.content,
        summary: summary
    });
  }
   catch (error) {
  console.error("Error summarizing note:", error);
  console.error("Error stack:", error.stack); // <--- This shows where it crashed
  return res.status(500).json({ message: "Internal server error", error: error.message });
}
  }

