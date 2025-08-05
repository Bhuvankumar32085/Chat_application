import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaComments } from "react-icons/fa";

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    new Date(now.setDate(now.getDate() - 1)).toDateString() ===
    date.toDateString();

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  if (isToday) {
    return `Today, ${date.toLocaleTimeString([], options)}`;
  } else if (isYesterday) {
    return `Yesterday, ${date.toLocaleTimeString([], options)}`;
  } else {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], options)}`;
  }
};

const Message = () => {
  const { allMessages } = useSelector((store) => store.message);
  const { loginUser } = useSelector((store) => store.auth);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  if (!allMessages || allMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8 text-gray-600">
        <FaComments className="text-5xl text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold">No Messages Found</h2>
        <p className="mt-2 text-sm text-gray-500">
          You haven’t started a conversation with this user yet.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 p-2 overflow-y-auto h-full">
      {allMessages.map((msg) => {
        const isOwnMessage = msg.senderId === loginUser?._id;
        const formattedTime = formatTime(msg.createdAt);

        return (
          <div
            key={msg._id}
            className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
          >
            <div
              className={`chat-bubble ${
                isOwnMessage ? "chat-bubble-info" : "chat-bubble-neutral"
              }`}
            >
              {msg.message}
              <div className="text-[10px] text-gray-200 mt-1 text-right">
                {formattedTime}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef}></div>
    </div>
  );
};

export default Message;
