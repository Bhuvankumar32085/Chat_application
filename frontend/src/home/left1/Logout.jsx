import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import instance from "../../utils/axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, SetLoginUser } from "../../features/authSlice";
import { setSelectedUser } from "../../features/userSlice";
import { setOnlineUser } from "../../features/socketSlice";

const Logout = ({ mobile }) => {
  const dispatch = useDispatch();

  const handleSumbit = async () => {
    try {
      const res = await instance.get("/user/logout");
      if (res.data.success) {
        dispatch(setIsLoggedIn(false));
        dispatch(SetLoginUser(null));
        dispatch(setOnlineUser([]));
        dispatch(setSelectedUser(null))
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div
      className={`${
        mobile
          ? "flex mt-4 justify-center"
          : "hidden md:flex justify-center mt-auto p-4"
      }`}
    >
      <button
        onClick={handleSumbit}
        className="btn btn-sm btn-error rounded-full"
      >
        <IoLogOutOutline className="text-2xl" />
      </button>
    </div>
  );
};

export default Logout;
