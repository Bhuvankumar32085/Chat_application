import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./component/Signup";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Login from "./component/Loging";
import { useVerifyToken } from "./hook/useVerifyToken";
import { useGetAllUsers } from "./hook/useGetAllUser";
import EditProfilePicture from "./component/EditProfilePicture";
import { useGetMessage } from "./hook/useGetMessage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { setOnlineUser, setSocket } from "./features/socketSlice";
import { addMessage } from "./features/messageSlice";

function HomeLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col md:flex-row relative bg-base-100 overflow-hidden">
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-white"
        onClick={() => setOpen(true)}
      >
        {open === false && <FaBars size={24} />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-60 md:hidden">
          <div className="w-[75%] h-full bg-neutral text-white p-4 flex flex-col justify-between">
            <div>
              <Left closeSidebar={() => setOpen(false)} />
            </div>
            <Logout mobile />
          </div>
        </div>
      )}

      <div className="hidden md:flex flex-col w-[25%] bg-neutral text-white">
        <Left />
        <Logout />
      </div>

      <div className="flex-1 overflow-hidden">
        <Right />
      </div>
    </div>
  );
}

function App() {
  const { socket } = useSelector((store) => store.socketio);
  const { isLoggedIn } = useSelector((store) => store.auth);
  const { loginUser } = useSelector((store) => store.auth);
  
  const dispatch = useDispatch();
  useVerifyToken(isLoggedIn);
  useGetAllUsers(isLoggedIn);
  useGetMessage(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      const socket = io("https://chat-application-s3ml.onrender.com", {
        query: {
          userId: loginUser?._id, //ue backend me (socket.handshake.query.userId) es se mile gi
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUser", (onlineUser) => {
        dispatch(setOnlineUser(onlineUser));
      });

      socket.on("newMessage", (newMessage) => {
        dispatch(addMessage(newMessage));
      });

      return () => {
        socket.disconnect();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [isLoggedIn, dispatch]);

  const isLoging = useSelector((store) => store.auth.isLoggedIn);
  return (
    <Routes>
      {/* Protected Route */}
      <Route
        path="/"
        element={isLoging ? <HomeLayout /> : <Navigate to="/signup" />}
      />

      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/edit-profile" element={<EditProfilePicture />} />
    </Routes>
  );
}

export default App;
