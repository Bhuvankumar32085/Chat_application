import React from "react";
import Message from "./Message";
import { useSelector } from "react-redux";

const Chatuser = () => {
  const { selectedUser } = useSelector(store => store.user);

  if (!selectedUser) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400 text-lg">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 p-2 rounded-lg bg-base-200 mb-3">
        <div className="avatar">
          <div className="w-12 rounded-full">
            <img
              src={
                selectedUser?.avatar?.url ||
                "https://tse1.mm.bing.net/th/id/OIP.PkFenohHn8RbSMjB8E4SZwHaHa?pid=Api&P=0&h=180"
              }
            />
          </div>
        </div>
        <div>
          <h1 className="font-medium">{selectedUser?.name}</h1>
          <p className="text-sm text-gray-400">{selectedUser?.email}</p>
        </div>
      </div>
      <Message />
    </div>
  );
};

export default Chatuser;
