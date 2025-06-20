import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.routes.js"
import noteroutes from "./routes/note.routes.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const __dirname = path.resolve();


app.use("/api/auth", authroutes);
app.use("/api/notes", noteroutes);

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


app.listen(2000, ()=>{
    console.log("Server is running on port 2000");
    connectDB();
});