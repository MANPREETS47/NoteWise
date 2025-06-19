import express from 'express';
import { signup, login, logout, checkauth } from '../controllers/auth.controller.js';
import { protectroute } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login)
router.post("/logout" , logout);
router.get("/checkauth", protectroute, checkauth)

export default router;