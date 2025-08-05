import React from "react";
import { IoClose } from "react-icons/io5";
import Search from "./Search";
import User from "./User";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


const Left = ({ closeSidebar }) => {

  return (
    <div className="h-full flex flex-col p-3">
      {/* Close Button (Mobile) */}
      {closeSidebar && (
        <div className="flex justify-end mb-4 md:hidden">
          <button onClick={closeSidebar} className="text-gray-600 hover:text-red-500 transition">
            <IoClose size={28} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-2xl">Chats</h1>
        <Link
          to="/edit-profile"
          className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:underline transition"
        >
          <CgProfile size={18} />
          Edit
        </Link>
      </div>

      {/* Search Bar */}
      <Search />

      {/* Divider */}
      <hr className="my-4 border-gray-300" />

      {/* User List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <User closeSidebar={closeSidebar}/>
      </div>
    </div>
  );
};

export default Left;
