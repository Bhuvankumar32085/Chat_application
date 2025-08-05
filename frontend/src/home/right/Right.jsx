import React from "react";
import Chatuser from "./Chatuser";
import Type from "./Type";
// import Login from "../../component/Loging";
// import { useSelector } from "react-redux";

const Right = () => {
  // const a=useSelector(store=>store.auth)
  // console.log(a)
  return (
    <div className="h-full bg-base-300 text-white p-4 flex flex-col relative overflow-hidden">
      <h2 className="text-2xl font-bold pb-2 mx-auto">Chat Window</h2>

      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto pr-1 mb-20">
        <Chatuser />
      </div>

      {/* Fixed Input at Bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <Type />
      </div>
    </div>
  );
};

export default Right;
