import express from "express";
import { createnote, getnotes, deletenote, updatenote, summarizenote , getselectednote} from "../controllers/note.controller.js";
import { protectroute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create", protectroute, createnote);
router.get("/getnote", protectroute, getnotes);
router.get("/getselectednote/:id", protectroute, getselectednote);
router.delete("/deletenote/:id", protectroute, deletenote);
router.put("/updatenote/:id", protectroute, updatenote);
router.get("/summarize/:id", protectroute, summarizenote);


export default router;