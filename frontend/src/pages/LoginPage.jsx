import React, { useState } from "react";
import { NotebookPen, Loader2 } from "lucide-react";
import { TextField } from "@mui/material";
import { useAuthStore } from "../store/useauthstore";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-lottie.json";

const LoginPage = () => {
  const [Form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login, islogingin } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login(Form);
  };
  return (
    <div className="grid grid-cols-2">
      {/* left side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-[calc(100vh-64px)] flex justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center mb-4">
                <NotebookPen className="text-[#F43F5E]" />
                <span className="text-primary">NoteWise</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xl mt-4 mb-2 font-bold text-primary">
                  Notes at your fingertips
                </span>
                <span className="text-base-content/60 mb-4 text-secondary">
                  Create your free account now
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={Form.email}
                  onChange={(e) => setForm({ ...Form, email: e.target.value })}
                  sx={{
                    width: "50vh",
                    height: "5vh",
                    mb: "25px",
                    input: {
                      color: "#1F2937", // White text
                      padding: "10px",
                    },
                    label: {
                      color: "#B0BEC5", // Secondary text color
                    },
                    "& label.Mui-focused": {
                      color: "#00B8D4", // Cyan highlight
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#333", // Subtle border
                      },
                      "&:hover fieldset": {
                        borderColor: "#00E5FF", // Neon blue hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00B8D4", // Cyan on focus
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  value={Form.password}
                  onChange={(e) =>
                    setForm({ ...Form, password: e.target.value })
                  }
                  sx={{
                    width: "50vh",
                    height: "5vh",
                    mb: "25px",
                    input: {
                      color: "#1F2937", // White text
                      padding: "10px",
                    },
                    label: {
                      color: "#B0BEC5", // Secondary text color
                    },
                    "& label.Mui-focused": {
                      color: "#00B8D4", // Cyan highlight
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: "#333", // Subtle border
                      },
                      "&:hover fieldset": {
                        borderColor: "#00E5FF", // Neon blue hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#00B8D4", // Cyan on focus
                      },
                    },
                  }}
                />
                <button
                  className="bg-[#4F46E5] rounded-2xl mb-5 p-2 transition delay-5 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 flex items-center justify-center"
                  type="submit"
                  disabled={islogingin}
                >
                  {islogingin ? (
                    <>
                      <Loader2 className="animate-spin size-5" />
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className="flex gap-2">
              <span className="text-xl text-primary">
                Do not have an account?
              </span>
              <span>
                <Link to="/signup" className="underline text-blue-700 text-xl">
                  Sign Up
                </Link>
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* right side */}
      <div className="hidden lg:flex items-center justify-center">
        <Lottie animationData={loginAnimation} loop autoplay className="w-4/5 h-4/5" />
      </div>
    </div>
  );
};

export default LoginPage;
