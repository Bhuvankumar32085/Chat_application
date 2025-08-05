import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import instance from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllMessages } from "../../features/messageSlice";

const Type = () => {
  const dispatch=useDispatch()
  const { selectedUser } = useSelector((store) => store.user);
  const { allMessages } = useSelector((store) => store.message);
  const [message, setMessage] = useState("");
  // console.log(allMessages);

  const handleSend = async () => {
    if (message.trim() !== "") {
      setMessage("");
      //api
      try {
        const res = await instance.post(
          `/message/send/${selectedUser?._id}`,
          {message}
        );
        if (res.data?.success) {
          dispatch(setAllMessages([...allMessages, res.data?.message]));
        }
      } catch (error) {
        console.error(error)
        toast.error(error.response?.data?.message || "Logout failed");
      }
    }
  };

  return (
    <div className="w-full px-4 py-3 bg-gray-990 flex items-center gap-2 border-t border-gray-700">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-full outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSend}
        className="p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition duration-200"
      >
        <PaperAirplaneIcon className="w-5 h-5 text-white rotate-45" />
      </button>
    </div>
  );
};

export default Type;
