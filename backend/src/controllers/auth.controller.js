import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newuser = new User({
      username,
      email,
      password:hashedPassword,
    });
    if (newuser) {
      const token = generateToken(newuser._id);
      await newuser.save();
      res.status(201).json({
        token,
        _id: newuser._id,
        username: newuser.username,
        email: newuser.email,
      });
    } else {
      res.status(400).json({ message: "User creation failed" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    try{
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({email});
    if (!user) {
        return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    res.status(200).json({
        token,
        _id: user._id,
        username: user.username,
        email: user.email,
    });
} catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try{
    res.cookie("jwt", '', {maxAge:0})
    res.status(200).json({ message: "Logged out successfully" });
  }catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const checkauth = async (req, res) => {
  try{
    res.status(200).json(req.user);
  }catch (error) {
    console.error("Error during authentication check:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
