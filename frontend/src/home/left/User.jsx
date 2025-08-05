import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../features/userSlice";

const User = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const { allUsers } = useSelector((store) => store.user);
  const { loginUser } = useSelector((store) => store.auth);
  const { OnlineUser } = useSelector((store) => store.socketio);

  const handelSelectedUser = (selectedId) => {
    dispatch(setSelectedUser(selectedId));
  };

  return (
    <div className="space-y-2">
      {allUsers
        ?.filter((user) => user?._id !== loginUser?._id)
        .map((user) => {
          const isOnline = OnlineUser?.some((u) => u === user._id);
          return (
            <div
              key={user._id}
              onClick={() => {
                handelSelectedUser(user);
                if (closeSidebar) closeSidebar();
              }}
              className="flex items-center gap-3 p-2 hover:bg-base-200 cursor-pointer rounded-lg"
            >
              <div className="relative avatar">
                <div className="w-12 rounded-full">
                  <img
                    src={
                      user?.avatar?.url ||
                      "https://tse1.mm.bing.net/th/id/OIP.PkFenohHn8RbSMjB8E4SZwHaHa?pid=Api&P=0&h=180"
                    }
                    alt="avatar"
                  />
                </div>

                {/* 🟢 Green dot for online users */}
                {isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div>
                <h1 className="font-medium">{user?.name}</h1>
                <p className="text-sm text-gray-400">{user?.email}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default User;
