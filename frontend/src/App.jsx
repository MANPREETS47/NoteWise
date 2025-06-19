import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import NotePage from './pages/NotePage'
import Navbar from './components/Navbar'
import { useAuthStore } from './store/useauthstore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, CssBaseline } from '@mui/material'
import UpdateNotePage from './pages/UpdateNotePage'



const App = () => {
  const { checkAuth, authuser, ischeckingauth } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({authuser});

  if(ischeckingauth && !authuser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500" />
      </div>
    )
  }
  
  const hideNavbarRoutes = ["/notes", "/updatenote"]
  return (
    <div className='bg-[#F8FAFC] min-h-screen'>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      {/* <ThemeProvider theme={theme}> */}
      {/* <CssBaseline /> */}
      <Routes>
        <Route path="/" element={authuser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!authuser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authuser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/notes" element={authuser ? <NotePage /> : <Navigate to="/login" />} />
        <Route path="/updatenote" element={authuser ? <UpdateNotePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster />
      {/* </ThemeProvider> */}
    </div>
  )
}

export default App