import React from 'react'
import { NotebookPen } from 'lucide-react';
import { useAuthStore } from '../store/useauthstore';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { authuser, logout } = useAuthStore();

  const handleclick = () => {
    logout();
  }
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <Link to="/">
        <NotebookPen className="h-8 w-8 mr-2 text-[#F43F5E]" />
        </Link>
        <span className="text-lg font-bold">NoteWise</span>
      </div>
      <div>
        {authuser && (
          <button onClick={handleclick} className="font-bold py-2 px-4 rounded bg-[#4F46E5] transition delay-50 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110">
            Logout
          </button>
        )}
      </div>
    </div>
  )
}

export default Navbar